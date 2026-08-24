# Elvyn — Phase Execution Blueprint

**Version:** 1.0  
**Status:** Execution Specification  
**Related:** `DEVELOPMENT_PLAN.md`, `RULES.md`

---

## 1. How to Use This File

`DEVELOPMENT_PLAN.md` explains **what we build and in what order**.

This file explains **how each phase is executed safely**.

Never jump directly from planning to a huge vibe-coding prompt. Work through the phase checkpoints below.

Standard cycle:

```text
Phase brief
   ↓
Pre-check
   ↓
Small task
   ↓
Implement
   ↓
Verify
   ↓
Document
   ↓
Commit
   ↓
Next task
```

---

# Phase 0 — Documentation Foundation

### Objective

Finish the specification system and establish a single source of truth.

### Prerequisites

- Product idea finalized.
- Elvyn name finalized.
- Repository created.

### Primary Files

```text
docs/product/
docs/architecture/
docs/ui-ux/
docs/development/
docs/design/
docs/testing/
docs/tracking/
```

### Tasks

- [ ] PRD complete
- [ ] Requirements complete
- [ ] Architecture complete
- [ ] Database plan complete
- [ ] UI/UX complete
- [ ] Development plan complete
- [ ] Rules complete
- [ ] Phase blueprint complete
- [ ] Design system complete
- [ ] Memory document complete
- [ ] Testing strategy complete
- [ ] Bug tracker created
- [ ] Daily task tracker created

### Verification

Confirm that no important MVP decision exists only in chat.

### Checkpoint

**STOP. Do not begin application coding until the required foundation documents are ready.**

---

# Phase 1 — Application Foundation

### Objective

Create a clean, empty Elvyn application foundation.

### Prerequisites

Phase 0 complete.

### Tasks

- [ ] Initialize Next.js + TypeScript
- [ ] Configure Tailwind
- [ ] Configure shadcn/ui
- [ ] Configure linting/formatting
- [ ] Establish app folder structure
- [ ] Add global styles
- [ ] Add theme tokens
- [ ] Add basic layout
- [ ] Remove starter/demo content

### Verification

```text
Install dependencies
Run development server
Run lint
Run type check
Run production build
```

### Acceptance

The application opens successfully and contains only Elvyn foundation UI.

### Checkpoint

Commit before starting authentication.

---

# Phase 2 — Supabase & Authentication

### Objective

Establish secure authentication and user sessions.

### Prerequisites

- Phase 1 complete.
- Supabase project selected.
- Environment variables available.

### Tasks

- [ ] Install/configure Supabase client
- [ ] Add environment configuration
- [ ] Create auth pages
- [ ] Sign up
- [ ] Sign in
- [ ] Sign out
- [ ] Session persistence
- [ ] Protected application routes
- [ ] Profile initialization

### Verification

Test at least:

```text
New user → Sign up → App
Existing user → Sign in → App
User → Refresh → Still signed in
User → Sign out → Protected route blocked
```

### Security Check

- [ ] No service-role secret in browser code.
- [ ] Authenticated identity comes from Supabase session.

### Checkpoint

Do not continue until authentication is reliable.

---

# Phase 3 — Database & RLS

### Objective

Implement the approved schema securely.

### Prerequisites

- Auth working.
- `DATABASE.md` reviewed.

### Tasks

- [ ] Create migrations
- [ ] Create profile/preferences tables
- [ ] Create core entity tables
- [ ] Add constraints
- [ ] Add foreign keys
- [ ] Add indexes
- [ ] Enable RLS
- [ ] Add policies
- [ ] Configure storage policies

### Verification

Use two test accounts:

```text
Account A
Account B
```

Confirm A cannot access B's private records and vice versa.

### Checkpoint

**Security must pass before feature CRUD begins.**

---

# Phase 4 — Application Shell

### Objective

Create the reusable workspace layout.

### Tasks

- [ ] Sidebar
- [ ] Header
- [ ] Mobile navigation
- [ ] User menu
- [ ] Theme control
- [ ] Route highlighting
- [ ] Main content container
- [ ] Basic command-center entry

### Verification

Check:

- Desktop
- Tablet
- Mobile
- Keyboard navigation

### Acceptance

Every future feature can render inside the shell without duplicating layout logic.

---

# Phase 5 — Dashboard

### Objective

Create the first real authenticated Elvyn experience.

### Tasks

- [ ] Greeting
- [ ] Today's focus
- [ ] Priority work
- [ ] Upcoming items
- [ ] Goal progress
- [ ] Recent activity
- [ ] Quick actions
- [ ] Loading states
- [ ] Empty states
- [ ] Error states

### Verification

Use real Supabase data.

Create an empty test account and a populated test account.

### Acceptance

No production dashboard section depends on hardcoded fake data.

---

# Phase 6 — Tasks

### Objective

Build the core task workflow.

### Tasks

- [ ] Create
- [ ] Read/list
- [ ] Edit
- [ ] Complete
- [ ] Reopen
- [ ] Priority
- [ ] Due date
- [ ] Status
- [ ] Project relation
- [ ] Goal relation
- [ ] Archive
- [ ] Filters

### Verification

Test the complete CRUD lifecycle.

### Security

Repeat cross-user ownership tests.

### Acceptance

Task changes persist after refresh and remain correctly associated with the authenticated user.

---

# Phase 7 — Projects & Goals

### Objective

Connect tasks to larger outcomes.

### Tasks

Projects:

- [ ] CRUD
- [ ] Status
- [ ] Progress
- [ ] Related tasks
- [ ] Related notes/resources
- [ ] Archive

Goals:

- [ ] CRUD
- [ ] Progress
- [ ] Target date
- [ ] Related work
- [ ] Completion

### Verification

Create a project, attach tasks, connect a goal, update progress, refresh, and verify relationships.

### Checkpoint

No duplicated relationship logic across unrelated components.

---

# Phase 8 — Notes & Resources

### Objective

Create Elvyn's personal knowledge layer.

### Tasks

Notes:

- [ ] Create
- [ ] Edit
- [ ] Archive/delete
- [ ] Search
- [ ] Relationships

Resources:

- [ ] Save URL
- [ ] Edit metadata
- [ ] Organize
- [ ] Open
- [ ] Archive

### Verification

Test empty, normal, invalid, and unauthorized cases.

### Acceptance

Users can save and retrieve their information without seeing another user's content.

---

# Phase 9 — Planner

### Objective

Add lightweight time planning without becoming a full calendar application.

### Tasks

- [ ] Upcoming deadlines
- [ ] Day view
- [ ] Week view
- [ ] Planned tasks
- [ ] Study/focus blocks

### Verification

Check timezone behavior and mobile layout.

### Acceptance

Users can understand upcoming work quickly.

---

# Phase 10 — Study

### Objective

Track learning sessions.

### Tasks

- [ ] Start session
- [ ] Stop session
- [ ] Subject/topic
- [ ] Duration
- [ ] History
- [ ] Basic progress

### Verification

Start a session, refresh, finish it, and verify history.

### Acceptance

Session durations and ownership are correct.

---

# Phase 11 — Focus Mode

### Objective

Provide a distraction-reduced work session.

### Tasks

- [ ] Select context
- [ ] Timer
- [ ] Start
- [ ] Pause
- [ ] Resume
- [ ] Complete
- [ ] Cancel
- [ ] History

### Verification

Test timer behavior across pause/resume and refresh scenarios.

### UX Check

- [ ] Minimal interface
- [ ] Clear timer state
- [ ] Reduced motion support

---

# Phase 12 — Search & Notifications

### Objective

Improve retrieval and awareness.

### Tasks

Search:

- [ ] Global search
- [ ] Entity categories
- [ ] Empty state
- [ ] Loading state
- [ ] Error state
- [ ] Keyboard shortcut

Notifications:

- [ ] List
- [ ] Read/unread
- [ ] Clear state

### Security

Search must only return records the current user is authorized to see.

---

# Phase 13 — Storage & Attachments

### Objective

Add optional file support.

### Tasks

- [ ] Storage bucket
- [ ] Upload
- [ ] Metadata
- [ ] View/download
- [ ] Delete/archive
- [ ] Storage policies

### Verification

Test unauthorized access directly, not only through the UI.

### Acceptance

Users cannot access another user's private files.

---

# Phase 14 — Command Center

### Objective

Speed up frequent workflows.

### Tasks

- [ ] Command palette
- [ ] Search
- [ ] Navigation commands
- [ ] Quick creation
- [ ] Keyboard shortcuts

### Verification

Test keyboard and pointer workflows.

### Mobile Rule

No critical functionality may depend exclusively on keyboard shortcuts.

---

# Phase 15 — Design & Motion Polish

### Objective

Apply the polished Elvyn visual layer after functionality is stable.

### Tasks

- [ ] Final typography
- [ ] Final color tokens
- [ ] Component refinement
- [ ] Motion transitions
- [ ] Microinteractions
- [ ] Landing hero effects
- [ ] Selective advanced animation

### Tool Guidance

```text
Simple transition → CSS
React interaction → Motion
Complex timeline → GSAP
3D hero → Spline
Special visual section → Aceternity
Pattern → PatternPad
Divider → ShapeDividers
Component inspiration → Uiverse
```

### Verification

- [ ] Reduced motion
- [ ] Mobile performance
- [ ] No blocked interactions
- [ ] No unnecessary animation

---

# Phase 16 — Testing & Security

### Objective

Validate the MVP as a real product.

### Tasks

- [ ] Authentication tests
- [ ] CRUD tests
- [ ] RLS tests
- [ ] Storage tests
- [ ] Responsive checks
- [ ] Accessibility checks
- [ ] Error-state checks
- [ ] Build check
- [ ] Environment review
- [ ] Secret scan/review

### Critical Test

Attempt unauthorized access using a second account and direct requests where appropriate.

### Checkpoint

No critical security issue may remain open for launch.

---

# Phase 17 — Production Readiness

### Objective

Prepare the application for deployment.

### Tasks

- [ ] Remove debug UI
- [ ] Remove test data
- [ ] Optimize images
- [ ] Review queries
- [ ] Review indexes
- [ ] Review bundle
- [ ] Add metadata
- [ ] Branding
- [ ] Production environment

### Verification

Run the complete critical workflow from a clean browser session.

---

# Phase 18 — Deployment

### Objective

Deploy the $0 Elvyn architecture.

### Tasks

- [ ] Connect GitHub deployment
- [ ] Configure production environment variables
- [ ] Configure Supabase project
- [ ] Deploy
- [ ] Test authentication
- [ ] Test database
- [ ] Test storage
- [ ] Test core routes

### Acceptance

A new user can discover, register, use, and safely sign out of Elvyn in production.

---

# Phase 19 — Stabilization

### Objective

Fix real-world problems before expanding scope.

### Tasks

- [ ] Review bugs
- [ ] Review confusing UX
- [ ] Remove dead code
- [ ] Improve performance
- [ ] Improve documentation
- [ ] Review feedback

### Rule

Stability takes priority over feature count.

---

# Phase 20 — AI Future Layer

### Status

**COMING SOON — NOT IMPLEMENTED IN MVP**

Potential work:

- AI assistant
- Intelligent planning
- AI task breakdown
- AI search
- Summaries
- Recommendations
- Contextual memory

### Entry Criteria

Do not begin this phase until the non-AI MVP is stable, secure, tested, and deployed.

---

# 3. Standard AI Coding Prompt Template

Use this structure for every vibe-coding task:

```text
PROJECT: Elvyn

CURRENT PHASE:
<phase number + name>

TASK:
<one specific task>

READ FIRST:
- docs/<relevant document>
- <relevant source files>

GOAL:
<expected behavior>

CONSTRAINTS:
- Follow docs/development/RULES.md
- Do not modify unrelated files.
- Do not add unapproved dependencies.
- Do not implement future/AI features.

ACCEPTANCE CRITERIA:
- [ ] ...
- [ ] ...
- [ ] ...

VERIFY:
<commands/manual tests>

AFTER IMPLEMENTATION:
Report changed files, verification results, and known limitations.
```

---

# 4. Phase Completion Template

Before moving to the next phase:

```text
Phase: ____

Implemented:
- [ ]

Verified:
- [ ] Type check
- [ ] Lint
- [ ] Build
- [ ] Manual tests
- [ ] Security tests where applicable
- [ ] Responsive checks

Documentation:
- [ ] Updated

Git:
- [ ] Focused commit created

Known bugs:
- [ ] Recorded in bugs.md

Decision:
- [ ] Phase complete
```

---

# 5. Emergency Stop Rules

Stop development immediately if:

- User data may be deleted.
- A production migration is uncertain.
- RLS is being disabled to fix functionality.
- Authentication behavior becomes ambiguous.
- A secret is exposed.
- The AI coding tool proposes a major architecture change without approval.
- Requirements conflict.

Resolve the issue before continuing.

---

# 6. Golden Rule

> **One phase. One small task. One verified change. One clear commit.**

This blueprint exists to prevent Elvyn from becoming an unstructured collection of AI-generated code.

---

**Status:** Ready for controlled implementation  
**Next:** `docs/design/DESIGN.md`
