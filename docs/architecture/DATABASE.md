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

## 2. Database Principles

1. PostgreSQL is the source of truth for persistent application data.
2. Supabase Auth is the source of identity.
3. Private records are owned by an authenticated user.
4. RLS is mandatory for private tables.
5. Foreign keys must enforce valid relationships.
6. Timestamps should use timezone-aware values.
7. Database changes must use migrations.
8. The frontend is never an authorization boundary.
9. Avoid duplicate sources of truth.
10. Do not create tables for future features until they are actually required.

## 3. Identity Model

```text
Supabase Auth
     │
     │ auth.users.id
     ▼
profiles.user_id
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

Supabase Auth remains the identity authority. The application profile stores application-specific user information.

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

Additional join tables may be introduced only when a real many-to-many relationship requires one.

## 5. `profiles`

Stores application-specific profile information for an authenticated user.

```text
id                uuid PK
user_id           uuid UNIQUE → auth.users.id
display_name      text
avatar_url        text nullable
bio               text nullable
created_at        timestamptz
updated_at        timestamptz
```

Rules:

- One profile per authenticated user.
- `user_id` is unique.
- Profile creation should be handled automatically where practical.
- Profile deletion must account for dependent records.

## 6. `user_preferences`

Stores user-specific application preferences.

```text
id                uuid PK
user_id           uuid UNIQUE → profiles.user_id
theme             text
reduced_motion    boolean
timezone          text
created_at        timestamptz
updated_at        timestamptz
```

Additional preferences are added only when required by an actual feature.

## 7. `tasks`

Represents actionable work.

```text
id                uuid PK
user_id           uuid → profiles.user_id
project_id        uuid nullable → projects.id
goal_id            uuid nullable → goals.id
title             text
description       text nullable
status            text
priority          text
due_at            timestamptz nullable
completed_at      timestamptz nullable
archived_at       timestamptz nullable
created_at        timestamptz
updated_at        timestamptz
```

Initial status values:

```text
TODO
IN_PROGRESS
COMPLETED
ARCHIVED
```

Initial priority values:

```text
LOW
MEDIUM
HIGH
URGENT
```

Rules:

- A task must belong to a user.
- Project and goal relationships must preserve ownership.
- Completing a task sets `completed_at`.
- Reopening a task clears or appropriately updates completion state.
- Archived tasks are not treated as active work.

## 8. `projects`

Represents a larger body of work.

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

Initial status values:

```text
PLANNED
ACTIVE
COMPLETED
ARCHIVED
```

## 9. `goals`

Represents a desired outcome or longer-term target.

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

Initial status values:

```text
ACTIVE
COMPLETED
ARCHIVED
```

Progress should normally be constrained to 0–100. The exact SQL constraint is finalized during migration implementation.

## 10. `notes`

Stores user-created knowledge and information.

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

Notes may connect to other entities where appropriate, but relationships must never create cross-user access.

## 11. `resources`

Stores useful external resources and bookmarks.

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

Example resource types:

```text
ARTICLE
VIDEO
DOCUMENTATION
PDF
WEBSITE
OTHER
```

## 12. `study_sessions`

Stores completed or active study activity.

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

Duration must not be negative, and active sessions must be distinguishable from completed sessions.

## 13. `focus_sessions`

Stores focused work sessions.

```text
id                uuid PK
user_id           uuid → profiles.user_id
task_id           uuid nullable → tasks.id
project_id        uuid nullable → projects.id
goal_id            uuid nullable → goals.id
started_at        timestamptz
ended_at          timestamptz nullable
duration_seconds  integer nullable
status            text
created_at        timestamptz
updated_at        timestamptz
```

Initial status values:

```text
ACTIVE
PAUSED
COMPLETED
CANCELLED
```

The exact pause representation is finalized before migration implementation.

## 14. `notifications`

Stores user-facing notification records.

```text
id                uuid PK
user_id           uuid → profiles.user_id
type              text
title             text
message           text
read_at           timestamptz nullable
created_at        timestamptz
```

## 15. `activity_events`

Stores meaningful activity for user-facing activity timelines.

```text
id                uuid PK
user_id           uuid → profiles.user_id
entity_type       text
entity_id         uuid nullable
action            text
metadata          jsonb nullable
created_at        timestamptz
```

Activity should contain only the metadata required for the timeline. Sensitive content should not be unnecessarily duplicated.

## 16. `file_attachments`

Stores metadata for files stored in Supabase Storage.

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

## 17. Relationship Model

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

All relationship paths must preserve the user's ownership boundary.

## 18. Ownership Strategy

Every user-private table should contain an ownership path that can be checked efficiently.

Preferred MVP pattern:

```text
user_id → authenticated user's ID
```

This makes RLS policies simpler. When a record references another user's entity, the database must prevent the relationship from being created.

## 19. Row Level Security Strategy

RLS is mandatory for private tables.

Conceptually, the normal ownership policy is:

```sql
user_id = auth.uid()
```

Policies must cover the relevant operations:

```text
SELECT
INSERT
UPDATE
DELETE
```

The exact policies must also validate ownership of referenced entities where necessary.

RLS must be tested using at least two authenticated users before production release.

## 20. Foreign Key Strategy

Foreign keys enforce referential integrity.

Examples:

```text
profiles.user_id → auth.users.id
tasks.user_id → profiles.user_id
projects.user_id → profiles.user_id
goals.user_id → profiles.user_id
tasks.project_id → projects.id
notes.project_id → projects.id
focus_sessions.task_id → tasks.id
```

The implementation must use one consistent profile/user identifier strategy and must not mix `profiles.id` and `auth.users.id` accidentally.

## 21. Delete Strategy

Deletion behavior must be intentional.

Prefer archive/soft-delete behavior for user-facing entities where historical context matters.

Potential archival field:

```text
archived_at
```

Hard deletion may be used when the user explicitly requests permanent deletion and all referential consequences are understood.

Cascading deletes must never accidentally remove unrelated user data.

## 22. Index Strategy

Indexes should support real query patterns rather than every column.

Expected access patterns include:

```text
User's active tasks
User's upcoming tasks
Project's tasks
User's recent notes
User's recent activity
Unread notifications
User's focus history
```

Likely useful indexes include combinations involving:

```text
user_id
user_id + created_at
user_id + due_at
user_id + status
project_id
goal_id
```

Final indexes are added after query patterns are implemented and reviewed.

## 23. Search Strategy

MVP search uses PostgreSQL capabilities.

Potential searchable fields:

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

PostgreSQL full-text search can be introduced where appropriate.

Vector embeddings are explicitly excluded from MVP.

## 24. Timestamps

Relevant tables use:

```text
created_at timestamptz
updated_at timestamptz
```

Lifecycle timestamps such as `completed_at`, `archived_at`, and `read_at` are used only where their meaning is clear.

Store timestamps in UTC-compatible form and convert to the user's timezone for display.

## 25. Constraints

The database should enforce important invariants where practical:

```text
Required titles cannot be empty.
Progress remains within its allowed range.
Duration cannot be negative.
Required ownership fields cannot be NULL.
Referenced entities must exist.
Controlled status values remain valid.
```

Database constraints complement application validation.

## 26. Database Functions & Triggers

Functions and triggers should be introduced only when they provide a clear benefit.

Potential uses:

- Automatic profile creation.
- `updated_at` maintenance.
- Carefully controlled derived behavior.

Business logic should not be hidden inside complex triggers when equivalent application logic would be easier to understand and test.

## 27. Storage Architecture

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

The exact bucket strategy is finalized during implementation.

## 28. Migration Strategy

Every schema change must be represented as a migration.

Example:

```text
supabase/
└── migrations/
    ├── 001_initial_schema.sql
    ├── 002_rls_policies.sql
    └── 003_indexes.sql
```

Migration names should describe their purpose. Never rely on undocumented manual database edits for project state.

## 29. Seed Data

Development seed data may be created for testing UI states.

Seed data must:

- Be clearly identified as development data.
- Never contain real user information.
- Never include production credentials.
- Be reproducible.

Production must not depend on demo records.

## 30. Database Security Checklist

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

## 31. Future Collaboration Path

The MVP does not implement full collaboration.

If collaboration is introduced later, the likely evolution is:

```text
User
 ↓
Workspace
 ├── Members
 ├── Roles
 └── Projects
```

The current schema should remain simple while avoiding assumptions that make workspace ownership impossible later.

## 32. AI Database Strategy — Deferred

No AI-specific tables are required for MVP.

Do not create tables for embeddings, vector documents, model conversations, AI agents, AI memories, or AI usage tracking until the corresponding feature is approved.

## 33. Final Schema Checklist

Before implementing the database, confirm:

- [ ] Entity list approved.
- [ ] Field names finalized.
- [ ] Relationships finalized.
- [ ] Ownership strategy finalized.
- [ ] RLS policies designed.
- [ ] Delete behavior defined.
- [ ] Indexes justified.
- [ ] Storage strategy defined.
- [ ] Migration sequence defined.
- [ ] Test scenarios defined.

## 34. Implementation Note

This document is an architecture specification, not executable SQL.

Actual migration files must be generated only after field types, foreign keys, constraints, RLS policies, and Supabase-specific implementation details are reviewed together. This prevents the database from becoming an accidental source of architectural drift.

---

**Document Status:** Foundation Draft  
**Next Document:** `docs/ui-ux/UI_UX.md`
