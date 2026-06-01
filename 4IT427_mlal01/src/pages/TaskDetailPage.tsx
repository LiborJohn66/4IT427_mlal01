import { useParams } from 'react-router-dom'

export function TaskDetailPage() {
  const { id } = useParams()

  return (
    <section className="page">
      <h1>Task Detail</h1>
      <p>Selected task: {id}</p>
    </section>
  )
}
