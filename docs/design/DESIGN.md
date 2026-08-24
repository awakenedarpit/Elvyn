# Elvyn — Design System

**Version:** 1.0  
**Status:** Visual Source of Truth  
**Related:** `docs/ui-ux/UI_UX.md`, `docs/development/RULES.md`

---

## 1. Design Direction

Elvyn should feel like a **calm, intelligent, modern personal workspace** rather than a generic productivity dashboard.

Core qualities:

- Clear
- Focused
- Premium
- Calm
- Modern
- Human
- Technical without feeling cold
- Visually distinctive without becoming distracting

The interface should help users think and act, not compete for attention.

---

## 2. Design Principles

### Clarity First

Every screen should make the primary action obvious.

### Hierarchy Over Decoration

Typography, spacing, grouping, and contrast should communicate importance before visual effects do.

### Calm by Default

Avoid unnecessary motion, excessive gradients, noisy backgrounds, and dense dashboards.

### Progressive Disclosure

Show the information needed now and reveal secondary details when useful.

### Consistency

Repeated patterns should look and behave consistently throughout the application.

### Accessible by Design

Visual polish must never reduce readability, keyboard usability, or contrast.

---

# 3. Color System

Use semantic tokens rather than hard-coded colors throughout application components.

The exact final hex values may be tuned during implementation, but the semantic structure must remain stable.

## Light Mode

```text
Background       → warm/neutral near-white
Surface          → white
Surface Muted    → subtle neutral
Text Primary     → deep neutral
Text Secondary   → muted neutral
Border           → low-contrast neutral
Primary          → Elvyn brand accent
Success          → semantic green
Warning          → semantic amber
Destructive      → semantic red
Info             → semantic blue
```

## Dark Mode

```text
Background       → deep neutral
Surface          → elevated dark neutral
Surface Muted    → slightly lighter dark neutral
Text Primary     → near-white
Text Secondary   → muted light neutral
Border           → subtle light-neutral alpha
Primary          → accessible brand accent
Success          → semantic green
Warning          → semantic amber
Destructive      → semantic red
Info             → semantic blue
```

### Rules

- Never communicate important state through color alone.
- Maintain sufficient contrast.
- Use semantic tokens for status colors.
- Avoid using many unrelated accent colors.

---

# 4. Typography

Typography should create a strong hierarchy without excessive font sizes.

## Hierarchy

```text
Display
↓
Page Heading
↓
Section Heading
↓
Card Heading
↓
Body
↓
Secondary / Metadata
↓
Caption
```

### Guidelines

- Display typography is primarily for landing/hero moments.
- Application pages should prioritize readability.
- Body text should remain comfortable on mobile.
- Use weight to establish hierarchy before using excessive size.
- Avoid using too many font families.

A modern sans-serif should be the primary UI family.

---

# 5. Spacing

Use a consistent spacing scale.

Preferred conceptual scale:

```text
4px   → micro spacing
8px   → tight spacing
12px  → compact spacing
16px  → standard spacing
20px  → comfortable spacing
24px  → section/card spacing
32px  → large spacing
40px  → major separation
48px+ → page-level separation
```

Do not introduce arbitrary spacing values unless necessary.

---

# 6. Layout

Elvyn uses a structured workspace layout.

```text
┌──────────────────────────────────────────┐
│ Header                                   │
├────────────┬─────────────────────────────┤
│ Sidebar    │ Main Content                │
│            │                             │
│            │                             │
└────────────┴─────────────────────────────┘
```

### Desktop

- Persistent navigation is preferred.
- Content should have comfortable maximum widths.
- Avoid unnecessarily wide text blocks.

### Tablet

- Navigation may become compact.
- Cards should reflow naturally.

### Mobile

- Navigation becomes mobile-friendly.
- Avoid horizontal overflow.
- Primary actions remain easy to reach.
- Multi-column layouts collapse intentionally.

---

# 7. Border Radius

Use a restrained radius system.

```text
Small       → inputs, compact controls
Medium      → cards, buttons
Large       → prominent surfaces
Full/Pill   → tags, status indicators, selected controls
```

Avoid mixing many unrelated corner radii.

---

# 8. Borders

Borders should define structure without becoming visually heavy.

Use borders for:

- Cards
- Inputs
- Separators
- Navigation groups
- Tables/list structures

Prefer subtle borders over thick outlines.

---

# 9. Shadows

Shadows should communicate elevation, not decoration.

Use approximately three levels:

```text
None / flat
Subtle elevation
Prominent elevation
```

Avoid large shadows on every card.

---

# 10. Surfaces & Cards

Cards should group related information.

A card may contain:

```text
Icon / Label
Heading
Primary information
Secondary metadata
Action
```

### Rules

- Do not put every individual value inside its own card.
- Avoid excessive nesting.
- Use visual grouping instead of unnecessary borders.
- Interactive cards must communicate that they are interactive.

---

# 11. Buttons

Button hierarchy:

```text
Primary
Secondary
Tertiary/Ghost
Destructive
Icon-only
```

### Primary

Used for the main action of a section/page.

### Secondary

Used for important supporting actions.

### Ghost/Tertiary

Used for low-emphasis actions.

### Destructive

Used only for destructive operations.

### Icon-only

Must have an accessible label/tool-tip where appropriate.

---

# 12. Inputs & Forms

Forms should be simple and predictable.

Every important field needs:

- Label
- Input
- Validation state
- Helpful message where needed
- Error state where applicable

Do not rely on placeholder text as the only label.

---

# 13. Status Indicators

Use clear semantic status styles.

Examples:

```text
Task status
Goal progress
Project status
Study session state
Notification state
```

Status should be understandable through:

```text
Text + icon + optional color
```

not color alone.

---

# 14. Icons

Icons should be simple and consistent.

Rules:

- Use one primary icon family.
- Avoid mixing visual styles unnecessarily.
- Icons support meaning; they do not replace labels when labels are necessary.
- Icon-only controls require accessible names.

---

# 15. Dashboard Design

The dashboard should prioritize **what needs attention now**.

Suggested hierarchy:

```text
Greeting / context
        ↓
Today's focus
        ↓
Priority work
        ↓
Upcoming
        ↓
Goals / progress
        ↓
Recent activity
```

Avoid turning the dashboard into a wall of statistics.

---

# 16. Task Design

Task rows/cards should communicate quickly:

```text
Completion
Title
Priority
Due date
Project/context
Optional quick action
```

Actions should not overwhelm the main task information.

---

# 17. Project Design

Projects should visually communicate:

- Project identity
- Status
- Progress
- Deadline
- Related work

Use progress indicators carefully; a progress bar should represent meaningful progress rather than arbitrary decoration.

---

# 18. Goal Design

Goals should feel outcome-oriented.

Show:

```text
Goal title
Why/description when useful
Progress
Target date
Supporting work
```

Do not make goals look identical to tasks.

---

# 19. Focus Mode Design

Focus Mode is intentionally different from the main dashboard.

Characteristics:

- Minimal navigation
- Reduced visual noise
- Large readable timer
- Clear current context
- Strong start/pause/finish actions
- Calm motion

The user should immediately understand what they are focusing on.

---

# 20. Study Design

Study interfaces should emphasize:

- Current subject/topic
- Session duration
- Current activity
- History/progress

Avoid unnecessary gamification unless explicitly added to the product scope later.

---

# 21. Empty States

Empty states should answer:

1. What is empty?
2. Why does it matter?
3. What can the user do next?

Example structure:

```text
Illustration/Icon
Short explanation
Primary action
Optional secondary action
```

Never use an empty state that simply says "No data" when a helpful next step is possible.

---

# 22. Loading States

Prefer skeletons or meaningful placeholders for content-heavy screens.

Rules:

- Avoid excessive spinners.
- Preserve layout stability.
- Do not make the page jump when data arrives.

---

# 23. Error States

Errors should be:

- Understandable
- Actionable
- Calm
- Non-technical

Where retry is possible, provide a retry action.

---

# 24. Toasts & Feedback

Use temporary notifications for lightweight feedback:

```text
Saved
Completed
Deleted
Copied
Updated
```

Do not use toasts for information the user must retain or act upon later.

---

# 25. Motion System

Motion should reinforce hierarchy and continuity.

## Motion Levels

### Level 1 — Micro

```text
Hover
Focus
Button press
Checkbox completion
```

### Level 2 — Interface

```text
Panel entry
Modal entry
Dropdown
Navigation transition
```

### Level 3 — Showcase

```text
Landing hero
Special onboarding
Selected feature visualization
```

Level 3 motion must not be used throughout the application.

---

# 26. Motion Timing

Use short, purposeful transitions for normal UI.

Long cinematic animation belongs only to special presentation areas.

Avoid animation that delays task completion.

---

# 27. Reduced Motion

Respect the user's reduced-motion preference.

When reduced motion is enabled:

- Remove unnecessary movement.
- Replace large transitions with subtle opacity/state changes.
- Avoid continuous animated backgrounds.
- Avoid motion-dependent interactions.

---

# 28. Animation Tool Strategy

```text
CSS
→ hover/focus/basic transitions

Motion
→ React component transitions and layout animation

GSAP
→ advanced timeline/sequenced animation

Spline
→ selected 3D visual experiences

Aceternity UI
→ carefully selected visual components

PatternPad
→ background patterns

ShapeDividers
→ decorative section transitions

Uiverse
→ inspiration/selected UI components

AnimMaster
→ selected animation patterns where useful
```

Never introduce multiple animation libraries for the same simple interaction.

---

# 29. Landing Page Visual Language

The landing page may be more expressive than the application.

Potential elements:

- Subtle gradient lighting
- Layered depth
- Animated hero
- Interactive product preview
- Carefully controlled particles/patterns
- Optional 3D element

The landing page must still communicate the product clearly without requiring animation to understand it.

---

# 30. Application Visual Language

The authenticated workspace should be calmer than the landing page.

Prefer:

```text
Strong hierarchy
+ clean surfaces
+ subtle motion
+ restrained accents
+ useful density
```

Avoid turning the workspace into a visual showcase.

---

# 31. Dark Mode

Dark mode is a first-class theme, not an inverted light mode.

Rules:

- Use multiple surface levels.
- Avoid pure black everywhere.
- Maintain readable secondary text.
- Avoid excessive glow.
- Ensure borders remain visible.
- Verify charts/status colors independently.

---

# 32. Light Mode

Light mode should remain comfortable for extended use.

Rules:

- Avoid pure white everywhere if it creates excessive glare.
- Keep borders subtle.
- Maintain readable text contrast.
- Use accent colors selectively.

---

# 33. Responsive Rules

Design from the content outward, not from a single screenshot.

At every breakpoint ask:

- What must remain visible?
- What can collapse?
- What can move into a menu?
- What can stack?
- What should become a bottom action?

Do not simply shrink desktop layouts.

---

# 34. Accessibility Visual Checklist

- [ ] Text contrast is sufficient.
- [ ] Focus state is visible.
- [ ] Interactive elements are distinguishable.
- [ ] Color is not the only state indicator.
- [ ] Text remains readable at responsive sizes.
- [ ] Reduced motion is supported.
- [ ] Error states are visually obvious and textually explained.

---

# 35. Design Anti-Patterns

Avoid:

- Excessive glassmorphism
- Gradient overload
- Neon everywhere
- Huge text on every page
- Card-within-card-within-card layouts
- Excessive rounded corners
- Constant animation
- Low-contrast secondary text
- Decorative elements competing with actions
- Copying another product's visual identity

---

# 36. Component Consistency

Before creating a new component, check whether an existing component can be reused.

If a component needs different behavior, prefer controlled variants over duplicated components where appropriate.

Example:

```text
Button
├── primary
├── secondary
├── ghost
└── destructive
```

rather than four unrelated button implementations.

---

# 37. Design Review Gate

Before a UI feature is considered complete:

```text
Desktop
↓
Tablet
↓
Mobile
↓
Dark mode
↓
Light mode
↓
Loading
↓
Empty
↓
Error
↓
Keyboard
↓
Reduced motion
```

---

# 38. Final Design Rule

> **Elvyn should feel powerful because it is clear, not because it is loud.**

Visual effects should make the product memorable. They should never make the product harder to use.

---

**Status:** Design foundation ready  
**Next:** `docs/project/MEMORY.md`
