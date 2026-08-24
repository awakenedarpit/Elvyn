# Elvyn

A calm, modern workspace for productivity, planning, learning, and focused work.

## Project Status

**Phase 1 — Application Foundation**

Elvyn is being built from scratch in small, verified phases. AI-powered functionality is intentionally deferred and will be introduced later as a **Coming Soon** capability.

## Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- Supabase / PostgreSQL — planned
- shadcn/ui — planned

## Repository Structure

```text
.
├── src/                 # Application source
├── docs/                # Product, architecture, design, development and testing docs
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

Copy `.env.example` to `.env.local` and provide the required public Supabase values once the Elvyn Supabase project is connected.

Never commit `.env.local` or secret credentials.

## Development Principle

> Build small. Verify everything. Document decisions. Protect user data.
