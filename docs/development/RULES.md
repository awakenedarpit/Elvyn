# Elvyn — AI Coding & Development Rules

**Version:** 1.0  
**Status:** Mandatory Project Rules  
**Applies To:** All human and AI-assisted development

---

## 1. Core Principle

Elvyn must be built deliberately, not generated blindly.

AI coding tools must treat the repository documentation as the source of project intent and must not invent architecture, features, or conventions when the required decision is already documented.

---

## 2. Source-of-Truth Hierarchy

When documents disagree, use this order:

```text
1. Explicit user decision
2. PRD.md
3. REQUIREMENTS.md
4. ARCHITECTURE.md
5. DATABASE.md
6. UI_UX.md
7. DESIGN.md
8. DEVELOPMENT_PLAN.md
9. PHASES.md
10. RULES.md
11. Memory / tracking documents
```

If a conflict could materially affect data, security, or architecture, stop and request clarification instead of guessing.

---

## 3. Product Scope

### MVP

Build the approved non-AI Elvyn productivity and learning workspace.

### AI

AI is **Coming Soon**.

Do not:

- Add AI APIs.
- Add model providers.
- Add vector databases.
- Add embeddings.
- Build fake AI functionality.
- Present mocked AI responses as real functionality.

AI placeholders are allowed only when they clearly communicate that the feature is not yet available.

---

## 4. Technology Rules

Use the approved stack unless a documented decision changes it.

Expected foundation:

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

Use additional libraries only when they solve a real requirement.

Animation tools available to the project include:

```text
Motion
GSAP
Spline
Aceternity UI
AnimMaster
PatternPad
ShapeDividers
Uiverse
```

Do not add a dependency merely because it provides a visually interesting component.

---

## 5. Folder Organization

Keep the repository organized by responsibility.

Preferred documentation structure:

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

Application code should follow a clear feature/domain structure rather than placing everything into one large directory.

Do not create random documentation files in the repository root.

---

## 6. Documentation Rules

Before implementing a feature:

1. Find the relevant requirement.
2. Find the relevant architecture decision.
3. Confirm the feature belongs to the current phase.
4. Implement the smallest useful unit.
5. Update documentation when behavior changes.

If a new architectural decision is required, document it before coding around it.

---

## 7. Vibe Coding Rules

Never ask an AI coding tool to:

```text
"Build the entire app."
"Implement everything."
"Make the whole project production ready."
```

Instead provide:

- Current phase
- Current task
- Relevant document
- Files that may be changed
- Acceptance criteria
- Constraints

AI should work in small, verifiable units.

---

## 8. Before Editing Code

AI must inspect the relevant existing code before changing it.

Do not assume:

- A file exists.
- A component has a particular API.
- A database table has a particular schema.
- A dependency is installed.
- A route follows an assumed convention.

Read first. Then modify.

---

## 9. Minimal Change Principle

Prefer the smallest change that correctly solves the task.

Do not:

- Refactor unrelated code.
- Rename unrelated files.
- Rewrite working components unnecessarily.
- Replace the entire architecture for a small feature.
- Delete code simply because it is unfamiliar.

---

## 10. TypeScript Rules

Use TypeScript strictly.

Avoid:

```ts
any
```

unless there is a documented and justified reason.

Prefer:

- Explicit types
- Narrow unions
- Reusable interfaces/types
- Type-safe Supabase queries
- Proper null handling

Do not silence type errors with unsafe casts simply to make the build pass.

---

## 11. React Rules

Prefer:

- Small components
- Reusable primitives
- Clear props
- Server/client boundaries that are intentional
- Local state for local concerns

Avoid giant components containing unrelated application logic.

Do not introduce global state when local/server state is sufficient.

---

## 12. Next.js Rules

Use the framework intentionally.

Choose server/client components based on actual requirements.

Do not mark an entire page tree as client-side simply because one component requires interactivity.

Keep server-only credentials and logic on the server.

---

## 13. Supabase Rules

Supabase is part of the security boundary.

### Required

- RLS for private data.
- Ownership checks.
- Protected storage policies.
- Environment variables for credentials.
- Migrations for schema changes.

### Never

Expose a service-role key to client-side code.

Do not assume hiding a UI element provides security.

Authorization must be enforced by the backend/database.

---

## 14. Database Rules

Never make undocumented manual schema changes.

Database changes must be represented as migrations.

Before adding a table:

1. Confirm the requirement.
2. Confirm ownership.
3. Define relationships.
4. Define constraints.
5. Define RLS.
6. Consider indexes.
7. Add migration.
8. Test cross-user access.

Avoid premature tables for future features.

---

## 15. RLS Rules

Every private table must have appropriate RLS policies.

At minimum consider:

```text
SELECT
INSERT
UPDATE
DELETE
```

Test with more than one authenticated user.

The expected security property is:

```text
User A cannot read, modify, or delete User B's private records.
```

---

## 16. API & Server Rules

Validate input on the server for security-sensitive operations.

Do not trust:

- Client-provided user IDs.
- Client-provided ownership fields.
- Hidden form fields.
- UI-only permissions.

The authenticated identity should determine ownership wherever possible.

---

## 17. Environment Variables

Never commit secrets.

Use:

```text
.env.local
```

and maintain a safe example such as:

```text
.env.example
```

The example must contain variable names but not real credentials.

---

## 18. UI Rules

Every meaningful feature should account for:

- Loading
- Empty
- Error
- Success
- Responsive behavior
- Accessibility

Do not build only the happy path.

---

## 19. Design System Rules

Use semantic design tokens instead of scattering hard-coded visual values throughout components.

Prefer shared components for repeated patterns.

If the same UI pattern appears three or more times, consider extracting it into a reusable component.

Do not create abstractions prematurely for one-off elements.

---

## 20. Animation Rules

Animation must serve a purpose.

Use the simplest appropriate tool:

```text
CSS/Tailwind → simple transitions
Motion → React UI motion
GSAP → complex sequences
Spline → selected 3D experiences
```

Avoid:

- Excessive parallax
- Constant movement
- Animation on every element
- Long blocking transitions
- Performance-heavy effects in core workflows

Always consider reduced motion.

---

## 21. External UI Sources

The following websites are references/tools, not permission to blindly copy entire interfaces:

- Motion
- Bklit
- GSAP
- Spline
- shadcn/ui
- Aceternity UI
- AnimMaster
- PatternPad
- ShapeDividers
- Uiverse

Adapt patterns to Elvyn's design system and verify licensing/usage requirements before incorporating third-party assets.

---

## 22. Accessibility Rules

Interactive elements must be accessible by keyboard.

Use:

- Semantic HTML
- Labels
- Focus states
- Accessible names
- Appropriate contrast
- Reduced-motion support

Do not use color alone to communicate important state.

---

## 23. Error Handling

Do not expose raw technical errors to users.

Bad:

```text
PostgrestError: 23505 relation...
```

Good:

```text
We couldn't save that change. Please try again.
```

Technical details may be logged for development/debugging where appropriate.

---

## 24. Validation Rules

Validate data at the appropriate boundaries.

Use:

```text
Client validation → UX
Server validation → Security/business rules
Database constraints → Data integrity
```

Never rely on client validation alone.

---

## 25. Performance Rules

Do not optimize blindly.

First identify the problem, then optimize the relevant layer.

Avoid:

- Unnecessary client components
- Huge dependency additions
- Unoptimized images
- Excessive re-renders
- Unbounded database queries
- Loading everything on the initial page

---

## 26. Security Rules

Treat security as a feature, not a final cleanup step.

Never:

- Commit secrets.
- Trust client authorization.
- Disable RLS to make a feature easier.
- Expose service-role credentials.
- Log sensitive data unnecessarily.
- Accept arbitrary ownership IDs without verification.

---

## 27. Git Rules

Make focused commits.

Examples:

```text
feat(auth): add sign in
feat(tasks): add task creation
fix(tasks): prevent duplicate completion
refactor(ui): extract task card
chore(db): add task index
```

Avoid giant mixed commits.

Do not rewrite project history unless explicitly required.

---

## 28. Testing Rules

Before declaring a feature complete:

```text
Type check
Lint
Build
Manual workflow test
Security/ownership test
Responsive test
```

The exact commands are defined by the project's actual configuration and testing document.

---

## 29. Debugging Rules

When something fails:

1. Reproduce it.
2. Read the actual error.
3. Identify the affected layer.
4. Inspect the relevant code.
5. Form a hypothesis.
6. Make the smallest fix.
7. Re-run the failing test.
8. Check for regressions.
9. Record important bugs in `bugs.md`.

Do not randomly rewrite code until the error disappears.

---

## 30. Dependency Rules

Before adding a dependency ask:

1. Is it necessary?
2. Can the existing stack solve it?
3. Does it materially improve the product?
4. Is it maintained?
5. Does it increase bundle size or complexity?
6. Does its license/usage fit the project?

Fewer dependencies are preferred when functionality is equivalent.

---

## 31. File Rules

Do not create files randomly.

Every new file should have a clear responsibility and live in the appropriate directory.

Avoid:

```text
utils2.ts
helper-final.ts
component-new.tsx
old-but-working.tsx
```

Use descriptive names based on responsibility.

---

## 32. Naming Rules

Use consistent naming.

Examples:

```text
PascalCase → React components
camelCase → functions/variables
UPPER_CASE → constants where appropriate
kebab-case → route segments where appropriate
```

Names should communicate purpose.

---

## 33. Comments

Do not comment obvious code.

Good comments explain:

- Why a non-obvious decision exists.
- A security constraint.
- A browser/framework workaround.
- A future migration consideration.

Avoid comments that merely restate the code.

---

## 34. No Fake Completion

Never claim a feature is complete when:

- It is mocked.
- It only works with hardcoded data.
- It fails on refresh.
- Authorization is missing.
- Error handling is missing where required.
- The production build fails.

Clearly label prototypes and placeholders.

---

## 35. No Silent Scope Expansion

If implementation reveals a requirement that is outside the current phase:

```text
Stop
↓
Record it
↓
Decide
↓
Update plan if approved
↓
Continue
```

Do not silently add unrelated features.

---

## 36. AI Context Rules

At the beginning of an AI coding session, provide:

```text
Project: Elvyn
Current phase: <phase>
Current task: <task>
Relevant docs: <paths>
Allowed files: <paths if known>
Acceptance criteria: <criteria>
```

The AI should not assume knowledge from previous sessions unless it is present in repository documentation or supplied context.

---

## 37. AI Change Report

After making changes, the AI should report:

```text
Changed:
- file/path

Why:
- reason

Verified:
- checks/tests

Remaining:
- known limitations
```

This keeps development traceable.

---

## 38. Stop Conditions

AI must stop and ask for clarification when:

- Requirements conflict.
- Database ownership is ambiguous.
- A destructive migration is required.
- Existing user data could be affected.
- A security policy is unclear.
- A major dependency decision is required.
- A feature requires changing the approved architecture.

Do not guess on high-impact decisions.

---

## 39. Data Protection Rule

Existing user data must be treated as valuable and potentially irreversible.

Before any operation that could alter or delete existing accounts/data:

- Verify the target Supabase project.
- Verify the intended environment.
- Review the migration.
- Confirm backup/recovery considerations.

Never reset a production database as a shortcut.

---

## 40. Final Rule

> **Build small. Verify everything. Document decisions. Protect user data. Keep the architecture simple.**

If a shortcut makes Elvyn harder to understand, secure, test, or maintain, it is probably not a good shortcut.

---

**Status:** Mandatory  
**Next:** `PHASES.md`
