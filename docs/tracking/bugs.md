# Elvyn — Bug Tracker

**Status:** Active

This file tracks known issues during development.

---

## How to Record a Bug

Use one entry per issue.

```text
## BUG-001 — Short title

Status: Open
Priority: P0/P1/P2/P3
Phase: Phase X
Date: YYYY-MM-DD

### Description
What is wrong?

### Expected
What should happen?

### Actual
What happens instead?

### Reproduction
1. ...
2. ...
3. ...

### Affected Files
- ...

### Hypothesis
Possible cause, if known.

### Fix
What was changed.

### Verification
How the fix was verified.

### Resolution
Open / Fixed / Won't Fix / Duplicate
```

---

## Priority Definitions

### P0 — Critical

Security issue, data loss, authentication compromise, or complete outage.

### P1 — High

Major workflow or feature is broken.

### P2 — Medium

Important issue with a reasonable workaround.

### P3 — Low

Minor visual, copy, or non-critical usability issue.

---

# Open Bugs

_No known bugs recorded yet._

---

# Resolved Bugs

_No resolved bugs recorded yet._

---

## Rules

- Record reproducible bugs clearly.
- Never hide a known security/data issue.
- Do not mark a bug fixed without verification.
- Link the relevant commit/PR when useful.
- Remove stale hypotheses after the root cause is known.
- Keep temporary debugging notes out of this file unless they help future diagnosis.
