# Elvyn — Development Plan

**Version:** 1.0  
**Status:** Master Build Roadmap  
**Parent:** `docs/ui-ux/UI_UX.md`

---

## 1. Purpose

This document is the master implementation roadmap for Elvyn. Development must proceed phase-by-phase instead of allowing AI coding tools to generate large amounts of unrelated code at once.

Each phase has:

- A clear goal
- A limited scope
- Expected outputs
- Verification criteria
- A stopping point

A phase is not considered complete merely because the code compiles. Its acceptance criteria must pass.

---

## 2. Build Strategy

```text
Specification
     ↓
Project Foundation
     ↓
Authentication
     ↓
Database
     ↓
Core Features
     ↓
Supporting Features
     ↓
Polish
     ↓
Testing
     ↓
Deployment
```

AI features remain **Coming Soon** throughout the MVP.

---

# Phase 0 — Documentation & Planning

### Goal

Complete the specification system before vibe coding.

### Documents

```text
docs/
├── product/
├── architecture/
├── ui-ux/
├── development/
├── design/
├── testing/
└── tracking/
```

### Outputs

- PRD
- Requirements
- Architecture
- Database architecture
- UI/UX
- Development plan
- Rules
- Phases
- Design system
- Memory/context
- Testing strategy
- Bug tracking
- Daily task tracking

### Acceptance

- [ ] Product scope is clear.
- [ ] MVP and future scope are separated.
- [ ] Repository organization is defined.
- [ ] Technical stack is fixed.
- [ ] AI is explicitly deferred.

---

# Phase 1 — Repository & Application Foundation

### Goal

Create a clean, maintainable Next.js application foundation.

### Work

- Initialize Next.js.
- Configure TypeScript.
- Configure Tailwind CSS.
- Configure shadcn/ui.
- Establish project folders.
- Configure linting/formatting.
- Add environment example.
- Add base layout.
- Add theme system.
- Establish global design tokens.

### Acceptance

- [ ] Application starts locally.
- [ ] Production build succeeds.
- [ ] No unnecessary starter/demo code remains.
- [ ] Folder structure matches documentation.
- [ ] Theme foundation works.

---

# Phase 2 — Supabase Foundation & Authentication

### Goal

Connect Elvyn to the chosen Supabase project and establish secure authentication.

### Work

- Configure Supabase client.
- Configure environment variables.
- Configure Auth.
- Implement sign up.
- Implement sign in.
- Implement sign out.
- Implement session handling.
- Implement protected routes.
- Implement profile creation.
- Implement account settings foundation.

### Important

The new Elvyn repository is independent from the previous QuantumFlow codebase. A Supabase project may be newly created for Elvyn. If an existing Supabase project is intentionally reused, migrations and identity compatibility must be verified before changing production data.

### Acceptance

- [ ] New account can register.
- [ ] Existing account can sign in.
- [ ] Session persists correctly.
- [ ] Sign out works.
- [ ] Unauthenticated users cannot access private application routes.
- [ ] No secrets are exposed to the browser.

---

# Phase 3 — Database Schema & Security

### Goal

Implement the approved PostgreSQL architecture.

### Work

- Create migrations.
- Create profiles.
- Create preferences.
- Create core entity tables.
- Add foreign keys.
- Add constraints.
- Add indexes.
- Enable RLS.
- Create policies.
- Create storage foundation.

### Acceptance

- [ ] Migrations run cleanly.
- [ ] RLS is enabled on private tables.
- [ ] User A cannot access User B data.
- [ ] Foreign keys work.
- [ ] Invalid data is rejected.
- [ ] Storage access is protected.

---

# Phase 4 — Application Shell

### Goal

Build the reusable Elvyn workspace interface.

### Work

- Sidebar.
- Header.
- Responsive navigation.
- Mobile navigation.
- Page container.
- Breadcrumb/context where useful.
- User menu.
- Notifications entry.
- Theme control.
- Global command-center foundation.

### Acceptance

- [ ] Navigation works.
- [ ] Responsive behavior works.
- [ ] Active route is clear.
- [ ] Keyboard navigation works.
- [ ] Shell does not require feature-specific hacks.

---

# Phase 5 — Dashboard

### Goal

Create the central Elvyn overview.

### Work

- Greeting/context.
- Today's focus.
- Priority tasks.
- Upcoming items.
- Goal progress.
- Recent activity.
- Quick actions.
- Loading states.
- Empty states.
- Error states.

### Acceptance

- [ ] Dashboard reflects real database data.
- [ ] Empty accounts receive useful guidance.
- [ ] No fake data remains in production UI.
- [ ] Dashboard is responsive.

---

# Phase 6 — Tasks

### Goal

Build the core task management workflow.

### Work

- Task creation.
- Task editing.
- Task completion.
- Task reopening.
- Priority.
- Due dates.
- Status.
- Project association.
- Goal association.
- Archive behavior.
- Task filtering.

### Acceptance

- [ ] CRUD workflow works.
- [ ] Ownership is enforced.
- [ ] Completion state persists.
- [ ] Filters work.
- [ ] Validation works.

---

# Phase 7 — Projects & Goals

### Goal

Connect day-to-day work with larger outcomes.

### Projects

- Create.
- Edit.
- Archive.
- Status.
- Due dates.
- Related tasks.
- Related notes/resources.

### Goals

- Create.
- Edit.
- Progress.
- Target dates.
- Related work.
- Completion.

### Acceptance

- [ ] Project relationships work.
- [ ] Goal relationships work.
- [ ] Progress is consistent.
- [ ] Cross-user relationships are impossible.

---

# Phase 8 — Notes & Resources

### Goal

Build Elvyn's personal knowledge layer.

### Notes

- Create.
- Edit.
- Delete/archive.
- Search.
- Link to projects/tasks/goals.

### Resources

- Save URL.
- Edit metadata.
- Open resource.
- Organize by type/project.
- Archive.

### Acceptance

- [ ] Notes persist correctly.
- [ ] Resources persist correctly.
- [ ] Searchable content is returned correctly.
- [ ] Ownership is enforced.

---

# Phase 9 — Planner

### Goal

Introduce lightweight time planning.

### Work

- Upcoming deadlines.
- Daily view.
- Weekly view.
- Planned tasks.
- Study/focus blocks where applicable.

### Constraint

Do not build a full calendar platform in MVP.

### Acceptance

- [ ] Time-based information is understandable.
- [ ] Dates are displayed in the user's timezone.
- [ ] Mobile experience remains usable.

---

# Phase 10 — Study System

### Goal

Track focused learning activity.

### Work

- Start study session.
- Stop study session.
- Subject/topic.
- Duration.
- Session history.
- Basic progress view.

### Acceptance

- [ ] Sessions persist.
- [ ] Duration is accurate.
- [ ] Active sessions recover appropriately.
- [ ] History is user-specific.

---

# Phase 11 — Focus Mode

### Goal

Create a distraction-reduced work mode.

### Work

- Select task/project.
- Timer.
- Start.
- Pause.
- Resume.
- Complete.
- Cancel.
- Session history.
- Minimal interface.

### Acceptance

- [ ] Timer behaves correctly.
- [ ] Refresh behavior is handled.
- [ ] Session state persists appropriately.
- [ ] Reduced-motion support works.

---

# Phase 12 — Search & Notifications

### Goal

Make information inside Elvyn easy to retrieve.

### Search

- Global search.
- Categories.
- Result states.
- Keyboard shortcut.
- PostgreSQL search strategy.

### Notifications

- Notification list.
- Read/unread state.
- Clear feedback.

### Acceptance

- [ ] Search returns authorized records only.
- [ ] Search results identify entity type.
- [ ] Notifications are user-specific.

---

# Phase 13 — Files & Storage

### Goal

Add optional file attachment functionality.

### Work

- Storage bucket.
- Upload.
- File metadata.
- Download/view.
- Delete/archive.
- Storage policies.

### Acceptance

- [ ] User can only access own files.
- [ ] Unsupported file types are handled safely.
- [ ] Upload failures have clear feedback.

---

# Phase 14 — Command Center & Productivity Polish

### Goal

Make common workflows faster.

### Work

- Command palette.
- Quick create.
- Keyboard shortcuts.
- Fast navigation.
- Context actions.

### Acceptance

- [ ] Keyboard workflows are reliable.
- [ ] Commands respect permissions.
- [ ] Mobile users are not blocked by keyboard-first features.

---

# Phase 15 — UI Polish & Motion

### Goal

Apply the Elvyn visual identity after core functionality is stable.

### Work

- Refine typography.
- Refine spacing.
- Refine semantic colors.
- Motion transitions.
- Microinteractions.
- Landing page animation.
- Selective Aceternity effects.
- Optional GSAP sequences.
- Optional Spline scene.
- Background patterns/dividers where appropriate.

### Rules

Do not introduce large visual effects before core workflows are stable.

### Acceptance

- [ ] No animation blocks functionality.
- [ ] Reduced motion works.
- [ ] Mobile performance is acceptable.
- [ ] Design is consistent across pages.

---

# Phase 16 — Testing & Security Hardening

### Goal

Validate the complete MVP before release.

### Work

- Manual test suite.
- Authentication tests.
- RLS tests.
- CRUD tests.
- Responsive tests.
- Accessibility checks.
- Error-state checks.
- Build checks.
- Environment checks.
- Security review.

### Acceptance

All critical test cases pass.

---

# Phase 17 — Performance & Production Readiness

### Goal

Prepare the app for real users.

### Work

- Image optimization.
- Bundle review.
- Query review.
- Database index review.
- Loading optimization.
- Error handling.
- Metadata.
- Favicon/branding.
- Production environment.

### Acceptance

- [ ] Production build succeeds.
- [ ] No development-only content remains.
- [ ] No secrets are committed.
- [ ] Critical workflows remain fast and reliable.

---

# Phase 18 — Deployment

### Goal

Deploy Elvyn using the $0 architecture.

### Work

- Connect GitHub repository.
- Configure production environment variables.
- Configure Supabase production project.
- Deploy.
- Verify authentication.
- Verify database.
- Verify storage.
- Verify critical routes.

### Acceptance

- [ ] Production URL works.
- [ ] Authentication works.
- [ ] Database works.
- [ ] RLS works.
- [ ] No secrets appear in client bundles.

---

# Phase 19 — Post-MVP Stabilization

### Goal

Fix real-world issues before adding major new features.

### Work

- Monitor bugs.
- Improve confusing UX.
- Remove dead code.
- Improve documentation.
- Optimize common workflows.
- Review user feedback.

New features should not be added simply because they are possible.

---

# Phase 20 — AI / Intelligence Layer — FUTURE

### Status

**COMING SOON — NOT PART OF MVP**

Potential future features:

- AI assistant.
- AI planning.
- AI task breakdown.
- Intelligent search.
- Summaries.
- Recommendations.
- Contextual memory.
- AI workflows.

AI should be added only after the non-AI foundation is stable.

---

# 3. Phase Execution Rules

For every phase:

```text
Read relevant docs
      ↓
Define today's task
      ↓
Implement one small unit
      ↓
Run checks
      ↓
Verify behavior
      ↓
Update tracking docs
      ↓
Commit
      ↓
Move to next unit
```

Never ask an AI coding tool to implement the entire roadmap in one prompt.

---

# 4. Commit Strategy

Commits should represent meaningful completed units.

Examples:

```text
feat(auth): add sign in flow
feat(tasks): add task creation
feat(projects): add project dashboard
fix(tasks): correct completion state
refactor(ui): extract task card
chore(db): add task indexes
```

Avoid huge commits containing unrelated changes.

---

# 5. Definition of Done

A feature is done when:

- [ ] Requirements are satisfied.
- [ ] UI is complete.
- [ ] Database behavior is correct.
- [ ] Authorization is tested.
- [ ] Loading state exists.
- [ ] Error state exists.
- [ ] Empty state exists where applicable.
- [ ] Responsive behavior works.
- [ ] Accessibility basics work.
- [ ] No obvious console/build errors exist.
- [ ] Relevant documentation is updated.
- [ ] Changes are committed.

---

# 6. Priority Order

If time becomes limited, prioritize:

```text
1. Authentication
2. Security / RLS
3. Tasks
4. Projects
5. Goals
6. Dashboard
7. Notes
8. Resources
9. Focus
10. Study
11. Planner
12. Search
13. Notifications
14. Files
15. Advanced animation
16. AI
```

AI remains last because it is explicitly deferred.

---

# 7. Scope Control

If a proposed feature is not in the current phase:

1. Do not implement it immediately.
2. Record it in the appropriate planning document.
3. Decide whether it belongs in MVP.
4. Add it to a future phase if approved.

This prevents scope drift during vibe coding.

---

**Status:** Ready to guide implementation  
**Next:** Rules / AI coding constraints
