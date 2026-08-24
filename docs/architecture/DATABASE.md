# Elvyn — Database Architecture

**Document Version:** 1.0  
**Status:** Foundation Draft  
**Parent:** `docs/architecture/ARCHITECTURE.md`  
**Database:** PostgreSQL via Supabase  
**Next:** `docs/ui-ux/UI_UX.md`

---

## 1. Purpose

This document defines the initial PostgreSQL data architecture for Elvyn. It establishes the entities, relationships, ownership model, indexes, lifecycle rules, and Row Level Security strategy that implementation must follow.

The schema is intentionally designed for the single-user MVP while leaving a clean path toward future collaboration.

---

## 2. Database Principles

1. PostgreSQL is the source of truth for persistent application data.
2. Supabase Auth is the source of identity.
3. Private records are owned by an authenticated user.
4. RLS is mandatory for private tables.
5. Foreign keys must enforce valid relationships.
6. Timestamps should use timezone-aware values.
7. Database changes must use migrations.
8. The frontend must never be treated as an authorization boundary.
9. Avoid duplicate sources of truth.
10. Do not create tables for future features until they are actually required.

---

## 3. Identity Model

```text
Supabase Auth
     │
     │ auth.users.id
     ▼
profiles.id / profiles.user_id
     │
     ├── tasks
     ├── projects
     ├── goals
     ├── notes
     ├── resources
     ├── study_sessions
     ├── focus_sessions
     ├── notifications
     └── preferences
```

The authenticated Supabase user remains the identity authority. The application profile stores application-specific user information.

---

## 4. Core Tables

The planned MVP tables are:

```text
profiles
user_preferences
tasks
projects
goals
notes
resources
study_sessions
focus_sessions
notifications
activity_events
file_attachments
```

Additional join tables may be introduced where a many-to-many relationship genuinely requires one.

---

# 5. `profiles`

Stores application-specific profile information for an authenticated user.

### Planned fields

```text
id                uuid PK
user_id           uuid UNIQUE → auth.users.id
display_name      text
avatar_url        text nullable
bio               text nullable
created_at        timestamptz
updated_at        timestamptz
```

### Rules

- One profile per authenticated user.
- `user_id` must be unique.
- Profile creation should be handled automatically where practical.
- Profile deletion behavior must account for dependent records.

---

# 6. `user_preferences`

Stores user-specific application preferences.

### Planned fields

```text
id                uuid PK
user_id           uuid UNIQUE → profiles.user_id
theme             text
reduced_motion    boolean
timezone          text
created_at        timestamptz
updated_at        timestamptz
```

Additional preferences may be added only when required by an actual feature.

---

# 7. `tasks`

Represents actionable work.

### Planned fields

```text
id                uuid PK
user_id           uuid → profiles.user_id
project_id        uuid nullable → projects.id
goal_id            uuid nullable → goals.id
title             text
 description      text nullable
status            text
a priority        text
due_at            timestamptz nullable
completed_at      timestamptz nullable
archived_at       timestamptz nullable
created_at        timestamptz
updated_at        timestamptz
```

### Important correction before migration

The actual SQL implementation must use valid identifiers. The conceptual fields above mean:

```text
description
priority
```

not `a priority`.

### Status

Initial controlled values:

```text
TODO
IN_PROGRESS
COMPLETED
ARCHIVED
```

### Priority

Initial controlled values:

```text
LOW
MEDIUM
HIGH
URGENT
```

### Rules

- A task must belong to a user.
- Project and goal relationships must not bypass ownership boundaries.
- Completing a task sets `completed_at`.
- Reopening a task clears or appropriately updates completion state.
- Archived tasks should not be treated as active work.

---

# 8. `projects`

Represents a larger body of work.

### Planned fields

```text
id                uuid PK
user_id           uuid → profiles.user_id
name              text
description       text nullable
status            text
start_date        date nullable
due_date          date nullable
archived_at       timestamptz nullable
created_at        timestamptz
updated_at        timestamptz
```

### Status

Initial controlled values:

```text
PLANNED
ACTIVE
COMPLETED
ARCHIVED
```

### Rules

- Projects belong to a user.
- Project deletion behavior must be explicitly defined before migration.
- Associated records must not become accessible through another user.

---

# 9. `goals`

Represents a desired outcome or longer-term target.

### Planned fields

```text
id                uuid PK
user_id           uuid → profiles.user_id
title             text
description       text nullable
status            text
progress          numeric
start_date        date nullable
target_date       date nullable
completed_at      timestamptz nullable
created_at        timestamptz
updated_at        timestamptz
```

### Status

```text
ACTIVE
COMPLETED
ARCHIVED
```

### Progress

The application should enforce a sensible range, normally:

```text
0–100
```

The exact SQL constraint will be finalized during migration implementation.

---

# 10. `notes`

Stores user-created knowledge and information.

### Planned fields

```text
id                uuid PK
user_id           uuid → profiles.user_id
project_id        uuid nullable → projects.id
task_id           uuid nullable → tasks.id
goal_id            uuid nullable → goals.id
title             text
content           text
created_at        timestamptz
updated_at        timestamptz
archived_at       timestamptz nullable
```

### Rules

Notes may be connected to other entities where appropriate, but the relationships must never create cross-user access.

---

# 11. `resources`

Stores useful external resources and bookmarks.

### Planned fields

```text
id                uuid PK
user_id           uuid → profiles.user_id
project_id        uuid nullable → projects.id
title             text
url               text
description       text nullable
resource_type     text nullable
created_at        timestamptz
updated_at        timestamptz
archived_at       timestamptz nullable
```

### Resource Types

Examples:

```text
ARTICLE
VIDEO
DOCUMENTATION
PDF
WEBSITE
OTHER
```

The database may keep this as a controlled value or flexible text depending on the final implementation.

---

# 12. `study_sessions`

Stores completed or active study activity.

### Planned fields

```text
id                uuid PK
user_id           uuid → profiles.user_id
project_id        uuid nullable → projects.id
goal_id            uuid nullable → goals.id
subject           text nullable
topic             text nullable
started_at        timestamptz
ended_at          timestamptz nullable
duration_seconds  integer nullable
notes             text nullable
created_at        timestamptz
updated_at        timestamptz
```

### Rules

- Duration must not be negative.
- Active sessions must be distinguishable from completed sessions.
- Duration should be calculated consistently.

---

# 13. `focus_sessions`

Stores focused work sessions.

### Planned fields

```text
id                uuid PK
user_id           uuid → profiles.user_id
task_id           uuid nullable → tasks.id
project_id        uuid nullable → projects.id
goal_id           uuid nullable → goals.id
started_at        timestamptz
ended_at          timestamptz nullable
duration_seconds  integer nullable
status            text
created_at        timestamptz
updated_at        timestamptz
```

### Status

```text
ACTIVE
PAUSED
COMPLETED
CANCELLED
```

The exact pause representation will be finalized before migration implementation.

---

# 14. `notifications`

Stores user-facing notification records.

### Planned fields

```text
id                uuid PK
user_id           uuid → profiles.user_id
type              text
title             text
message           text
read_at           timestamptz nullable
created_at        timestamptz
```

### Rules

- Notifications belong to one user.
- A notification should not expose another user's data.
- Read/unread state must be represented consistently.

---

# 15. `activity_events`

Stores meaningful activity for user-facing activity timelines.

### Planned fields

```text
id                uuid PK
user_id           uuid → profiles.user_id
entity_type       text
entity_id         uuid nullable
action            text
metadata          jsonb nullable
created_at        timestamptz
```

### Rules

Activity records should contain minimal metadata needed to display an event. Sensitive content should not be unnecessarily duplicated into the activity table.

---

# 16. `file_attachments`

Stores metadata for files stored in Supabase Storage.

### Planned fields

```text
id                uuid PK
user_id           uuid → profiles.user_id
project_id        uuid nullable → projects.id
note_id           uuid nullable → notes.id
task_id           uuid nullable → tasks.id
resource_id       uuid nullable → resources.id
storage_path      text
file_name         text
mime_type         text nullable
file_size         bigint nullable
created_at        timestamptz
```

The actual binary file is stored in Supabase Storage, not PostgreSQL.

---

# 17. Relationship Rules

The initial relationship graph is:

```text
Profile
│
├── Projects
│    ├── Tasks
│    ├── Notes
│    └── Resources
│
├── Goals
│    └── Tasks / Projects
│
├── Tasks
│    └── Focus Sessions
│
├── Projects
│    └── Focus / Study Sessions
│
├── Study Sessions
├── Focus Sessions
├── Notifications
├── Activity Events
├── File Attachments
└── Preferences
```

All paths must preserve the user's ownership boundary.

---

# 18. Ownership Strategy

Every user-private table should contain an ownership path that can be checked efficiently.

Preferred pattern for MVP:

```text
user_id → authenticated user's ID
```

This makes RLS policies simpler and reduces complicated recursive ownership checks.

When a record references another user's entity, the database must prevent the relationship from being created.

---

# 19. Row Level Security Strategy

RLS is mandatory for private tables.

Conceptually, the normal policy is:

```sql
user_id = auth.uid()
```

Policies must cover relevant operations:

```text
SELECT
INSERT
UPDATE
DELETE
```

Each table must receive policies appropriate to its relationships.

### Important

RLS must be tested using different authenticated users before production release.

---

# 20. Foreign Key Strategy

Foreign keys should be used for relationships that require referential integrity.

Examples:

```text
projects.user_id → profiles.user_id
 tasks.user_id → profiles.user_id
 tasks.project_id → projects.id
 notes.project_id → projects.id
 focus_sessions.task_id → tasks.id
```

The final SQL must use a consistent and valid reference strategy. Where `profiles.id` and `auth.users.id` differ, the chosen relationship must be explicit rather than mixing identifiers.

---

# 21. Delete Strategy

Deletion behavior must be intentional.

### Default principle

Prefer archive/soft-delete behavior for user-facing entities where historical context matters.

Potential archival fields:

```text
archived_at
```

### Hard deletion

Hard deletion may be used when:

- The user explicitly requests permanent deletion.
- The entity contains no required historical record.
- Referential consequences are understood.

Cascading deletes must never accidentally remove unrelated user data.

---

# 22. Index Strategy

Indexes should support actual query patterns.

Expected indexes include combinations around:

```text
user_id
user_id + created_at
user_id + due_at
user_id + status
project_id
 goal_id
```

Examples of useful access patterns:

```text
User's active tasks
User's upcoming tasks
Project's tasks
User's recent notes
User's recent activity
Unread notifications
User's focus history
```

Indexes should be added based on actual query requirements rather than indexing every column.

---

# 23. Search Strategy

MVP search should use PostgreSQL capabilities.

Potential indexed/searchable fields include:

```text
tasks.title
tasks.description
projects.name
projects.description
goals.title
goals.description
notes.title
notes.content
resources.title
resources.description
```

Full-text search can be introduced where appropriate.

Vector embeddings are explicitly excluded from the MVP.

---

# 24. Timestamps

Relevant tables should use:

```text
created_at timestamptz
updated_at timestamptz
```

Lifecycle timestamps such as:

```text
completed_at
archived_at
read_at
```

should only exist where their meaning is clear.

The application should use UTC-compatible timestamp storage and convert to the user's timezone for display.

---

# 25. Constraints

The database should enforce important invariants where practical.

Examples:

```text
Required titles cannot be empty.
Progress remains within its allowed range.
Duration cannot be negative.
Required ownership fields cannot be NULL.
Referenced entities must exist.
Controlled status values remain valid.
```

Database constraints complement application validation.

---

# 26. Database Functions & Triggers

Database functions and triggers should be introduced only when they provide a clear benefit.

Potential uses:

- Automatic profile creation.
- `updated_at` maintenance.
- Carefully controlled derived behavior.

Business logic should not be hidden inside complex triggers when equivalent application logic would be easier to understand and test.

---

# 27. Storage Architecture

Supabase Storage should use controlled buckets and paths.

Conceptually:

```text
Bucket
└── user_id/
    └── entity_type/
        └── entity_id/
            └── file
```

Storage policies must verify ownership before allowing access.

The exact bucket strategy will be finalized during implementation.

---

# 28. Migration Strategy

Every schema change must be represented as a migration.

Example:

```text
supabase/
└── migrations/
    ├── 001_initial_schema.sql
    ├── 002_rls_policies.sql
    └── 003_indexes.sql
```

Migration names should describe their purpose.

Never rely on undocumented manual database edits for project state.

---

# 29. Seed Data

Development seed data may be created for testing UI states.

Seed data must:

- Be clearly identified as development data.
- Never contain real user information.
- Never include production credentials.
- Be reproducible.

Production should not depend on demo records.

---

# 30. Database Security Checklist

Before MVP release:

- [ ] RLS enabled on every private table.
- [ ] SELECT policies tested.
- [ ] INSERT policies tested.
- [ ] UPDATE policies tested.
- [ ] DELETE policies tested.
- [ ] Cross-user access tested.
- [ ] Storage policies tested.
- [ ] Service-role credentials never exposed to the client.
- [ ] Database migrations committed.
- [ ] No production secrets in Git.

---

# 31. Future Collaboration Path

The MVP should not implement full collaboration yet.

If collaboration is introduced later, the likely evolution is:

```text
User
 ↓
Workspace
 ├── Members
 ├── Roles
 └── Projects
```

The current schema should therefore avoid naming assumptions that make workspace ownership impossible later, while still keeping the MVP simple.

---

# 32. AI Database Strategy — Deferred

No AI-specific tables are required for MVP.

Do not create tables for:

- embeddings
- vector documents
- model conversations
- AI agents
- AI memories
- AI usage tracking

until the corresponding feature is actually approved for implementation.

---

# 33. Final Schema Checklist

Before implementing the database, confirm:

- [ ] Entity list is approved.
- [ ] Field names are finalized.
- [ ] Relationships are finalized.
- [ ] Ownership strategy is finalized.
- [ ] RLS policies are designed.
- [ ] Delete behavior is defined.
- [ ] Indexes are justified.
- [ ] Storage strategy is defined.
- [ ] Migration sequence is defined.
- [ ] Test scenarios are defined.

---

## 34. Important Implementation Note

This document is an architecture specification, not executable SQL.

The actual migration files must be generated only after the field types, foreign-key strategy, constraints, RLS policies, and Supabase-specific implementation details are reviewed together.

This prevents the database from becoming an accidental source of architectural drift.

---

**Document Status:** Foundation Draft  
**Next Document:** `docs/ui-ux/UI_UX.md`
