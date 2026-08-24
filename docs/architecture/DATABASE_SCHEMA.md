# Elvyn — Database Schema

**Status:** Planning source of truth  
**Database:** Supabase PostgreSQL  
**Security:** Row Level Security (RLS) required for user-owned data

---

## 1. Database Principles

- PostgreSQL is the source of truth for persistent application data.
- Every user-owned table must have an ownership path that can be enforced by RLS.
- `auth.users` remains owned by Supabase Auth; application profile data belongs in an application table.
- Primary keys should use UUIDs where appropriate.
- Timestamps should use `timestamptz` and default to `now()`.
- Foreign keys should be explicit and indexed when useful for joins/filtering.
- Important invariants should be enforced with database constraints, not only UI validation.
- AI-related tables are intentionally deferred while AI is on hold.

---

## 2. Initial MVP Entities

The initial schema is intentionally small.

```text
auth.users
    │
    └── profiles
          │
          ├── goals
          │     └── tasks
          │
          └── notes
```

Additional entities should only be introduced when a confirmed product requirement needs them.

---

## 3. `profiles`

Application-level information for an authenticated user.

| Column | Type | Rules |
|---|---|---|
| `id` | `uuid` | PK, references `auth.users(id)` |
| `display_name` | `text` | nullable initially |
| `avatar_url` | `text` | nullable |
| `created_at` | `timestamptz` | default `now()` |
| `updated_at` | `timestamptz` | default `now()` |

### Ownership

`profiles.id = auth.uid()`.

Users may read/update only their own profile.

---

## 4. `goals`

Represents a user's personal goals or objectives.

| Column | Type | Rules |
|---|---|---|
| `id` | `uuid` | PK, generated |
| `user_id` | `uuid` | FK → `profiles.id`, required |
| `title` | `text` | required |
| `description` | `text` | nullable |
| `status` | `text` | constrained to planned statuses |
| `target_date` | `date` | nullable |
| `created_at` | `timestamptz` | default `now()` |
| `updated_at` | `timestamptz` | default `now()` |

### Ownership

`user_id = auth.uid()` through the profile ownership relationship.

---

## 5. `tasks`

Represents actionable work associated with a user and optionally a goal.

| Column | Type | Rules |
|---|---|---|
| `id` | `uuid` | PK, generated |
| `user_id` | `uuid` | FK → `profiles.id`, required |
| `goal_id` | `uuid` | FK → `goals.id`, nullable |
| `title` | `text` | required |
| `description` | `text` | nullable |
| `status` | `text` | constrained status |
| `priority` | `text` | constrained priority |
| `due_at` | `timestamptz` | nullable |
| `completed_at` | `timestamptz` | nullable |
| `created_at` | `timestamptz` | default `now()` |
| `updated_at` | `timestamptz` | default `now()` |

### Ownership

`user_id = auth.uid()`.

If `goal_id` is supplied, the referenced goal must belong to the same user.

---

## 6. `notes`

Simple user-owned notes for the MVP.

| Column | Type | Rules |
|---|---|---|
| `id` | `uuid` | PK, generated |
| `user_id` | `uuid` | FK → `profiles.id`, required |
| `title` | `text` | nullable |
| `content` | `text` | required |
| `created_at` | `timestamptz` | default `now()` |
| `updated_at` | `timestamptz` | default `now()` |

### Ownership

`user_id = auth.uid()`.

---

## 7. Status Enums / Constraints

Prefer database constraints or enums for small, stable state machines.

Initial conceptual values:

### Goal status

```text
planned
active
completed
archived
```

### Task status

```text
todo
in_progress
completed
cancelled
```

### Task priority

```text
low
medium
high
```

The exact implementation can use PostgreSQL enums or `text` + `check` constraints. Choose the simpler option unless there is a strong reason otherwise.

---

## 8. Relationships

```text
profiles 1 ──── * goals
profiles 1 ──── * tasks
goals    1 ──── * tasks
profiles 1 ──── * notes
```

A task may exist without a goal.

A task must never reference another user's goal.

---

## 9. Delete Behaviour

Default to conservative deletion behavior.

Recommended initial rules:

- Deleting a profile should remove dependent application data only if the product's account-deletion flow explicitly requires it.
- Deleting a goal should not silently delete unrelated user tasks.
- For tasks and goals, prefer archive/status transitions where product requirements support them.
- Any `ON DELETE CASCADE` must be deliberate and reviewed against user-data recovery expectations.

---

## 10. Indexes

Indexes should support actual access patterns rather than being added everywhere.

Expected useful indexes:

```text
profiles: primary key

goals: (user_id)
goals: (user_id, status)

tasks: (user_id)
tasks: (user_id, status)
tasks: (user_id, due_at)
tasks: (goal_id)

notes: (user_id, updated_at)
```

Final indexes should be created with the initial migration and adjusted based on real query patterns.

---

## 11. Row Level Security

RLS is mandatory for user-owned tables.

Conceptual policy model:

```text
SELECT → user owns row
INSERT → authenticated user can only create own row
UPDATE → user owns existing row
DELETE → user owns existing row
```

For `goals` and `tasks`, policies must also prevent cross-user relationships.

Never rely on frontend route protection as a replacement for RLS.

---

## 12. Profile Creation

When a user signs up, the application needs a reliable way to create their corresponding profile.

The implementation should choose one consistent strategy:

1. Explicit server-side/application creation after signup, or
2. A carefully designed database trigger.

The choice must be documented before implementation.

Avoid a trigger if it adds complexity without a clear benefit.

---

## 13. Updated Timestamps

`updated_at` should reflect meaningful updates.

The implementation may use application logic or a database trigger.

Whichever strategy is selected must be consistent across tables.

---

## 14. Migrations

Schema changes must be represented as versioned SQL migrations.

```text
supabase/
└── migrations/
    ├── <timestamp>_initial_schema.sql
    └── ...future migrations
```

Never make undocumented schema changes directly in production as the normal workflow.

---

## 15. Initial Migration Scope

The first migration should contain only:

- Required extensions if needed
- `profiles`
- `goals`
- `tasks`
- `notes`
- Required constraints
- Required indexes
- RLS enablement
- RLS policies
- Any explicitly selected profile-creation mechanism

Do **not** create AI/vector/embedding tables yet.

---

## 16. Security Verification Before Applying

Before applying the initial migration, test at minimum:

- User A can access User A's profile.
- User A cannot access User B's profile.
- User A can access User A's goals/tasks/notes.
- User A cannot access User B's goals/tasks/notes.
- User A cannot attach a task to User B's goal.
- Unauthenticated requests cannot access private rows.
- Update/delete policies enforce ownership.

Use at least two test accounts for cross-user RLS verification.

---

## 17. Deferred Features

The following are intentionally excluded from the initial schema:

- AI conversations
- AI-generated content
- Embeddings
- Vector search
- AI usage tracking
- Billing/subscriptions
- Social features
- Team/workspace sharing

They can be introduced later through explicit migrations when requirements are finalized.

---

## 18. Schema Rule

> **Start with the smallest schema that safely supports the current product. Add tables because a feature requires them, not because they might be useful someday.**

**Status:** Schema planned  
**Next:** Review schema → create first Supabase migration
