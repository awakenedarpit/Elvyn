# Elvyn — API & Application Data Boundary

**Version:** 1.0  
**Status:** Architecture Source of Truth  
**Related:** `ARCHITECTURE.md`, `DATABASE.md`, `RULES.md`

---

## 1. Purpose

This document defines how Elvyn's frontend communicates with application/backend services and Supabase.

The goal is to keep authentication, authorization, validation, data access, and UI concerns clearly separated.

---

## 2. Core Principle

The browser is **not a trusted security boundary**.

```text
User Interface
      ↓
Application data-access layer
      ↓
Supabase Auth / Database / Storage
      ↓
PostgreSQL + RLS
```

UI visibility is not authorization.

RLS and appropriate server-side checks must enforce ownership and access rules.

---

## 3. Planned Data Access Strategy

For simple authenticated CRUD operations, Elvyn may use the official Supabase client through a controlled data-access layer.

For operations requiring privileged logic, sensitive secrets, external integrations, or complex server-side processing, use a server-side boundary such as a Next.js Server Action or Route Handler.

```text
Simple user-owned CRUD
→ controlled Supabase client/data layer

Privileged or sensitive operation
→ server-side action/route
→ Supabase with server credentials where strictly required
```

Never expose the Supabase service-role key to the browser.

---

## 4. Authentication Boundary

Supabase Auth owns authentication/session primitives.

The application is responsible for:

- Sign-up UI
- Sign-in UI
- Sign-out UI
- Session-aware routing
- User-facing authentication errors
- Profile onboarding

Authentication does not automatically grant access to every database row.

Database access remains controlled by RLS.

---

## 5. Authorization Boundary

Authorization should be enforced as close to the data as practical.

For private user-owned records:

```text
Authenticated request
      ↓
Authenticated user ID
      ↓
RLS ownership policy
      ↓
Allowed / denied
```

Do not trust a client-supplied `user_id` to determine ownership.

Where a record belongs to a project/goal/etc., policies must also prevent indirect cross-user access.

---

## 6. Validation Boundary

Validate input at the application boundary and enforce important data constraints in PostgreSQL.

```text
Form input
   ↓
Client validation for UX
   ↓
Server/application validation where applicable
   ↓
Database constraints
   ↓
Persist
```

Client validation improves user experience; it must not be the only validation layer for security-sensitive data.

---

## 7. Error Model

Application errors should be translated into user-understandable states.

Conceptual categories:

```text
VALIDATION_ERROR
AUTHENTICATION_ERROR
AUTHORIZATION_ERROR
NOT_FOUND
CONFLICT
RATE_LIMITED
NETWORK_ERROR
DATABASE_ERROR
STORAGE_ERROR
UNKNOWN_ERROR
```

The exact implementation may evolve, but UI components should not depend on raw database error strings.

---

## 8. User-Facing Error Rules

Users should see:

- What went wrong in understandable language.
- Whether they can retry.
- What action they can take next when known.

Users should not see unnecessary:

- Database internals
- SQL statements
- Service-role information
- Secrets
- Internal stack traces
- Sensitive implementation details

Detailed diagnostics belong in development logs where appropriate.

---

## 9. CRUD Contract

Core entities should follow a consistent data-access pattern.

```text
list
get
create
update
archive/delete
```

The exact function names may differ by implementation, but responsibilities should remain predictable.

Avoid scattering raw database queries throughout UI components.

---

## 10. Recommended Application Structure

The exact Next.js structure can evolve, but conceptually:

```text
src/
├── app/
│   ├── (marketing)/
│   ├── (auth)/
│   └── (dashboard)/
│
├── components/
│   ├── ui/
│   └── features/
│
├── lib/
│   ├── supabase/
│   ├── validation/
│   └── utils/
│
├── data/
│   └── access/
│
├── actions/
│   └── feature-actions.ts
│
└── types/
```

Do not create this entire structure before it is needed. Add directories as implementation requires them.

---

## 11. Supabase Client Separation

Use appropriate clients for their execution context.

Conceptually:

```text
Browser/client client
→ browser-safe public configuration

Server client
→ request/session-aware server execution

Admin/service-role client
→ server-only privileged operations
```

The admin client must never be imported into browser components.

---

## 12. Server Actions / Route Handlers

Use server-side application boundaries when they provide a meaningful security or abstraction benefit.

Good candidates:

- Privileged operations
- Operations involving service-role credentials
- Complex multi-step workflows
- Sensitive external API calls
- Operations that should not expose internal implementation details

Do not create a server endpoint merely to proxy every simple database operation without a reason.

---

## 13. API Naming Principles

If explicit application endpoints are needed:

```text
/api/tasks
/api/projects
/api/goals
/api/notes
/api/resources
/api/study-sessions
```

Prefer predictable resource-oriented naming.

Use HTTP semantics consistently when Route Handlers are used.

---

## 14. Response Principles

Application responses should be predictable.

Conceptually:

```text
Success
→ requested data / operation result

Failure
→ stable error category + safe message
```

Avoid making frontend logic parse arbitrary human-readable messages to determine application state.

---

## 15. Pagination & Lists

Do not fetch unlimited rows by default.

Large lists should use appropriate pagination, limits, filtering, or incremental loading.

The database query should return only the information needed by the screen where practical.

---

## 16. Search Boundary

Search must respect authorization.

```text
Search request
      ↓
Authenticated context
      ↓
Authorized query
      ↓
Results belonging to permitted user/context
```

Never retrieve all users' data and filter unauthorized results in the browser.

---

## 17. File/Storage Boundary

For Supabase Storage:

```text
User
 ↓
Authorized upload/download request
 ↓
Storage policy
 ↓
User-owned object
```

File access must not depend solely on an obscured filename or UI restrictions.

---

## 18. Rate Limiting & Abuse

The MVP should avoid unnecessarily expensive operations and should respect platform/service limits.

Where a feature could be abused or become expensive, introduce appropriate server-side controls before launch.

AI-related rate limits are out of scope while AI is on hold.

---

## 19. Caching & Revalidation

Caching must never cause users to see another user's private data.

Before caching authenticated/private responses, verify that cache scope and invalidation are safe.

Prefer correctness over premature caching.

---

## 20. Optimistic UI

Optimistic updates may be used for low-risk interactions such as toggling completion when the rollback path is reliable.

Rules:

- Preserve server truth.
- Roll back failed operations.
- Show useful feedback for failures.
- Do not use optimistic UI to hide authorization or validation failures.

---

## 21. Transactions & Multi-Step Operations

Operations that must succeed or fail together should use an appropriate transactional/server-side strategy.

Do not rely on a sequence of independent client requests when partial completion could corrupt important application state.

---

## 22. Logging

Development diagnostics should be useful without exposing secrets or unnecessary personal data.

Never log:

- Passwords
- Access tokens
- Service-role keys
- Secret environment variables
- Sensitive authentication material

Production logging should be intentionally limited and reviewed.

---

## 23. Environment Variables

Public client configuration may use environment variables intended for browser exposure.

Secret values must remain server-only.

Conceptually:

```text
NEXT_PUBLIC_*
→ browser-safe values only

server-only environment variables
→ secrets / privileged configuration
```

Never commit `.env` secrets to Git.

---

## 24. Database Migrations

Schema changes must be reproducible.

Do not make undocumented manual production changes as the normal workflow.

Migration workflow:

```text
Schema change planned
      ↓
Migration created
      ↓
Local/test verification
      ↓
RLS/security verification
      ↓
Apply to target environment
      ↓
Verify
```

---

## 25. API Testing Requirements

For each meaningful data-access operation, test:

- Valid authenticated request
- Invalid input
- Unauthenticated request
- Unauthorized user
- Missing record
- Database failure where practical
- Successful persistence
- Response/state after refresh

For user-owned records, include at least two test accounts during security verification.

---

## 26. AI Features — Deferred

AI APIs, model providers, embeddings, vector databases, and AI-specific server routes are **not part of the current implementation**.

If AI placeholders appear in the UI, they must:

- Be clearly labeled Coming Soon.
- Not pretend to perform AI work.
- Not send user data to an AI provider.
- Not require AI infrastructure.

---

## 27. When to Add a New API Boundary

Before creating a new endpoint/server action, ask:

1. Does this operation require server-only logic?
2. Does it involve a secret?
3. Does it need a multi-step transaction/workflow?
4. Would a direct controlled Supabase data-access function be simpler?
5. Does the new boundary make authorization clearer?

If none apply, avoid unnecessary API complexity.

---

## 28. Implementation Rule

The API/data-access layer should be boring, predictable, and secure.

Do not optimize the architecture for hypothetical future scale before the product needs it.

---

## 29. Final Boundary

> **The UI requests an operation; the trusted application/data layer decides how it is performed; PostgreSQL/RLS decides whether private data access is allowed.**

This boundary is a core security principle of Elvyn.

---

**Status:** API architecture ready  
**Next:** Final documentation review → Phase 1 implementation
