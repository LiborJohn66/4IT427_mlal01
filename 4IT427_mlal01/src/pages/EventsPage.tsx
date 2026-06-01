import { useEffect, useState } from 'react'
import type { Event } from '../types/event.types'

type EventsResponse = {
  events: Event[]
}

export function EventsPage() {
  const [events, setEvents] = useState<Event[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadEvents() {
      try {
        const response = await fetch('/db.json')

        if (!response.ok) {
          throw new Error('Events could not be loaded.')
        }

        const data = (await response.json()) as EventsResponse
        setEvents(data.events)
      } catch {
        setError('Events could not be loaded.')
      } finally {
        setIsLoading(false)
      }
    }

    loadEvents()
  }, [])

  return (
    <section className="page">
      <h1>Events</h1>

      {isLoading && <p>Loading events...</p>}
      {error && <p>{error}</p>}

      {!isLoading && !error && (
        <ul className="event-list">
          {events.map((event) => (
            <li key={event.id} className="event-list-item">
              <h2>{event.name}</h2>
              <p>{event.date}</p>
              <p>{event.location}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
