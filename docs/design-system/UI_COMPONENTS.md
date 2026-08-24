# Elvyn UI Components

## Principles

- Calm, focused, and minimal.
- Reuse primitives before creating page-specific controls.
- Prefer clear hierarchy over decorative effects.
- Keep interactions subtle and fast.
- Respect `prefers-reduced-motion`.

## Core primitives

- `SectionCard` — elevated content grouping.
- `Button` — primary actions and navigation actions.
- `Input` — single-line form fields.
- `Textarea` — longer text entry.
- `Badge` — status and metadata labels.
- `EmptyState` — consistent zero-data states.

## Layout

Dashboard pages should use the shared navigation and a consistent max-width container. Mobile layouts should stack content rather than introduce horizontal scrolling.

## Motion

Use motion only to communicate hierarchy or state. Avoid continuous decorative animation. Any animation must remain usable with reduced-motion preferences enabled.
