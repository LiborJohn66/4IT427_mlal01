import { useEffect, useMemo, useState } from 'react'
import { ErrorState } from '../components/ErrorState'
import { LoadingState } from '../components/LoadingState'
import type { Task } from '../types/task.types'

type DashboardResponse = {
  tasks: Task[]
}

export function DashboardPage() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadTasks() {
      try {
        const response = await fetch('/db.json')

        if (!response.ok) {
          throw new Error('Dashboard data could not be loaded.')
        }

        const data = (await response.json()) as DashboardResponse
        setTasks(data.tasks)
      } catch {
        setError('Dashboard data could not be loaded.')
      } finally {
        setIsLoading(false)
      }
    }

    loadTasks()
  }, [])

  const stats = useMemo(() => {
    const nearestDeadline = tasks
      .map((task) => task.deadline)
      .sort((firstDate, secondDate) => firstDate.localeCompare(secondDate))[0]

    return [
      { label: 'Total tasks', value: tasks.length },
      {
        label: 'Completed tasks',
        value: tasks.filter((task) => task.status === 'done').length,
      },
      {
        label: 'In progress',
        value: tasks.filter((task) => task.status === 'in-progress').length,
      },
      {
        label: 'Urgent tasks',
        value: tasks.filter((task) => task.priority === 'high').length,
      },
      { label: 'Nearest deadline', value: nearestDeadline ?? 'No deadline' },
    ]
  }, [tasks])

  return (
    <section className="page">
      <h1>Dashboard</h1>

      {isLoading && <LoadingState message="Loading dashboard..." />}
      {error && <ErrorState message={error} />}

      {!isLoading && !error && (
        <div className="dashboard-stats">
          {stats.map((stat) => (
            <article key={stat.label} className="dashboard-stat">
              <p>{stat.label}</p>
              <strong>{stat.value}</strong>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}
