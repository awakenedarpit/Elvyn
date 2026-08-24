# Elvyn

A calm, modern workspace for productivity, planning, learning, and focused work.

## Status

**Active development** — core authentication, dashboard, goals, tasks, notes, profile, shared UI primitives, loading/error states, and CI validation are in place.

AI-powered functionality is intentionally deferred and will be introduced later as a **Coming Soon** capability.

## Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- Supabase / PostgreSQL
- GitHub Actions

## Repository Structure

```text
.
├── src/                 # Application source
├── docs/                # Product, architecture, design, development and testing docs
├── .github/workflows/   # CI automation
├── AGENTS.md            # AI coding-agent quick-start instructions
├── package.json
├── tsconfig.json
└── next.config.ts
```

## Documentation

Start with:

1. `docs/project/MEMORY.md`
2. `docs/product/PRD.md`
3. `docs/architecture/ARCHITECTURE.md`
4. `docs/architecture/DATABASE.md`
5. `docs/architecture/API.md`
6. `docs/development/RULES.md`
7. `docs/development/PHASES.md`
8. `docs/design/DESIGN.md`
9. `docs/testing/TESTING.md`

## Local Development

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Then open the local development URL shown by Next.js.

## Environment

Copy `.env.example` to `.env.local` and provide the required public Supabase values.

Never commit `.env.local` or secret credentials.

## CI

Every push and pull request is validated with GitHub Actions using:

```text
npm ci → lint → typecheck → build
```

The workflow also supports manual execution from the GitHub Actions tab.

## Development Principle

> Build small. Verify everything. Document decisions. Protect user data.
