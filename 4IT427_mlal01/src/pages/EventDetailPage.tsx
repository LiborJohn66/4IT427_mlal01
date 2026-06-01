import { useParams } from 'react-router-dom'

export function EventDetailPage() {
  const { id } = useParams()

  return (
    <section className="page">
      <h1>Event Detail</h1>
      <p>Selected event: {id}</p>
    </section>
  )
}
