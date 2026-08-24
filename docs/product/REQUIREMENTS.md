# Elvyn — Product Requirements

**Document Version:** 1.0  
**Status:** Foundation Draft  
**Parent Document:** `docs/product/PRD.md`  
**Next:** `docs/architecture/ARCHITECTURE.md`

---

## 1. Purpose

This document converts the Elvyn PRD into explicit, testable product requirements. Requirements are identified with stable IDs so they can later be mapped to architecture, implementation phases, database design, and testing.

---

# 2. Requirement Priority

- **P0 — Must:** Required for MVP.
- **P1 — Should:** Important for a complete first release but can follow the core MVP foundation.
- **P2 — Future:** Intentionally deferred.

---

# 3. Authentication & Account Requirements

### REQ-AUTH-001 — Account Registration
**Priority:** P0  
Users must be able to create an Elvyn account using supported Supabase Auth methods.

### REQ-AUTH-002 — Login
**Priority:** P0  
Registered users must be able to securely sign in.

### REQ-AUTH-003 — Logout
**Priority:** P0  
Authenticated users must be able to sign out and invalidate their active application session.

### REQ-AUTH-004 — Session Persistence
**Priority:** P0  
Authenticated sessions must persist across normal page refreshes according to Supabase Auth behavior.

### REQ-AUTH-005 — Password Recovery
**Priority:** P0  
Users must be able to initiate password recovery through the supported authentication flow.

### REQ-AUTH-006 — Protected Routes
**Priority:** P0  
Private workspace routes must require authentication.

### REQ-AUTH-007 — User Isolation
**Priority:** P0  
A user must never be able to access another user's private workspace data.

### REQ-AUTH-008 — Authorization at Database Level
**Priority:** P0  
Authorization must be enforced with Supabase Row Level Security rather than relying only on frontend checks.

---

# 4. User Profile Requirements

### REQ-PROFILE-001 — Basic Profile
**Priority:** P0  
Users must have a profile associated with their authenticated account.

### REQ-PROFILE-002 — Display Name
**Priority:** P0  
Users must be able to set and update a display name.

### REQ-PROFILE-003 — Avatar
**Priority:** P1  
Users should be able to configure a profile avatar where supported.

### REQ-PROFILE-004 — Preferences
**Priority:** P1  
Users should be able to manage supported workspace preferences.

### REQ-PROFILE-005 — Theme Preference
**Priority:** P1  
Users should be able to select or persist a supported appearance preference.

---

# 5. Application Shell Requirements

### REQ-SHELL-001 — Authenticated Application Shell
**Priority:** P0  
Authenticated users must receive a consistent application shell containing primary navigation and workspace content.

### REQ-SHELL-002 — Responsive Layout
**Priority:** P0  
The application shell must adapt to supported desktop, tablet, and mobile viewport sizes.

### REQ-SHELL-003 — Navigation
**Priority:** P0  
Users must be able to navigate between all implemented primary workspace areas without losing valid application state.

### REQ-SHELL-004 — Loading States
**Priority:** P0  
Routes and data-dependent views must provide appropriate loading feedback.

### REQ-SHELL-005 — Error States
**Priority:** P0  
Recoverable application and data errors must provide understandable feedback and a recovery path where possible.

### REQ-SHELL-006 — Empty States
**Priority:** P0  
New or empty workspace areas must provide useful empty states and clear next actions.

---

# 6. Dashboard Requirements

### REQ-DASH-001 — Dashboard Overview
**Priority:** P0  
Authenticated users must have a dashboard summarizing relevant workspace information.

### REQ-DASH-002 — Today's Work
**Priority:** P0  
The dashboard must be able to surface relevant tasks for the current day.

### REQ-DASH-003 — Upcoming Work
**Priority:** P0  
The dashboard must surface relevant upcoming deadlines or scheduled work.

### REQ-DASH-004 — Active Projects
**Priority:** P1  
The dashboard should surface active projects.

### REQ-DASH-005 — Goal Progress
**Priority:** P1  
The dashboard should surface relevant goal progress.

### REQ-DASH-006 — Recent Activity
**Priority:** P1  
The dashboard should surface meaningful recent workspace activity.

### REQ-DASH-007 — Quick Actions
**Priority:** P1  
The dashboard should provide fast access to common creation actions.

### REQ-DASH-008 — No Duplicate Source of Truth
**Priority:** P0  
Dashboard information must be derived from authoritative workspace data rather than stored as duplicated independent records unless explicitly required by architecture.

---

# 7. Task Requirements

### REQ-TASK-001 — Create Task
**Priority:** P0  
Users must be able to create a task.

### REQ-TASK-002 — Edit Task
**Priority:** P0  
Users must be able to edit task information.

### REQ-TASK-003 — Complete Task
**Priority:** P0  
Users must be able to mark a task as completed.

### REQ-TASK-004 — Reopen Task
**Priority:** P0  
Users must be able to reopen an eligible completed task.

### REQ-TASK-005 — Delete or Archive Task
**Priority:** P0  
Users must be able to remove or archive a task according to the final data model.

### REQ-TASK-006 — Task Title
**Priority:** P0  
Every active task must have a meaningful title.

### REQ-TASK-007 — Task Description
**Priority:** P1  
Users should be able to add optional task descriptions.

### REQ-TASK-008 — Task Priority
**Priority:** P0  
Users must be able to assign a supported priority to a task.

### REQ-TASK-009 — Task Due Date
**Priority:** P0  
Users must be able to assign an optional due date to a task.

### REQ-TASK-010 — Task Status
**Priority:** P0  
Tasks must maintain a supported status such as Todo, In Progress, Completed, or Archived.

### REQ-TASK-011 — Task Tags
**Priority:** P1  
Users should be able to categorize tasks with tags.

### REQ-TASK-012 — Project Association
**Priority:** P0  
A task may be associated with a project.

### REQ-TASK-013 — Goal Association
**Priority:** P1  
A task may be associated with a goal where the relationship is appropriate.

### REQ-TASK-014 — Task Reminders
**Priority:** P1  
Tasks should support reminders where the notification architecture provides the required capability.

### REQ-TASK-015 — User Ownership
**Priority:** P0  
Tasks must belong to an authorized user or authorized workspace and must be protected by RLS.

---

# 8. Project Requirements

### REQ-PROJECT-001 — Create Project
**Priority:** P0  
Users must be able to create projects.

### REQ-PROJECT-002 — Edit Project
**Priority:** P0  
Users must be able to edit project information.

### REQ-PROJECT-003 — Archive Project
**Priority:** P0  
Users must be able to archive or otherwise deactivate projects according to the final model.

### REQ-PROJECT-004 — Project Details
**Priority:** P0  
A project must support a name and may support a description, status, dates, and other defined metadata.

### REQ-PROJECT-005 — Project Tasks
**Priority:** P0  
Projects must be able to contain or reference associated tasks.

### REQ-PROJECT-006 — Project Notes
**Priority:** P1  
Projects should support associated notes.

### REQ-PROJECT-007 — Project Resources
**Priority:** P1  
Projects should support associated resources or bookmarks.

### REQ-PROJECT-008 — Project Goals
**Priority:** P1  
Projects should be able to relate to relevant goals.

### REQ-PROJECT-009 — Project Activity
**Priority:** P1  
Meaningful project activity may be displayed where activity tracking is implemented.

---

# 9. Goal Requirements

### REQ-GOAL-001 — Create Goal
**Priority:** P0  
Users must be able to create goals.

### REQ-GOAL-002 — Edit Goal
**Priority:** P0  
Users must be able to edit goals.

### REQ-GOAL-003 — Goal Target
**Priority:** P0  
Goals must support a clear target or desired outcome.

### REQ-GOAL-004 — Goal Deadline
**Priority:** P1  
Goals should support an optional target date.

### REQ-GOAL-005 — Goal Progress
**Priority:** P0  
Users must be able to view and update meaningful goal progress.

### REQ-GOAL-006 — Goal Status
**Priority:** P0  
Goals must support an appropriate lifecycle such as Active, Completed, or Archived.

### REQ-GOAL-007 — Work Association
**Priority:** P1  
Goals should be connectable to relevant projects or tasks.

---

# 10. Notes Requirements

### REQ-NOTE-001 — Create Note
**Priority:** P0  
Users must be able to create notes.

### REQ-NOTE-002 — Edit Note
**Priority:** P0  
Users must be able to edit notes.

### REQ-NOTE-003 — Delete or Archive Note
**Priority:** P0  
Users must be able to delete or archive notes according to the final model.

### REQ-NOTE-004 — Note Organization
**Priority:** P1  
Notes should support tags, categories, or relationships to relevant workspace entities.

### REQ-NOTE-005 — Note Relationships
**Priority:** P1  
Notes should be associable with projects, tasks, goals, resources, subjects, or topics where appropriate.

---

# 11. Resource & Bookmark Requirements

### REQ-RESOURCE-001 — Create Resource
**Priority:** P0  
Users must be able to save a resource.

### REQ-RESOURCE-002 — URL Storage
**Priority:** P0  
Web resources must store a valid URL.

### REQ-RESOURCE-003 — Resource Metadata
**Priority:** P1  
Resources should support title, description, category, tags, and related context where appropriate.

### REQ-RESOURCE-004 — Bookmarking
**Priority:** P0  
Users must be able to save useful links for later retrieval.

### REQ-RESOURCE-005 — Resource Ownership
**Priority:** P0  
Private resources must be protected by user/workspace authorization.

---

# 12. Planner Requirements

### REQ-PLAN-001 — Time-Oriented View
**Priority:** P0  
Users must have a planner view capable of presenting time-relevant workspace information.

### REQ-PLAN-002 — Task Deadlines
**Priority:** P0  
Planner views must be able to surface task due dates.

### REQ-PLAN-003 — Scheduled Study Activity
**Priority:** P1  
Planner views should be able to surface scheduled study activity when implemented.

### REQ-PLAN-004 — Existing Data Source
**Priority:** P0  
Planner information should use authoritative entities rather than unnecessarily duplicating them.

---

# 13. Study Requirements

### REQ-STUDY-001 — Subjects
**Priority:** P1  
Users should be able to organize study work by subjects or equivalent categories.

### REQ-STUDY-002 — Topics
**Priority:** P1  
Users should be able to organize study work by topics.

### REQ-STUDY-003 — Study Sessions
**Priority:** P0  
Users must be able to record study sessions once the study module is enabled in the MVP phase.

### REQ-STUDY-004 — Study Duration
**Priority:** P0  
Study sessions must record meaningful duration information.

### REQ-STUDY-005 — Study Association
**Priority:** P1  
Study sessions should be associable with subjects, topics, goals, or projects where appropriate.

### REQ-STUDY-006 — Study Progress
**Priority:** P1  
Users should be able to view meaningful study progress.

---

# 14. Focus Requirements

### REQ-FOCUS-001 — Start Focus Session
**Priority:** P0  
Users must be able to start a focus session.

### REQ-FOCUS-002 — Pause Focus Session
**Priority:** P1  
Users should be able to pause an active focus session.

### REQ-FOCUS-003 — End Focus Session
**Priority:** P0  
Users must be able to end a focus session.

### REQ-FOCUS-004 — Duration Tracking
**Priority:** P0  
Elvyn must track focus session duration accurately enough for user-facing summaries.

### REQ-FOCUS-005 — Context Association
**Priority:** P1  
Focus sessions should be associable with tasks, projects, goals, or study topics.

---

# 15. Search Requirements

### REQ-SEARCH-001 — Workspace Search
**Priority:** P0  
Authenticated users must be able to search supported workspace content.

### REQ-SEARCH-002 — Search Scope
**Priority:** P0  
Search must support the implemented tasks, projects, goals, notes, resources, bookmarks, and study content that are included in the searchable scope.

### REQ-SEARCH-003 — User Isolation
**Priority:** P0  
Search results must never expose another user's private data.

### REQ-SEARCH-004 — Useful Empty Results
**Priority:** P0  
Search must provide a clear empty-result state.

### REQ-SEARCH-005 — AI Search Deferred
**Priority:** P0  
V1 search must not require AI, embeddings, or a vector database.

---

# 16. Notification Requirements

### REQ-NOTIFY-001 — Notification Model
**Priority:** P1  
The system should support a notification model for relevant user-facing events.

### REQ-NOTIFY-002 — Reminder Events
**Priority:** P1  
Supported reminder events should be able to produce notifications.

### REQ-NOTIFY-003 — Notification Read State
**Priority:** P1  
Users should be able to distinguish read and unread notifications.

### REQ-NOTIFY-004 — No Excessive Notifications
**Priority:** P1  
Notification behavior must avoid unnecessary or repetitive notifications.

---

# 17. Activity Requirements

### REQ-ACTIVITY-001 — Meaningful Events
**Priority:** P1  
Elvyn may record meaningful workspace events for activity views.

### REQ-ACTIVITY-002 — Activity Privacy
**Priority:** P0  
Private activity data must obey the same authorization boundaries as the underlying workspace data.

### REQ-ACTIVITY-003 — No Sensitive Payloads
**Priority:** P0  
Activity records should not unnecessarily duplicate sensitive user content.

---

# 18. Command Center Requirements

### REQ-CMD-001 — Quick Search
**Priority:** P1  
Users should be able to initiate search from the command center.

### REQ-CMD-002 — Quick Creation
**Priority:** P1  
Users should be able to quickly create supported workspace entities.

### REQ-CMD-003 — Navigation
**Priority:** P1  
Users should be able to navigate to supported workspace areas through the command center.

### REQ-CMD-004 — Keyboard Access
**Priority:** P1  
A keyboard shortcut such as Cmd/Ctrl + K may open the command center.

---

# 19. File & Storage Requirements

### REQ-FILE-001 — File Upload
**Priority:** P1  
Users should be able to upload supported file types where attachments are enabled.

### REQ-FILE-002 — File Ownership
**Priority:** P0  
Private files must be protected from unauthorized access.

### REQ-FILE-003 — Storage Authorization
**Priority:** P0  
Supabase Storage policies must enforce appropriate access control.

### REQ-FILE-004 — File Metadata
**Priority:** P1  
Stored files should maintain sufficient metadata to identify their owner and related entity.

---

# 20. UI/UX Requirements

### REQ-UX-001 — Consistent Design System
**Priority:** P0  
All application interfaces must follow the Elvyn design system.

### REQ-UX-002 — Responsive Experience
**Priority:** P0  
Core workflows must remain usable across supported screen sizes.

### REQ-UX-003 — Accessibility
**Priority:** P0  
Core workflows must meet practical accessibility requirements including keyboard access, semantic structure, readable contrast, labels, and appropriate focus states.

### REQ-UX-004 — Reduced Motion
**Priority:** P0  
Users who prefer reduced motion must not be forced to experience unnecessary animation.

### REQ-UX-005 — Feedback
**Priority:** P0  
Important user actions must provide appropriate success, error, or progress feedback.

### REQ-UX-006 — Destructive Actions
**Priority:** P0  
Destructive or irreversible actions must provide appropriate confirmation or recovery mechanisms.

### REQ-UX-007 — No Decorative Overload
**Priority:** P0  
Visual effects must not reduce clarity, usability, or performance.

---

# 21. Performance Requirements

### REQ-PERF-001 — Responsive Interaction
**Priority:** P0  
Common interactions should feel responsive and should not perform unnecessary blocking work.

### REQ-PERF-002 — Efficient Queries
**Priority:** P0  
Database queries must retrieve only the data required by the relevant view or operation.

### REQ-PERF-003 — Large Data Handling
**Priority:** P1  
Large collections must use appropriate pagination, filtering, or incremental loading.

### REQ-PERF-004 — Asset Optimization
**Priority:** P1  
Images, fonts, and other assets should be appropriately optimized.

### REQ-PERF-005 — Animation Performance
**Priority:** P0  
Animations must avoid unnecessary main-thread work and must not significantly degrade core application performance.

---

# 22. Security Requirements

### REQ-SEC-001 — Secret Protection
**Priority:** P0  
Private keys and secrets must never be committed to the repository or exposed to the client.

### REQ-SEC-002 — Environment Variables
**Priority:** P0  
Environment-specific secrets must be supplied through environment configuration.

### REQ-SEC-003 — RLS
**Priority:** P0  
All user-private database tables must have appropriate Row Level Security policies before production use.

### REQ-SEC-004 — Input Validation
**Priority:** P0  
User-controlled input must be validated at appropriate application and database boundaries.

### REQ-SEC-005 — Authorization
**Priority:** P0  
Authorization must be enforced server-side and/or at the database/storage layer as appropriate.

### REQ-SEC-006 — Cross-User Protection
**Priority:** P0  
A user must not be able to access, modify, or delete another user's private data by manipulating client requests.

---

# 23. Data Integrity Requirements

### REQ-DATA-001 — Referential Integrity
**Priority:** P0  
Relationships between entities must use appropriate database constraints.

### REQ-DATA-002 — Ownership Consistency
**Priority:** P0  
Related entities must not create authorization paths that allow cross-user data access.

### REQ-DATA-003 — Timestamps
**Priority:** P0  
Relevant entities must maintain creation and update timestamps.

### REQ-DATA-004 — Safe Deletion
**Priority:** P0  
Deletion behavior must be explicitly defined for related records before implementation.

### REQ-DATA-005 — Migration-Based Changes
**Priority:** P0  
Database schema changes must be represented through migrations rather than undocumented manual production changes.

---

# 24. AI Requirements

### REQ-AI-001 — AI Deferred
**Priority:** P0  
AI functionality is explicitly deferred from the initial MVP.

### REQ-AI-002 — No AI Dependency
**Priority:** P0  
Core Elvyn workflows must function without AI services.

### REQ-AI-003 — No AI Infrastructure in MVP
**Priority:** P0  
The MVP must not require vector databases, embeddings, model APIs, AI agents, or AI-specific infrastructure.

### REQ-AI-004 — Future Compatibility
**Priority:** P1  
The architecture should avoid decisions that unnecessarily prevent future AI capabilities.

---

# 25. Cost Requirements

### REQ-COST-001 — $0 MVP Target
**Priority:** P0  
The MVP should be buildable and deployable using free-tier services wherever practical.

### REQ-COST-002 — No Unnecessary Paid Dependency
**Priority:** P0  
A paid service must not be introduced without a clear product or technical justification.

---

# 26. Deployment Requirements

### REQ-DEPLOY-001 — Production Build
**Priority:** P0  
The application must produce a successful production build before MVP release.

### REQ-DEPLOY-002 — Environment Separation
**Priority:** P0  
Development and production environment configuration must be separated appropriately.

### REQ-DEPLOY-003 — Deployment Configuration
**Priority:** P0  
Deployment configuration must be documented and reproducible.

---

# 27. Testing Requirements

### REQ-TEST-001 — Core Flow Testing
**Priority:** P0  
All MVP-critical workflows must have defined test cases.

### REQ-TEST-002 — Authentication Testing
**Priority:** P0  
Authentication and protected-route behavior must be tested.

### REQ-TEST-003 — Authorization Testing
**Priority:** P0  
Cross-user authorization boundaries must be tested.

### REQ-TEST-004 — Responsive Testing
**Priority:** P0  
Core workflows must be tested at supported viewport sizes.

### REQ-TEST-005 — Regression Testing
**Priority:** P1  
Previously completed core workflows should be checked after significant changes.

---

# 28. Future Requirements

The following are intentionally not MVP requirements but may become requirements in later phases:

- AI assistant
- AI-powered search
- AI study assistance
- AI planning
- Flow Map
- Collaboration
- Shared workspaces
- Advanced analytics
- Additional integrations
- Native mobile applications

Future functionality must not be implemented merely because it appears in this section.

---

# 29. Requirement Traceability

Each future implementation phase should reference the requirement IDs it satisfies.

Example:

```text
Phase 2 — Authentication
REQ-AUTH-001
REQ-AUTH-002
REQ-AUTH-003
REQ-AUTH-004
REQ-AUTH-005
REQ-AUTH-006
REQ-AUTH-007
REQ-AUTH-008
```

Tests should reference the same IDs where practical.

This creates the following chain:

```text
PRD
  ↓
Requirement ID
  ↓
Architecture
  ↓
Implementation Phase
  ↓
Code
  ↓
Test
```

---

# 30. MVP Requirement Rule

A feature is not considered complete merely because a UI screen exists.

A requirement is complete only when the relevant:

- UI
- Application logic
- Data behavior
- Authorization
- Error handling
- Loading/empty states
- Responsive behavior
- Testing

have been addressed according to its scope.

---

**Document Status:** Foundation Draft  
**Next Document:** `docs/architecture/ARCHITECTURE.md`
