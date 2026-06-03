import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { TasksPage } from './TasksPage'

const tasks = [
  {
    id: 'task-1',
    eventId: 'event-1',
    title: 'Confirm main hall layout',
    category: 'Hala',
    assigneeId: 'user-1',
    status: 'in-progress',
    priority: 'high',
    deadline: '2026-06-20',
  },
  {
    id: 'task-2',
    eventId: 'event-1',
    title: 'Book speaker hotel rooms',
    category: 'Hotel',
    assigneeId: 'user-2',
    status: 'todo',
    priority: 'medium',
    deadline: '2026-06-24',
  },
  {
    id: 'task-3',
    eventId: 'event-1',
    title: 'Prepare accreditation desk',
    category: 'Akreditácie',
    assigneeId: 'user-3',
    status: 'done',
    priority: 'medium',
    deadline: '2026-06-12',
  },
] as const

describe('TasksPage', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('shows only done tasks after clicking the done filter', async () => {
    const user = userEvent.setup()

    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ tasks }),
      }),
    )

    render(
      <MemoryRouter>
        <TasksPage />
      </MemoryRouter>,
    )

    expect(await screen.findByText('Confirm main hall layout')).not.toBeNull()
    expect(screen.getByText('Book speaker hotel rooms')).not.toBeNull()

    await user.click(screen.getByRole('button', { name: 'Done' }))

    expect(screen.getByText('Prepare accreditation desk')).not.toBeNull()
    expect(screen.queryByText('Confirm main hall layout')).toBeNull()
    expect(screen.queryByText('Book speaker hotel rooms')).toBeNull()
  })
})
