import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { TaskCard } from '../components/TaskCard'
import type { Event } from '../types/event.types'
import type { Task } from '../types/task.types'

type EventsResponse = {
  events: Event[]
  tasks: Task[]
}

export function EventDetailPage() {
  const { id } = useParams()
  const [event, setEvent] = useState<Event | null>(null)
  const [tasks, setTasks] = useState<Task[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadEvent() {
      try {
        const response = await fetch('/db.json')

        if (!response.ok) {
          throw new Error('Event could not be loaded.')
        }

        const data = (await response.json()) as EventsResponse
        const selectedEvent = data.events.find((item) => item.id === id)

        if (!selectedEvent) {
          throw new Error('Event was not found.')
        }

        setEvent(selectedEvent)
        setTasks(data.tasks.filter((task) => task.eventId === selectedEvent.id))
      } catch {
        setError('Event could not be loaded.')
      } finally {
        setIsLoading(false)
      }
    }

    loadEvent()
  }, [id])

  return (
    <section className="page">
      {isLoading && <p>Loading event...</p>}
      {error && <p>{error}</p>}

      {!isLoading && !error && event && (
        <div className="event-detail">
          <h1>{event.name}</h1>
          <p>{event.description}</p>
          <dl className="event-detail-list">
            <div>
              <dt>Date</dt>
              <dd>{event.date}</dd>
            </div>
            <div>
              <dt>Location</dt>
              <dd>{event.location}</dd>
            </div>
          </dl>

          <section className="event-tasks">
            <h2>Tasks</h2>
            {tasks.length === 0 ? (
              <p>No tasks for this event yet.</p>
            ) : (
              <ul className="task-list">
                {tasks.map((task) => (
                  <TaskCard key={task.id} task={task} />
                ))}
              </ul>
            )}
          </section>
        </div>
      )}
    </section>
  )
}
