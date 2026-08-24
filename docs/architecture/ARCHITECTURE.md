# Elvyn — System Architecture

**Document Version:** 1.0  
**Status:** Foundation Draft  
**Parent:** `docs/product/REQUIREMENTS.md`  
**Next:** `docs/architecture/DATABASE.md`

---

## 1. Architecture Goal

Elvyn uses a modular, web-first architecture designed to remain simple enough for a $0 MVP while providing a clean foundation for future features, including AI, collaboration, analytics, and mobile clients.

The architecture prioritizes:

- Clear separation of UI, application logic, data access, and infrastructure.
- Strong user-data isolation.
- Server-side authorization and Supabase Row Level Security.
- Small, reusable components.
- Minimal unnecessary infrastructure.
- Progressive feature development.
- Future extensibility without prematurely implementing future systems.

---

## 2. High-Level Architecture

```text
                         ┌──────────────────────┐
                         │       Elvyn Web      │
                         │  Next.js + TypeScript│
                         └──────────┬───────────┘
                                    │
                 ┌──────────────────┼──────────────────┐
                 │                  │                  │
                 ▼                  ▼                  ▼
          UI Components       Server Logic       Client Logic
          shadcn/ui           Next.js Server      Hooks / State
          Tailwind            Actions/Routes     UI interactions
                 │                  │                  │
                 └──────────────────┼──────────────────┘
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │       Supabase       │
                         ├──────────────────────┤
                         │ Auth                 │
                         │ PostgreSQL           │
                         │ Row Level Security   │
                         │ Storage              │
                         │ Realtime (if needed) │
                         └──────────┬───────────┘
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │    PostgreSQL Data   │
                         │ User-owned entities  │
                         └──────────────────────┘
```

---

## 3. Technology Stack

### Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS
- shadcn/ui

### Backend / Platform

- Supabase
- PostgreSQL
- Supabase Auth
- Supabase Storage

### Motion

- Motion for interaction and interface animation.
- GSAP only when a complex timeline or animation genuinely requires it.
- Spline only for carefully selected 3D experiences.

### Deployment

The MVP should target a free-tier deployment platform compatible with Next.js, with environment variables configured separately for development and production.

The exact deployment provider is finalized during implementation planning.

---

## 4. Architectural Layers

Elvyn is organized into five conceptual layers.

### Layer 1 — Presentation

Responsible for rendering the interface and handling user interaction.

Examples:

```text
Pages
Layouts
Components
Forms
Dialogs
Navigation
Animations
```

Presentation code must not contain large amounts of database logic.

### Layer 2 — Application Logic

Responsible for application behavior and workflows.

Examples:

```text
Create task
Complete task
Create project
Update goal
Start focus session
Search workspace
```

This layer coordinates UI requests with data operations.

### Layer 3 — Data Access

Responsible for communicating with Supabase/PostgreSQL.

Database queries should be centralized where practical rather than duplicated throughout components.

### Layer 4 — Authorization

Authorization is enforced through:

- Supabase Auth
- Server-side checks
- PostgreSQL Row Level Security
- Supabase Storage policies

Frontend visibility is not considered a security boundary.

### Layer 5 — Infrastructure

Includes:

- Supabase
- Deployment platform
- Environment configuration
- Storage
- Optional future services

---

## 5. Request Flow

A typical authenticated operation should follow this pattern:

```text
User
 ↓
UI Component
 ↓
Form / Event Handler
 ↓
Application Action
 ↓
Authentication Context
 ↓
Supabase Query
 ↓
PostgreSQL / Storage
 ↓
RLS / Storage Policy
 ↓
Result
 ↓
UI State Update
```

The exact implementation mechanism may use Next.js Server Actions, Route Handlers, or carefully scoped client-side Supabase operations depending on the operation.

---

## 6. Authentication Architecture

Supabase Auth is the identity provider.

The application should not implement its own password storage or authentication system.

Conceptually:

```text
User
 ↓
Supabase Auth
 ↓
Authenticated Session
 ↓
Next.js Application
 ↓
User Profile / Workspace Data
```

Authentication identity and application profile data are separate concepts.

The user's Supabase Auth identity is the source of identity. Application-specific profile information belongs in an appropriate database table.

---

## 7. Authorization Architecture

Every private data operation must ultimately be protected by database-level authorization.

Conceptually:

```text
Authenticated User
       │
       ▼
     user.id
       │
       ▼
PostgreSQL RLS Policy
       │
   ┌───┴────┐
   │        │
 Allowed  Denied
```

For user-owned records, ownership should normally be represented through a stable user/profile relationship.

RLS policies must be designed before production data is introduced.

---

## 8. Data Ownership Model

The initial MVP is primarily single-user.

The basic ownership relationship is:

```text
Auth User
   │
   ▼
Profile
   │
   ├── Tasks
   ├── Projects
   ├── Goals
   ├── Notes
   ├── Resources
   ├── Focus Sessions
   ├── Study Sessions
   ├── Notifications
   └── Preferences
```

Relationships between these entities must not bypass ownership controls.

Future collaboration may introduce workspace-level ownership, but the MVP should not prematurely implement a complex multi-tenant permission system.

---

## 9. Domain Model

The primary application domains are:

```text
Identity
Productivity
Projects
Goals
Knowledge
Study
Focus
Planning
Search
Notifications
Files
Preferences
```

A simplified relationship model is:

```text
                 ┌──────────┐
                 │   Goal   │
                 └────┬─────┘
                      │
                      ▼
                 ┌──────────┐
                 │ Project  │
                 └────┬─────┘
                      │
              ┌───────┴────────┐
              ▼                ▼
          ┌───────┐        ┌────────┐
          │ Tasks │        │ Notes  │
          └───┬───┘        └────┬───┘
              │                 │
              └──────┬──────────┘
                     ▼
                ┌───────────┐
                │ Resources │
                └───────────┘
```

This is conceptual only. The normalized database schema is defined separately in `DATABASE.md`.

---

## 10. Frontend Architecture

The frontend should use a modular component architecture.

Conceptual structure:

```text
app/
├── (marketing)/
├── (auth)/
├── (dashboard)/
│   ├── dashboard/
│   ├── tasks/
│   ├── projects/
│   ├── goals/
│   ├── notes/
│   ├── resources/
│   ├── planner/
│   ├── study/
│   ├── focus/
│   └── settings/
└── api/
```

The exact routing structure may evolve during implementation while preserving domain separation.

Reusable interface primitives belong in `components/` rather than being repeatedly implemented inside pages.

---

## 11. Component Architecture

Components should generally follow:

```text
components/
├── ui/
├── layout/
├── navigation/
├── dashboard/
├── tasks/
├── projects/
├── goals/
├── notes/
├── resources/
├── planner/
├── study/
├── focus/
└── shared/
```

`ui/` contains generic design-system components.

Domain-specific components belong in their respective domain folders.

A component should not become a general-purpose dumping ground for unrelated functionality.

---

## 12. Business Logic Rules

Business logic should not be duplicated across multiple UI components.

For example, task completion rules should exist in an appropriate application/data layer rather than being independently implemented in every task card.

The desired flow is:

```text
Task Card
   ↓
Complete Task Action
   ↓
Task Logic
   ↓
Data Operation
```

not:

```text
Task Card A → Database
Task Card B → Database
Task Page   → Database
Dashboard   → Database
```

with different logic in each location.

---

## 13. Server vs Client Strategy

Use server-side execution where it provides security, performance, or simpler data handling.

Use client-side components when interactivity requires them.

Examples of client-side behavior:

- Dialog state
- Form interaction
- Timers
- Drag interactions
- Animation
- Instant UI feedback

Examples of server-oriented behavior:

- Protected data retrieval
- Authorization-sensitive operations
- Database mutations
- Secure environment access

The architecture should avoid making the entire application client-rendered unnecessarily.

---

## 14. State Management

Elvyn should avoid introducing a large global state framework unless the actual application complexity requires it.

Prefer:

1. Server-rendered data where practical.
2. Local component state for local UI state.
3. URL state for shareable/filterable navigation state.
4. Server/database state for persistent application data.
5. A dedicated state library only when a demonstrated requirement exists.

This keeps the MVP simpler and reduces unnecessary dependencies.

---

## 15. Forms

Forms should have:

- Clear labels
- Validation
- Useful error messages
- Loading states
- Success feedback where appropriate
- Accessible keyboard behavior

Validation should exist at the appropriate application boundary and must not rely exclusively on client-side validation.

---

## 16. Search Architecture

V1 search should use standard PostgreSQL-compatible querying and indexing.

Conceptually:

```text
Search Input
 ↓
Search Layer
 ↓
Relevant Tables / Indexes
 ↓
Authorization Filtering
 ↓
Ranked/filtered results
```

AI embeddings and vector search are intentionally excluded from MVP.

Future AI search can be introduced behind the search abstraction without redesigning the entire UI.

---

## 17. File Architecture

Files use Supabase Storage rather than being stored directly inside PostgreSQL records.

Conceptually:

```text
Database
  │
  └── File Metadata
          │
          ▼
Supabase Storage
          │
          ▼
     Actual File
```

Database records should contain references and metadata, not large file contents.

Storage policies must enforce ownership.

---

## 18. Realtime Strategy

Realtime functionality should not be enabled everywhere by default.

It should only be introduced where users benefit from immediate updates.

Potential future use cases include:

- Notifications
- Collaboration
- Shared workspaces
- Live activity

The single-user MVP should minimize unnecessary realtime complexity.

---

## 19. Animation Architecture

Animation is treated as an enhancement layer, not application logic.

Preferred hierarchy:

```text
CSS / Tailwind
      ↓
Motion
      ↓
GSAP (complex timelines only)
      ↓
Spline (selected 3D experiences only)
```

External animation libraries must not be added simply because an effect looks impressive.

Every major animation should have a UX purpose.

---

## 20. AI Architecture — Deferred

AI is intentionally isolated from the MVP architecture.

There should be no mandatory AI service in the initial request path:

```text
User
 ↓
Elvyn
 ↓
Supabase
```

Future architecture may become:

```text
User
 ↓
Elvyn
 ├── Supabase
 └── AI Service
       ├── Models
       ├── Retrieval
       └── Context Layer
```

AI must remain optional so that core application functionality continues to work if an AI provider is unavailable.

---

## 21. Error Handling Architecture

Errors should be handled at appropriate boundaries.

The application should distinguish between:

```text
Validation Error
Authentication Error
Authorization Error
Not Found
Database Error
Network Error
Unexpected Error
```

Users should receive understandable messages while sensitive internal details remain hidden.

Developer-facing logs should contain enough context to diagnose failures without exposing secrets.

---

## 22. Observability

The MVP should keep observability simple.

At minimum, the development workflow should provide:

- Clear server errors
- Browser console diagnostics during development
- Database logs through Supabase
- Deployment/build logs

A dedicated paid observability platform is not required for the $0 MVP.

---

## 23. Environment Architecture

Environment-specific values must be kept outside source control.

Expected pattern:

```text
.env.local
.env.example
```

`.env.example` documents required variables without containing real secrets.

The repository must never contain actual production secrets.

---

## 24. Repository Architecture

Documentation and source code remain separated.

```text
Elvyn/
├── docs/
├── project/
├── tracking/
├── app/
├── components/
├── hooks/
├── lib/
├── types/
├── public/
├── supabase/
├── AGENTS.md
├── README.md
├── CHANGELOG.md
├── .env.example
└── .gitignore
```

The exact application directories may be adjusted by the implementation plan, but documentation organization must remain consistent.

---

## 25. Supabase Architecture

Supabase acts as the primary backend platform for the MVP.

```text
Elvyn
 │
 ├── Supabase Auth
 │
 ├── PostgreSQL
 │    └── RLS
 │
 ├── Storage
 │    └── Storage Policies
 │
 └── Optional Realtime
```

Supabase Edge Functions should only be introduced when a server-side function cannot be cleanly implemented within the primary application architecture.

---

## 26. Deployment Architecture

The application should be deployable from the GitHub repository through a compatible free-tier hosting platform.

Conceptually:

```text
Developer
   ↓
GitHub
   ↓
Deployment Platform
   ↓
Elvyn Web Application
   ↓
Supabase
```

Production secrets are configured in the deployment platform rather than committed to GitHub.

---

## 27. Security Boundary

The following are trusted security boundaries:

- Supabase Auth
- PostgreSQL RLS
- Storage policies
- Server-side authorization

The following are NOT trusted security boundaries:

- Hidden frontend buttons
- Client-side route checks alone
- UI filters
- Client-provided user IDs
- Browser state

---

## 28. Scalability Strategy

Elvyn should scale progressively.

### Stage 1 — MVP

```text
Next.js
Supabase
PostgreSQL
Storage
```

### Stage 2 — Growth

Potential additions:

- Better search indexes
- Background jobs
- Realtime where needed
- Analytics
- Caching where justified

### Stage 3 — Intelligence

Potential additions:

- AI services
- Embeddings
- Retrieval
- Context systems
- AI-assisted workflows

The architecture should not prematurely build Stage 2 or Stage 3 infrastructure.

---

## 29. Architectural Constraints

1. Do not introduce unnecessary services.
2. Do not implement AI in MVP.
3. Do not duplicate business logic.
4. Do not rely on frontend-only authorization.
5. Do not commit secrets.
6. Do not create unnecessary global state.
7. Do not introduce animation libraries without a concrete use case.
8. Do not duplicate authoritative data merely for UI convenience.
9. Do not create database tables without a documented domain purpose.
10. Do not sacrifice accessibility for visual effects.
11. Do not optimize for hypothetical scale before actual requirements justify it.
12. Do not couple the application to the previous QuantumFlow project.

---

## 30. Architecture Decision Principle

When multiple technical solutions are possible, prefer the solution that is:

1. Simpler
2. Secure
3. Maintainable
4. Free or low-cost
5. Compatible with the current stack
6. Easy for a small development team to understand
7. Extensible when a real future requirement appears

---

## 31. Architectural Success Criteria

The architecture is considered ready for implementation when:

- Core application layers are understood.
- Authentication boundaries are defined.
- User ownership is defined.
- Supabase responsibilities are clear.
- Frontend responsibilities are clear.
- Database responsibilities are clear.
- AI is isolated from MVP dependencies.
- Repository structure is defined.
- Security boundaries are explicit.
- The database schema can be designed without major architectural ambiguity.

---

**Document Status:** Foundation Draft  
**Next Document:** `docs/architecture/DATABASE.md`
