import type { Event } from '../types/event.types'

type EventCardProps = {
  event: Event
}

export function EventCard({ event }: EventCardProps) {
  return (
    <li className="event-card">
      <h2>{event.name}</h2>
      <p>{event.date}</p>
      <p>{event.location}</p>
    </li>
  )
}
