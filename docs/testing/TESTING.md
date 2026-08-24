# Elvyn — Testing Strategy

**Version:** 1.0  
**Status:** Testing Source of Truth  
**Related:** `docs/development/RULES.md`, `docs/development/PHASES.md`

---

## 1. Purpose

Testing exists to prove that Elvyn is:

- Correct
- Secure
- Usable
- Responsive
- Accessible
- Stable
- Ready for deployment

A feature is not complete merely because its UI appears to work.

---

## 2. Testing Layers

Elvyn should use multiple levels of verification:

```text
Static checks
    ↓
Unit/component tests where useful
    ↓
Integration tests
    ↓
Database/RLS tests
    ↓
Manual user-flow tests
    ↓
Responsive/accessibility checks
    ↓
Production smoke tests
```

Use the simplest testing layer that provides meaningful confidence.

---

## 3. Definition of Done

A feature can be marked complete only when:

- [ ] Requirements are satisfied.
- [ ] Happy path works.
- [ ] Validation works.
- [ ] Loading state works where relevant.
- [ ] Empty state works where relevant.
- [ ] Error state works where relevant.
- [ ] Data persists correctly.
- [ ] Authorization is correct.
- [ ] Cross-user access is tested where relevant.
- [ ] Responsive layout is checked.
- [ ] Accessibility is checked.
- [ ] Type checking passes.
- [ ] Lint passes.
- [ ] Build passes.
- [ ] Relevant documentation is updated.
- [ ] Known bugs are recorded.

---

# 4. Static Verification

Before committing meaningful code changes, run the project's configured checks.

Expected categories:

```text
TypeScript type check
Lint
Production build
```

Do not suppress errors merely to obtain a passing build.

---

# 5. Authentication Tests

## Sign Up

- [ ] Valid new account can register.
- [ ] Invalid email is rejected.
- [ ] Invalid/insufficient password is rejected according to configured policy.
- [ ] Duplicate account is handled clearly.
- [ ] User is redirected appropriately after successful registration.

## Sign In

- [ ] Valid credentials work.
- [ ] Invalid credentials fail safely.
- [ ] Error message is understandable.
- [ ] Session persists after refresh.

## Sign Out

- [ ] User can sign out.
- [ ] Session is cleared.
- [ ] Protected pages cannot be accessed after sign out.

## Protected Routes

- [ ] Unauthenticated users cannot access authenticated application data.
- [ ] Authenticated users can access their permitted workspace.

---

# 6. User/Profile Tests

- [ ] Profile loads correctly.
- [ ] User can update allowed preferences.
- [ ] Changes persist after refresh.
- [ ] One user cannot modify another user's profile data.
- [ ] Invalid input is rejected.

---

# 7. Database Tests

Every private database table must be tested for ownership.

Use at least two accounts:

```text
User A
User B
```

For each private entity:

```text
A creates record
A can read record
A can update record
A can delete/archive record
B cannot read record
B cannot update record
B cannot delete/archive record
```

Repeat after refresh and, where appropriate, with direct database/API requests.

---

# 8. RLS Testing

RLS is a critical security requirement.

Test:

- [ ] SELECT policies
- [ ] INSERT policies
- [ ] UPDATE policies
- [ ] DELETE policies
- [ ] Ownership checks
- [ ] Related-record access
- [ ] Storage policies

Never treat a hidden UI button as an authorization test.

The security boundary must exist server-side/database-side.

---

# 9. CRUD Testing

For every CRUD feature test:

```text
Create
Read
Update
Delete/archive
Refresh
Unauthorized access
Invalid input
Empty state
Error state
```

Core entities include:

- Tasks
- Projects
- Goals
- Notes
- Resources
- Study sessions
- Focus sessions
- Notifications

---

# 10. Task Tests

- [ ] Create task.
- [ ] Edit title/details.
- [ ] Set priority.
- [ ] Set due date.
- [ ] Mark complete.
- [ ] Reopen.
- [ ] Filter/list correctly.
- [ ] Archive/delete according to product rules.
- [ ] Refresh preserves state.
- [ ] Relationships to projects/goals remain correct.

---

# 11. Project Tests

- [ ] Create project.
- [ ] Edit project.
- [ ] Change status.
- [ ] View progress.
- [ ] Attach relevant tasks.
- [ ] Archive project.
- [ ] Refresh preserves relationships.

---

# 12. Goal Tests

- [ ] Create goal.
- [ ] Set target date.
- [ ] Update progress.
- [ ] Complete goal.
- [ ] Connect supporting work.
- [ ] Verify progress remains correct after refresh.

---

# 13. Notes & Resources Tests

## Notes

- [ ] Create.
- [ ] Edit.
- [ ] Retrieve.
- [ ] Search.
- [ ] Archive/delete.
- [ ] Unauthorized user cannot access.

## Resources

- [ ] Save valid URL.
- [ ] Reject invalid input where required.
- [ ] Edit metadata.
- [ ] Open resource.
- [ ] Search/filter.
- [ ] Archive/delete.

---

# 14. Planner Tests

- [ ] Upcoming work appears correctly.
- [ ] Dates display correctly.
- [ ] Planned items persist.
- [ ] Mobile layout works.
- [ ] Timezone behavior is verified.

Avoid assuming the browser timezone and database timezone behave identically without testing.

---

# 15. Study Tests

- [ ] Start study session.
- [ ] Record subject/topic.
- [ ] Track duration.
- [ ] Finish session.
- [ ] History updates.
- [ ] Data persists after refresh.
- [ ] User ownership is enforced.

---

# 16. Focus Mode Tests

- [ ] Start timer.
- [ ] Pause timer.
- [ ] Resume timer.
- [ ] Complete session.
- [ ] Cancel session according to product rules.
- [ ] Duration is reasonable and consistent.
- [ ] UI remains usable on mobile.
- [ ] Reduced motion works.

---

# 17. Search Tests

- [ ] Search finds expected records.
- [ ] Results are categorized appropriately.
- [ ] Empty query behavior is sensible.
- [ ] No-result state is helpful.
- [ ] Loading state works.
- [ ] Errors are handled.
- [ ] Search never exposes unauthorized records.
- [ ] Keyboard interaction works where supported.

---

# 18. Notification Tests

- [ ] Notifications load.
- [ ] Read/unread state works.
- [ ] State persists.
- [ ] Empty state works.
- [ ] Unauthorized notification data is inaccessible.

---

# 19. Storage Tests

If attachments are enabled:

- [ ] Authorized upload works.
- [ ] Invalid file is rejected where required.
- [ ] Metadata is correct.
- [ ] Authorized user can retrieve their file.
- [ ] Another user cannot retrieve the file.
- [ ] Delete/archive behavior works.
- [ ] Storage policies are verified independently of the UI.

---

# 20. UI State Testing

Every data-dependent screen should be checked in these states:

```text
Loading
↓
Success with data
↓
Success with no data
↓
Error
```

Where relevant also test:

```text
Submitting
Disabled
Success feedback
Validation failure
Permission denied
```

---

# 21. Responsive Testing

Test at minimum:

```text
Mobile
Tablet
Desktop
Large desktop
```

Check:

- [ ] No horizontal overflow.
- [ ] Navigation works.
- [ ] Buttons remain reachable.
- [ ] Forms remain usable.
- [ ] Tables/lists adapt correctly.
- [ ] Modals fit the viewport.
- [ ] Focus mode remains usable.
- [ ] Text does not overlap.
- [ ] Touch targets remain practical.

---

# 22. Accessibility Testing

Check:

- [ ] Keyboard navigation.
- [ ] Visible focus state.
- [ ] Semantic headings.
- [ ] Form labels.
- [ ] Accessible names for icon buttons.
- [ ] Logical tab order.
- [ ] Sufficient contrast.
- [ ] Color is not the sole state indicator.
- [ ] Error messages are understandable.
- [ ] Reduced motion.

Where available, use automated accessibility tooling as an additional check, not as the only accessibility test.

---

# 23. Animation Testing

For animated interfaces:

- [ ] Animation does not block interaction.
- [ ] Animation does not cause layout instability.
- [ ] Mobile performance is acceptable.
- [ ] Reduced-motion preference is respected.
- [ ] Important information remains understandable without animation.
- [ ] No animation runs continuously without purpose.

---

# 24. Error Handling Tests

Simulate failures where practical:

- Network failure
- Database failure
- Invalid input
- Unauthorized access
- Missing record
- Expired session
- Storage failure

The UI should provide a useful user-facing message without leaking unnecessary technical details.

---

# 25. Security Testing

Before launch, explicitly verify:

- [ ] No secrets committed.
- [ ] No service-role key in client bundle.
- [ ] RLS enabled where required.
- [ ] Ownership policies correct.
- [ ] Server-side authorization present.
- [ ] Input validation present at appropriate boundaries.
- [ ] Storage policies correct.
- [ ] Sensitive errors are not exposed.
- [ ] Debug endpoints/UI removed or protected.

---

# 26. Performance Testing

Focus on meaningful user experience rather than arbitrary numbers.

Check:

- [ ] Initial page is reasonably fast.
- [ ] Large lists do not load unbounded data.
- [ ] Images are optimized.
- [ ] Heavy client components are justified.
- [ ] Animation does not cause obvious lag.
- [ ] Database queries are appropriate.
- [ ] Relevant indexes exist for frequent queries.

Do not prematurely optimize without evidence.

---

# 27. Data Integrity Tests

Verify that:

- [ ] Required fields cannot become invalid.
- [ ] Foreign keys behave correctly.
- [ ] Duplicate data is prevented where required.
- [ ] Deletion behavior is intentional.
- [ ] Archived data behaves according to requirements.
- [ ] Timestamps behave consistently.
- [ ] User ownership cannot be forged from the client.

---

# 28. Regression Testing

After a significant change, re-test the critical path:

```text
Sign in
↓
Dashboard
↓
Create task
↓
Edit task
↓
Complete task
↓
Create/project or goal relationship
↓
Search
↓
Refresh
↓
Sign out
```

The exact path can evolve as the MVP grows.

---

# 29. Pre-Deployment Smoke Test

Use a clean browser/session.

```text
Open production site
↓
Landing page loads
↓
Sign up/sign in
↓
Dashboard loads
↓
Create core record
↓
Modify core record
↓
Refresh
↓
Verify persistence
↓
Sign out
↓
Verify protected route behavior
```

Repeat critical checks after deployment configuration changes.

---

# 30. AI Testing Rules

AI coding tools must not claim tests passed unless they actually ran them or the user supplied the result.

AI should report:

```text
Tests run:
- ...

Passed:
- ...

Failed:
- ...

Not run:
- ...
```

Never fabricate test output.

---

# 31. Bug Classification

Use these priorities:

### P0 — Critical

Security/data-loss/complete outage issue.

### P1 — High

Major feature broken or serious user workflow blocked.

### P2 — Medium

Important but usable with a workaround.

### P3 — Low

Minor visual, copy, or non-critical usability issue.

---

# 32. Test Evidence

For important milestones, record enough information to reproduce confidence:

```text
Date
Commit
Environment
Test scenario
Expected result
Actual result
Status
```

Detailed short-lived results can be kept in tracking files/issues rather than making this document unnecessarily large.

---

# 33. Launch Gate

Elvyn should not be considered production-ready until:

- [ ] Core authentication works.
- [ ] Core CRUD works.
- [ ] RLS/security checks pass.
- [ ] Critical user flows work.
- [ ] Responsive checks pass.
- [ ] Accessibility baseline passes.
- [ ] Production build passes.
- [ ] No unresolved P0 issues.
- [ ] No unresolved critical P1 security/data issues.
- [ ] Environment configuration is verified.
- [ ] AI remains correctly marked Coming Soon.

---

# 34. Final Testing Principle

> **A feature is complete when it works correctly, securely, and predictably—not when the screen looks finished.**

---

**Status:** Active testing strategy  
**Next:** `docs/tracking/bugs.md` and `docs/tracking/task_today.md`
