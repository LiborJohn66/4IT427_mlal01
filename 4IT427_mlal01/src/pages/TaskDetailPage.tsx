import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ErrorState } from '../components/ErrorState'
import { LoadingState } from '../components/LoadingState'
import { PriorityBadge } from '../components/PriorityBadge'
import { StatusBadge } from '../components/StatusBadge'
import type { Event } from '../types/event.types'
import type { Task } from '../types/task.types'
import type { User } from '../types/user.types'

type TaskDetailResponse = {
  events: Event[]
  tasks: Task[]
  users: User[]
}

export function TaskDetailPage() {
  const { id } = useParams()
  const [task, setTask] = useState<Task | null>(null)
  const [event, setEvent] = useState<Event | null>(null)
  const [assignee, setAssignee] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadTask() {
      try {
        const response = await fetch('/db.json')

        if (!response.ok) {
          throw new Error('Task could not be loaded.')
        }

        const data = (await response.json()) as TaskDetailResponse
        const selectedTask = data.tasks.find((item) => item.id === id)

        if (!selectedTask) {
          throw new Error('Task was not found.')
        }

        setTask(selectedTask)
        setEvent(data.events.find((item) => item.id === selectedTask.eventId) ?? null)
        setAssignee(
          data.users.find((item) => item.id === selectedTask.assigneeId) ?? null,
        )
      } catch {
        setError('Task could not be loaded.')
      } finally {
        setIsLoading(false)
      }
    }

    loadTask()
  }, [id])

  return (
    <section className="page">
      {isLoading && <LoadingState message="Loading task..." />}
      {error && <ErrorState message={error} />}

      {!isLoading && !error && task && (
        <div className="task-detail">
          <h1>{task.title}</h1>
          <div className="task-card-badges">
            <StatusBadge status={task.status} />
            <PriorityBadge priority={task.priority} />
          </div>

          <dl className="detail-list">
            <div>
              <dt>Category</dt>
              <dd>{task.category}</dd>
            </div>
            <div>
              <dt>Deadline</dt>
              <dd>{task.deadline}</dd>
            </div>
            <div>
              <dt>Event</dt>
              <dd>{event?.name ?? 'Unknown event'}</dd>
            </div>
            <div>
              <dt>Responsible person</dt>
              <dd>{assignee?.name ?? 'Unassigned'}</dd>
            </div>
          </dl>
        </div>
      )}
    </section>
  )
}
