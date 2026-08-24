# Elvyn — AI Agent Instructions

This file is the quick-start context for AI coding agents working in this repository.

## Read First

Before making implementation changes, read:

1. `docs/project/MEMORY.md`
2. `docs/development/RULES.md`
3. `docs/development/PHASES.md`
4. The relevant product/architecture/design document for the task
5. The existing source files that will be changed

## Current Status

Elvyn is in **Phase 1 — Application Foundation**.

The repository is being built from scratch as a new project.

## Current Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- shadcn/ui planned
- Supabase planned
- PostgreSQL via Supabase planned

## AI Scope

AI functionality is **Coming Soon** and is not implemented in the current MVP foundation.

Do not add model APIs, embeddings, vector search, AI providers, or fake AI behavior.

## Working Rules

- Work on one small task at a time.
- Inspect existing code before editing it.
- Follow `docs/development/RULES.md`.
- Do not silently expand scope.
- Do not add unnecessary dependencies.
- Do not expose secrets.
- Do not disable security controls to make a feature work.
- Do not make destructive database changes without explicit approval.
- Keep documentation and source files organized.
- Verify changes before declaring them complete.

## Change Report

After implementation, report:

```text
Changed:
- path

Why:
- reason

Verified:
- checks/tests

Remaining:
- known limitations
```

## Stop Conditions

Stop and request clarification if:

- Requirements conflict.
- User data could be deleted or corrupted.
- A destructive migration is proposed.
- Authentication/authorization behavior is ambiguous.
- A major architectural change is required.
- A secret may be exposed.

**Golden rule:** Build small, verify everything, and protect user data.
