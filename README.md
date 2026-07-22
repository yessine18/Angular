# Lab

Lab is an Angular web application for managing a research laboratory’s core entities: members, publications, events, and tools.
It provides authenticated access, CRUD workflows, and a dashboard with visual statistics.

## Purpose

The app centralizes lab operations in one interface:
- Manage member records (students/teachers)
- Track publications
- Track events
- Track tools/resources
- Visualize key counts and distributions on a dashboard

## Main Features

- **Authentication**
  - Email/password login using Firebase Authentication
  - Logout from the main shell

- **Member Management**
  - List, filter, and paginate members
  - Add/edit members via modal form
  - Delete with confirmation dialog

- **Publication Management**
  - CRUD publications (type, title, links, publication date, PDF source)

- **Event Management**
  - CRUD events (title, location, date)

- **Tool Management**
  - CRUD tools (source link, date)

- **Dashboard**
  - KPI cards (members, events, tools, articles)
  - Charts for totals and member distribution

## Application Structure

- **Angular SPA** with feature components and route-based navigation
- **Shared shell layout** (`TemplateComponent`) with sidenav + topbar
- **Service layer** for backend HTTP calls
- **Modal-based forms** for create/edit flows
- **Component-local state** (no NgRx/store)

## Routing

Primary routes:
- `/login`
- `/dashboard`
- `/member`
- `/tools`
- `/publications`
- `/events`

Default and unknown routes redirect to `/login`.

## Data Model (Core Entities)

- **Member**: id, cin, name, type, cv, createdDate
- **Publication**: id, type, titre, lien, dateApparition, sourcePdf
- **Evt**: id, titre, lieu, dateApparition
- **Outil**: id, source, dateApparition

## Backend & Integrations

- **Firebase**
  - Authentication via AngularFire
  - Hosting config present for deployment

- **REST API**
  - Calls are proxied in development through `/api` to `http://localhost:9000`
  - Service endpoints indicate domain services for members, publications, events, tools

## Tech Stack & Why It’s Used

- **Angular 16**: framework for SPA architecture
- **Angular Router**: page navigation
- **HttpClient**: REST communication
- **Reactive Forms + Template Forms**: form handling in dialogs/login
- **Angular Material + CDK**: UI components (table, dialog, toolbar, sidenav, datepicker, etc.)
- **Angular Flex Layout**: responsive layout directives
- **RxJS**: async streams (`Observable`, `forkJoin`, `map`, `finalize`)
- **Chart.js + ng2-charts**: dashboard chart rendering
- **AngularFire + Firebase SDK**: auth and hosting integration
- **Karma/Jasmine**: unit test runner/framework
- **json-server (dev dependency)**: local mock API support

## Setup

### Prerequisites
- Node.js + npm
- Angular CLI (optional globally; available via npm scripts)
- Backend services running on `http://localhost:9000` (or adjust proxy/env)

### Install
```bash
npm install
```

### Run (development)
```bash
npm start
```
This starts Angular dev server with proxy config.

### Build
```bash
npm run build
```

### Test
```bash
npm test
```

## Development Workflow

1. Start backend services (or mock API strategy)
2. Run `npm start`
3. Implement/update feature components and corresponding services
4. Use modal forms for CRUD interactions
5. Validate with `npm test`
6. Build with `npm run build`
7. Deploy build output (`dist/lab`) via Firebase hosting flow if needed

## Notes / Current Repository State

- Existing README was Angular CLI boilerplate and has been replaced by this product-focused version.
- Some files appear legacy/unused (for example, `ArticlesComponent`, `ModalEventComponent`, duplicate stub `src/app/member.service.ts`) and may be cleaned in a later refactor.
