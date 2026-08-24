# Elvyn — UI/UX Specification

**Version:** 1.0  
**Status:** Foundation Draft  
**Parent:** `docs/architecture/DATABASE.md`  
**Next:** `docs/development/DEVELOPMENT_PLAN.md`

---

## 1. Design Goal

Elvyn should feel like a calm, intelligent personal workspace rather than a collection of unrelated dashboards.

The interface should communicate:

- Clarity
- Focus
- Control
- Progress
- Personalization
- Modern technology

Visual polish must support usability, not compete with it.

---

## 2. Core UX Principle

> **Reduce cognitive load before adding visual complexity.**

Every screen should answer:

1. Where am I?
2. What matters right now?
3. What can I do next?
4. What happened after I acted?

---

## 3. Visual Direction

Elvyn should use a modern productivity aesthetic with:

- Clean layouts
- Strong typography
- Generous spacing
- Subtle depth
- Soft surfaces
- Controlled gradients
- Purposeful motion
- Minimal visual noise

Avoid making the product look like a generic admin panel.

---

## 4. Design System Foundation

### Typography

Use a highly readable modern sans-serif system.

Typography hierarchy:

```text
Display
Heading 1
Heading 2
Heading 3
Body
Secondary
Caption
Label
```

Typography must remain readable at mobile sizes.

### Spacing

Use a consistent spacing scale rather than arbitrary values throughout the application.

### Radius

Use a coherent radius system for:

- Cards
- Inputs
- Buttons
- Dialogs
- Popovers
- Containers

Avoid excessive rounding on every element.

---

## 5. Color System

The exact palette will be finalized in `DESIGN.md`.

The UI should support:

- Primary accent
- Background
- Surface
- Elevated surface
- Border
- Primary text
- Secondary text
- Muted text
- Success
- Warning
- Destructive
- Information

Dark and light themes should use semantic tokens rather than hard-coded colors throughout components.

---

## 6. Layout Architecture

The authenticated application should use a persistent workspace shell.

Conceptually:

```text
┌───────────────────────────────────────────────┐
│ Top Bar                                       │
├────────────┬──────────────────────────────────┤
│            │                                  │
│ Sidebar    │       Main Workspace             │
│            │                                  │
│            │                                  │
└────────────┴──────────────────────────────────┘
```

Desktop:

- Persistent sidebar
- Main content area
- Optional contextual panels

Tablet:

- Collapsible navigation
- Content-first layout

Mobile:

- Compact top navigation
- Drawer or bottom navigation where appropriate
- Full-width content

---

## 7. Navigation

Primary navigation should expose the most important Elvyn areas without overwhelming the user.

Suggested structure:

```text
Overview
Tasks
Projects
Goals
Notes
Resources
Planner
Study
Focus
```

Secondary navigation:

```text
Search
Notifications
Settings
Profile
```

The exact information architecture can be adjusted during implementation, but navigation must remain predictable.

---

## 8. Dashboard UX

The dashboard should not attempt to display every piece of user data.

Suggested hierarchy:

```text
Greeting / Context
        ↓
Today's Focus
        ↓
Priority Work
        ↓
Upcoming
        ↓
Progress / Goals
        ↓
Recent Activity
```

The dashboard should emphasize action rather than analytics overload.

---

## 9. Quick Actions

Common actions should be accessible without navigating through multiple screens.

Examples:

```text
+ Task
+ Project
+ Goal
+ Note
+ Resource
Start Focus
```

A command center may later provide keyboard-driven access.

---

## 10. Task UX

Tasks should support fast scanning.

A task item should communicate:

- Completion state
- Title
- Priority
- Due date
- Project/context

Detailed information can be revealed progressively.

Avoid putting every possible field directly on the task card.

---

## 11. Project UX

Project pages should provide a clear overview.

Suggested structure:

```text
Project Header
    ↓
Status / Progress
    ↓
Tasks
    ↓
Notes / Resources
    ↓
Activity
```

Project pages should make it easy to understand what remains to be done.

---

## 12. Goal UX

Goals should visually communicate progress and direction.

A goal should show:

- Goal title
- Current progress
- Target date when available
- Related work
- Status

Progress visualization should be informative rather than decorative.

---

## 13. Notes UX

Notes should prioritize writing and retrieval.

The interface should support:

- Fast creation
- Editing
- Search
- Relationships
- Organization

Do not force users through excessive metadata entry before writing a note.

---

## 14. Resource UX

Resources should be easy to save and later retrieve.

A resource card may show:

- Title
- Domain/source
- Type
- Related project
- Tags

URLs should be visually distinguishable without dominating the interface.

---

## 15. Planner UX

The planner should make time-based work understandable.

It may provide:

- Day view
- Week view
- Upcoming deadlines
- Scheduled study sessions
- Focus blocks

The initial MVP should avoid building an unnecessarily complex calendar system.

---

## 16. Study UX

Study features should emphasize:

```text
What am I studying?
How long did I study?
What did I accomplish?
What should I do next?
```

Useful views may include:

- Subjects
- Topics
- Sessions
- Progress

---

## 17. Focus UX

Focus mode should deliberately reduce distractions.

A focus screen should contain only essential information.

Suggested structure:

```text
Current Context
      ↓
Timer
      ↓
Primary Control
      ↓
Optional Minimal Controls
```

Starting focus should feel like entering a different mode of the product.

---

## 18. Search UX

Search should be fast and forgiving.

Search states:

```text
Idle
Typing
Loading
Results
No Results
Error
```

Results should clearly identify the content type:

```text
Task
Project
Goal
Note
Resource
```

AI-powered search is explicitly **Coming Soon** and must not be presented as functional in MVP.

---

## 19. Command Center

The command center should eventually provide:

- Search
- Navigation
- Quick creation
- Common actions

Suggested shortcut:

```text
⌘ K / Ctrl K
```

It should be progressively enhanced rather than required for every workflow.

---

## 20. Empty States

Every major collection needs a useful empty state.

Bad:

```text
No data.
```

Better:

```text
No active projects yet.
Create your first project to organize a larger goal.

[ Create Project ]
```

Empty states should explain the value of the feature and provide the next action.

---

## 21. Loading States

Prefer contextual loading states over blank screens.

Use:

- Skeletons
- Inline progress
- Button loading states
- Route transitions where appropriate

Avoid excessive spinners.

---

## 22. Error States

Errors should be understandable and actionable.

Example:

```text
We couldn't save this task.
Check your connection and try again.

[ Try Again ]
```

Do not expose raw database errors to users.

---

## 23. Feedback & Microinteractions

User actions should have clear feedback.

Examples:

- Task completed → subtle confirmation
- Item saved → toast or inline confirmation
- Delete → confirmation + clear result
- Loading mutation → disabled/loading control

Microinteractions should be quick and restrained.

---

## 24. Animation Principles

Animation should communicate:

- State change
- Hierarchy
- Spatial relationship
- Progress
- Feedback

Avoid animation that merely exists for decoration.

### Recommended sequence

```text
CSS / Tailwind
     ↓
Motion
     ↓
GSAP when justified
     ↓
Spline for selected 3D scenes
```

---

## 25. Motion.dev

Motion is the preferred general-purpose animation layer for React interface interactions.

Good use cases:

- Page transitions
- Modal entry/exit
- Cards
- Layout transitions
- Hover/focus states
- Shared layout movement
- Small feedback animations

Do not animate every component independently.

---

## 26. GSAP

GSAP should be reserved for animation sequences that are genuinely more complex than normal UI motion.

Good candidates:

- Landing-page hero sequences
- Complex timelines
- Scroll-driven sequences
- Coordinated multi-element animation

Do not use GSAP for simple button hover effects.

---

## 27. Spline

Spline may be used selectively for premium visual moments such as:

- Landing-page hero
- Product introduction
- Empty-state illustration
- Future immersive experience

3D content must not block core application functionality or significantly degrade performance.

---

## 28. shadcn/ui

shadcn/ui should provide the foundational component primitives.

Likely components:

- Button
- Input
- Select
- Dialog
- Sheet
- Dropdown
- Tooltip
- Tabs
- Card
- Table
- Command
- Toast/Sonner
- Form

Components should be customized to match Elvyn rather than left as an unmodified template.

---

## 29. Aceternity UI

Aceternity components may be selectively used for visually distinctive sections.

Examples:

- Hero effects
- Background effects
- Spotlight effects
- Card effects
- Landing-page interactions

They should not replace the core design system.

---

## 30. Bklit

Bklit can be used as a source of inspiration or reusable visual techniques for premium frontend presentation where licensing and implementation suitability are confirmed.

Avoid copying a site's complete visual identity.

---

## 31. AnimMaster

AnimMaster can be considered for specialized animation patterns where its implementation fits the Elvyn stack.

The preferred approach remains to minimize dependencies and reuse existing animation primitives when possible.

---

## 32. PatternPad

PatternPad-style generated patterns may be used for:

- Background texture
- Section separators
- Decorative landing-page areas

Patterns should remain subtle and must not interfere with readability.

---

## 33. ShapeDividers

Shape dividers may be used on marketing/landing sections to create visual transitions.

They should generally not be used throughout the authenticated application.

---

## 34. Uiverse

Uiverse may provide inspiration or selected UI patterns.

Any component adopted into Elvyn must be:

- Accessible
- Consistent with the design system
- Maintained in the repository
- Free of unnecessary dependencies

Do not build the application by assembling unrelated copied snippets.

---

## 35. Responsive Design

Design breakpoints should be based on content needs rather than device names alone.

Core workflows must remain usable at:

```text
Mobile
Tablet
Desktop
Large Desktop
```

Do not simply shrink desktop interfaces onto mobile screens.

---

## 36. Accessibility

Every major workflow should support:

- Keyboard navigation
- Visible focus states
- Semantic HTML
- Accessible labels
- Appropriate ARIA only where necessary
- Sufficient contrast
- Reduced-motion preference
- Screen-reader-friendly controls

Interactive elements must have clear accessible names.

---

## 37. Reduced Motion

Elvyn must respect the user's reduced-motion preference.

When reduced motion is enabled:

- Disable unnecessary decorative animation.
- Reduce transition distances.
- Avoid rapidly moving effects.
- Preserve functional state feedback.

---

## 38. Forms & Validation UX

Forms should:

1. Explain what is required.
2. Validate meaningful errors.
3. Preserve valid user input after recoverable errors.
4. Show submission state.
5. Clearly confirm success.

Validation messages should appear near the relevant field where practical.

---

## 39. Destructive Actions

Destructive actions should be visually distinct but not alarming unnecessarily.

Examples:

```text
Delete Task
Delete Project
Remove Resource
```

Confirmation should be used when the action cannot be easily undone.

Where possible, prefer reversible archive behavior.

---

## 40. Mobile UX

Mobile navigation should prioritize the most common actions.

Potential pattern:

```text
┌───────────────────────┐
│ Header                │
├───────────────────────┤
│                       │
│ Main Content          │
│                       │
├───────────────────────┤
│ Navigation / Actions  │
└───────────────────────┘
```

Focus mode may intentionally use a distraction-free full-screen layout.

---

## 41. Performance UX

Visual quality must not come at the expense of usability.

Avoid:

- Huge unoptimized images
- Excessive JavaScript animation
- Heavy 3D assets on mobile
- Rendering unnecessary lists
- Loading every page dependency globally

Prefer progressive loading and lightweight defaults.

---

## 42. Landing Page vs App UI

Elvyn has two visual contexts.

### Marketing / Landing

Can be more expressive:

- Hero animation
- Gradients
- Spline
- Aceternity effects
- Pattern backgrounds
- Shape dividers

### Authenticated Workspace

Should be calmer:

- Clear hierarchy
- Minimal distractions
- Fast interactions
- Subtle animation
- Information density where useful

Do not turn the dashboard into a landing page.

---

## 43. AI Coming Soon UX

AI features should have a visible but honest placeholder where appropriate.

Example:

```text
Elvyn Intelligence

AI-powered planning, search and assistance
are coming soon.

[ Coming Soon ]
```

Do not simulate AI responses or imply functionality that is not implemented.

---

## 44. Design Quality Checklist

Before a UI feature is considered complete:

- [ ] Clear hierarchy
- [ ] Responsive layout
- [ ] Loading state
- [ ] Empty state
- [ ] Error state
- [ ] Success feedback
- [ ] Keyboard accessibility
- [ ] Focus states
- [ ] Reduced-motion support
- [ ] Appropriate animation
- [ ] Mobile usability
- [ ] No unnecessary visual noise
- [ ] No unnecessary dependency

---

## 45. UI Rule

The goal is not to make every screen visually spectacular.

The goal is to make Elvyn feel **coherent, intentional, fast, and pleasant to use**.

Premium effects should be concentrated where they create the most value.

---

**Document Status:** Foundation Draft  
**Next Document:** `docs/development/DEVELOPMENT_PLAN.md`
