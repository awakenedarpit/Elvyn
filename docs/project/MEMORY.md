# Elvyn — Project Memory

**Version:** 1.0  
**Purpose:** Persistent context for AI-assisted development  
**Status:** Active

---

## 1. Project Identity

**Name:** Elvyn

Elvyn is a modern personal productivity and learning workspace designed to help students and individuals organize tasks, projects, goals, notes, resources, planning, study sessions, and focused work in one calm interface.

The product should feel like a unified personal workspace rather than a collection of disconnected tools.

---

## 2. Current Product Direction

Elvyn is being recreated from scratch as a **new GitHub repository** rather than continuing the previous QuantumFlow codebase as a branch.

The project is being planned carefully before application vibe coding begins.

The primary objective is to create a clean, maintainable, secure foundation that can later support intelligent/AI features.

---

## 3. AI Status

**AI features are currently ON HOLD.**

AI functionality should appear only as clearly labeled **Coming Soon** functionality where appropriate.

Do not implement AI APIs, model integrations, embeddings, vector search, or fake AI behavior during the MVP foundation.

AI is a future phase after the core product is stable.

---

## 4. Repository

**GitHub repository:** `awakenedarpit/Elvyn`

The repository should remain clean and organized by responsibility.

Documentation belongs under `docs/` rather than being scattered across the repository root.

---

## 5. Documentation Structure

Current planning structure:

```text
docs/
├── product/
│   ├── PRD.md
│   └── REQUIREMENTS.md
│
├── architecture/
│   ├── ARCHITECTURE.md
│   └── DATABASE.md
│
├── ui-ux/
│   └── UI_UX.md
│
├── development/
│   ├── DEVELOPMENT_PLAN.md
│   ├── RULES.md
│   └── PHASES.md
│
├── design/
│   └── DESIGN.md
│
├── project/
│   └── MEMORY.md
│
├── testing/
└── tracking/
```

Additional documents should be placed in the appropriate folder.

Do not create random `.md` files in the repository root.

---

## 6. Core Planned Features

The non-AI MVP is planned around:

- Authentication
- User profile/preferences
- Dashboard
- Tasks
- Projects
- Goals
- Notes
- Resources
- Planner
- Study sessions
- Focus mode
- Search
- Notifications
- Optional file attachments/storage
- Command center/productivity shortcuts
- Responsive UI
- Light/dark themes

Feature scope is controlled by the PRD and requirements documents.

---

## 7. Planned Technology Direction

The planned $0-friendly stack is:

```text
Next.js
React
TypeScript
Tailwind CSS
shadcn/ui
Supabase
PostgreSQL
Supabase Auth
Supabase Storage
```

Additional animation/UI tools may be used selectively:

```text
Motion
GSAP
Spline
Aceternity UI
AnimMaster
PatternPad
ShapeDividers
Uiverse
Bklit
```

Do not add dependencies without a clear reason.

---

## 8. Supabase Decision

A **new Supabase project may be used for Elvyn**.

The project should not assume that the old QuantumFlow database schema is reusable.

If an existing Supabase project is ever reused, its users/data must be treated as valuable and migration compatibility must be verified before changing anything.

Never reset or overwrite a production database as a shortcut.

---

## 9. Security Memory

Supabase is part of the application's security boundary.

Required principles:

- RLS on private data.
- User ownership enforced server-side/database-side.
- Service-role secrets never exposed to the browser.
- Environment variables for credentials.
- Database changes represented by migrations.
- Cross-user access explicitly tested.

Never disable RLS simply to make a feature work.

---

## 10. UI Memory

Elvyn's visual direction is:

> **Powerful because it is clear, not because it is loud.**

The authenticated workspace should be calm and focused.

The landing page may be more expressive and use stronger motion/visual effects.

Important visual principles:

- Strong hierarchy
- Clean surfaces
- Restrained accents
- Useful information density
- Subtle motion
- Responsive design
- Accessibility
- Light and dark mode

---

## 11. Animation Memory

Animation should enhance understanding and continuity, not distract users.

Preferred strategy:

```text
CSS → simple transitions
Motion → React UI motion
GSAP → complex timelines
Spline → selected 3D experiences
```

Other supplied UI libraries are references/tools and should be used selectively.

Reduced-motion support is required.

---

## 12. Development Method

Elvyn must be built in small verified steps.

The development loop is:

```text
Read documentation
      ↓
Choose current phase
      ↓
Define one small task
      ↓
Inspect existing code
      ↓
Implement
      ↓
Type check / lint / build as appropriate
      ↓
Manual verification
      ↓
Update tracking/context
      ↓
Focused Git commit
```

Do not ask an AI coding tool to generate the entire application in one step.

---

## 13. Current Planning Status

Completed planning documents include:

- [x] PRD
- [x] Requirements
- [x] Architecture
- [x] Database architecture
- [x] UI/UX
- [x] Development plan
- [x] Rules
- [x] Phase blueprint
- [x] Design system
- [x] Project memory

Still required in the documentation foundation:

- [ ] Testing strategy
- [ ] Bug tracker
- [ ] Daily task tracker
- [ ] Any remaining architecture/supporting specification identified during review

---

## 14. Current Development Phase

**Current stage:** Pre-coding documentation foundation.

Do not begin major application implementation until the required planning documents are completed and reviewed.

The next work should continue completing the documentation system in an organized manner.

---

## 15. Important Decisions

### Decision 1 — Name

The project was renamed from the QuantumFlow concept to **Elvyn**.

### Decision 2 — Repository

Elvyn uses a **new repository** rather than a branch of the old project.

### Decision 3 — AI

AI functionality is deferred and labeled **Coming Soon**.

### Decision 4 — Planning First

The project will use structured Markdown documentation before vibe coding to reduce AI drift and implementation mistakes.

### Decision 5 — Organization

Documentation must be grouped into appropriate folders. The repository should not become cluttered with files at the root.

### Decision 6 — Design References

The supplied UI/animation websites may influence implementation, but Elvyn must maintain its own consistent design system.

---

## 16. AI Context Rules

When beginning a new AI coding session, provide or point the AI to:

```text
README.md

docs/product/PRD.md
docs/product/REQUIREMENTS.md

docs/architecture/ARCHITECTURE.md
docs/architecture/DATABASE.md

docs/ui-ux/UI_UX.md

docs/development/RULES.md
docs/development/DEVELOPMENT_PLAN.md
docs/development/PHASES.md

docs/design/DESIGN.md
docs/project/MEMORY.md
```

The AI must not assume that previous chat context is available.

Repository documentation is the persistent project context.

---

## 17. What Must Not Be Forgotten

- Elvyn is a new project, not a branch continuation.
- AI is not part of the current MVP implementation.
- Supabase security is critical.
- User data must never be casually deleted or migrated destructively.
- Documentation must remain organized.
- Features should be implemented phase-by-phase.
- UI should remain calm and usable.
- Animation should be purposeful.
- No silent scope expansion.
- No fake feature completion.
- No secrets committed to Git.

---

## 18. Update Policy

Update this file when a decision materially changes:

- Product direction
- Architecture
- Technology stack
- Supabase strategy
- Feature scope
- Development phase
- Important constraints

Do not update it for every tiny implementation detail.

Use `bugs.md` and `task_today.md` for short-lived development state.

---

## 19. Memory Maintenance

At the end of a major phase, review this file and update:

```text
Current phase
Completed capabilities
Important decisions
Known constraints
Next major direction
```

The goal is to keep this document useful and concise enough for an AI coding tool to read quickly.

---

**Status:** Active project memory  
**Next:** Testing documentation and development tracking files
