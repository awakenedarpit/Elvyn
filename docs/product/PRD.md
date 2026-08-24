# Elvyn — Product Requirements Document

**Product Name:** Elvyn  
**Project Status:** Pre-Development  
**Document Version:** 1.0  
**Document Status:** Foundation Draft  
**Primary Platform:** Web  
**Target Audience:** Students  
**AI Status:** Coming Soon / Deferred  

---

## 1. Product Overview

Elvyn is a student-focused digital workspace designed to bring the different parts of a student's academic and personal productivity workflow into one connected environment.

Instead of forcing students to use disconnected applications for tasks, projects, goals, notes, study planning, resources, reminders, and productivity tracking, Elvyn aims to provide a unified workspace where these elements can work together.

Elvyn is designed around the idea that productivity should not simply mean maintaining a collection of separate lists. The system should help students understand what they need to do, what they are currently working on, what they are trying to achieve, what they have learned, what resources they have collected, what deserves their attention next, and how their work connects together.

AI functionality is intentionally deferred. The initial Elvyn experience must provide meaningful value without requiring artificial intelligence.

## 2. Vision

> Build a connected student workspace that turns scattered academic responsibilities into a clear, organized flow of work.

Elvyn should eventually become more than a task manager. It should function as a student's personal operating environment for planning, learning, creating, organizing, tracking, and reflecting.

## 3. Problem

Students commonly use multiple disconnected tools for tasks, notes, projects, calendars, resources, files, and goals. This creates fragmentation, repeated data entry, lost context, disconnected deadlines and goals, poorly organized resources, unclear progress, and unnecessary application switching.

Elvyn aims to reduce this fragmentation.

## 4. Target Users

The primary users are students who manage multiple academic, technical, creative, or personal responsibilities, including school and university students, coding students, competitive-exam students, student developers, hackathon participants, and students managing multiple projects.

## 5. Core Product Philosophy

Elvyn is:

- **Connected:** Information can relate to other information.
- **Focused:** The product helps users identify what matters.
- **Simple:** Complex functionality remains understandable.
- **Personal:** The default experience is a personal workspace.
- **Extensible:** The architecture supports future functionality.
- **AI-independent:** Core value does not depend on AI.

## 6. Product Scope

The initial product focuses on a connected productivity and student workspace covering:

- Dashboard
- Tasks
- Projects
- Goals
- Planner
- Notes
- Resources
- Bookmarks
- Study
- Focus
- Search
- Notifications
- Profile and settings

## 7. Core Features

### Dashboard

Provides an overview of today's tasks, upcoming deadlines, active projects, goal progress, recent activity, study activity, reminders, and quick actions. It summarizes existing data rather than becoming a separate data store.

### Task Management

Users can create, edit, complete, reopen, delete or archive tasks, set priorities and due dates, add descriptions and tags, associate tasks with projects or goals, and add reminders.

Initial statuses may include Todo, In Progress, Completed, and Archived. The final model is defined in the requirements and database documents.

### Project Management

Users can create and manage projects containing tasks, goals, notes, resources, files, milestones, and activity. Projects may represent assignments, coding projects, hackathons, personal projects, research, events, or long-term initiatives.

### Goal Management

Users can create goals, define descriptions, set target dates, track progress, associate work with goals, and mark goals active or completed.

### Notes

Users can create and organize notes associated with projects, subjects, topics, tasks, resources, or goals. Notes remain useful without AI.

### Resources and Bookmarks

Users can store websites, articles, documentation, videos, PDFs, references, learning materials, and bookmarks with useful metadata, categories, and tags.

### Planner

Provides a time-oriented view of existing tasks, deadlines, goals, projects, reminders, and study sessions without unnecessarily duplicating data.

### Study Workspace

Provides dedicated study functionality such as subjects, topics, study sessions, revision tracking, study goals, study resources, and progress while remaining integrated with the rest of Elvyn.

### Focus Mode

Allows users to start, pause, and end focus sessions, track duration, associate sessions with tasks, projects, or study topics, and review focus history.

### Search

Allows users to find tasks, projects, goals, notes, resources, bookmarks, and study content. V1 uses standard database/search capabilities. Semantic AI search is deferred.

### Notifications

Supports useful reminders, upcoming deadlines, important system events, and future collaboration events without excessive notification noise.

### Activity

May provide a timeline of meaningful actions such as completing tasks, creating projects, updating goals, adding notes, and finishing focus sessions.

### Command Center

Provides fast actions such as search, creating tasks, notes, projects, goals, navigation, and recent items. A Cmd/Ctrl + K interaction may be used.

### Authentication

Elvyn requires authenticated accounts for private workspace functionality. Authentication includes account creation, login, logout, password recovery, session persistence, and protected routes using Supabase Auth.

### User Profile

Basic profile information may include display name, avatar, preferences, theme, and onboarding state. Authentication credentials remain managed by Supabase Auth.

### File Attachments

Where appropriate, users may attach files to projects, notes, resources, and tasks using Supabase Storage.

### Personalization

Basic personalization includes theme, display preferences, and workspace preferences.

## 8. Future Features

### AI — Coming Soon

Potential future capabilities include intelligent search, study assistance, task suggestions, planning assistance, summaries, context-aware recommendations, and workspace intelligence.

AI is explicitly deferred from the initial MVP.

### Flow Map — Future

A visual representation of relationships between goals, projects, tasks, notes, and resources.

### Collaboration — Future

Shared projects, team workspaces, members, permissions, collaborative tasks, and shared resources.

### Advanced Analytics — Future

Productivity trends, study trends, time analysis, goal performance, and project analytics.

## 9. Explicitly Out of Scope for MVP

The initial MVP will not include:

- AI assistant or chatbot
- AI-generated study material
- AI semantic search
- AI agents
- Vector database
- Complex collaboration
- Social network functionality
- Marketplace
- Heavy gamification
- Cryptocurrency/Web3 functionality
- Complex enterprise permissions
- Excessive third-party integrations

These may be reconsidered in later phases.

## 10. Design Direction

Elvyn should feel modern, clean, premium, focused, intelligent, calm, responsive, and interactive. The core workspace prioritizes productivity while the landing page and selected experiences may be more expressive.

Detailed visual rules are defined in `docs/design/DESIGN.md`.

## 11. Motion Philosophy

Motion should communicate interaction, state changes, hierarchy, continuity, and feedback. Animation should not exist merely for decoration. All motion must respect accessibility, reduced-motion preferences, and performance.

## 12. Performance Philosophy

Elvyn should remain responsive as features increase. Priorities include fast navigation, efficient database queries, minimal unnecessary client-side JavaScript, optimized assets, responsive UI, appropriate loading states, and pagination for large datasets.

## 13. Security Philosophy

Security is a fundamental product requirement. Elvyn must protect authenticated routes, enforce database authorization, use Row Level Security, protect user files, never expose secrets, validate input, and prevent unauthorized cross-user access. Frontend checks alone are never sufficient for authorization.

## 14. Platform Strategy

Initial platform: web application. The architecture should remain adaptable to future mobile experiences, but native mobile applications are not part of the MVP.

## 15. Technology Direction

Planned stack:

- Next.js
- TypeScript
- Tailwind CSS
- shadcn/ui
- Supabase
- PostgreSQL
- Supabase Auth
- Supabase Storage
- Motion and selected animation tooling
- GSAP where justified
- Spline where justified

Final technical constraints are defined in `docs/architecture/ARCHITECTURE.md`.

## 16. Cost Philosophy

Elvyn should initially follow a $0 development and MVP infrastructure strategy wherever practical. Paid services should not be introduced without a clear reason, and unnecessary infrastructure should be avoided.

## 17. Independence From QuantumFlow

Elvyn is a new independent project with a new GitHub repository, new Supabase project, and new application codebase. The previous QuantumFlow repository and backend should remain untouched. Elvyn must not depend on QuantumFlow code.

## 18. Success Criteria

The MVP should successfully allow a student to:

1. Create an account.
2. Access a personal workspace.
3. Create and manage tasks.
4. Organize work into projects.
5. Define and track goals.
6. Create and organize notes.
7. Save resources and bookmarks.
8. Plan upcoming work.
9. Track study and focus activity.
10. Search their workspace.
11. Receive useful reminders or notifications where implemented.
12. Manage profile and preferences.
13. Safely access only their own data.

## 19. MVP Definition

The MVP is complete when authentication, protected routes, the database schema, RLS policies, the core workspace, core productivity features, data relationships, search, responsive design, loading/error/empty states, testing, and deployment are working without critical security issues.

AI is not required for MVP completion.

## 20. Product Principle

Elvyn should not attempt to solve every student problem immediately. The first objective is:

> **Build a reliable, connected student workspace.**

Advanced intelligence can be layered on top later.

## 21. Final Product Definition

> **Elvyn is a connected student workspace that brings planning, tasks, projects, goals, notes, resources, study, and productivity into one organized environment — with AI reserved for a future phase.**

---

**Document Version:** 1.0  
**Status:** Foundation Draft  
**Next Document:** `docs/product/REQUIREMENTS.md`
