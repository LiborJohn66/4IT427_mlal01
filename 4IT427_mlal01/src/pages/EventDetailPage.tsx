import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import type { Event } from '../types/event.types'

type EventsResponse = {
  events: Event[]
}

export function EventDetailPage() {
  const { id } = useParams()
  const [event, setEvent] = useState<Event | null>(null)
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
        </div>
      )}
    </section>
  )
}
