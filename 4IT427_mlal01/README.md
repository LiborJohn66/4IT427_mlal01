# EventMaster

EventMaster is a React and TypeScript application for planning events and tracking event tasks. It helps organize events, responsibilities, priorities, deadlines, and task progress in one small dashboard-style app.

## Features

- Dashboard with task statistics
- Event list and event detail page
- Task list in event detail
- Task detail page with linked event and responsible person
- Team page with responsible people and task counts
- Global task page with status filtering
- Status and priority badges
- Loading and error states
- Mock API data in `public/db.json`
- Unit test for task completion percentage
- Integration test for task filtering

## Pages

- `/` - Dashboard
- `/events` - Event list
- `/events/:id` - Event detail
- `/tasks` - All tasks
- `/tasks/:id` - Task detail
- `/team` - Team and responsible people
- `/about` - Project information

## Data Model

Mock data is stored in `public/db.json` and contains:

- `events`
- `tasks`
- `users`
- `categories`

Main task fields:

```ts
type Task = {
  id: string
  eventId: string
  title: string
  category: string
  assigneeId: string
  status: 'todo' | 'in-progress' | 'done'
  priority: 'low' | 'medium' | 'high'
  deadline: string
}
```

## Scripts

Install dependencies:

```bash
npm install
```

Start development server:

```bash
npm run dev
```

Run production build:

```bash
npm run build
```

Run tests:

```bash
npm test
```

Run lint:

```bash
npm run lint
```

## Tech Stack

- React
- TypeScript
- Vite
- React Router
- Vitest
- Testing Library
