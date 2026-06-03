import { useEffect, useMemo, useState } from 'react'
import { ErrorState } from '../components/ErrorState'
import { LoadingState } from '../components/LoadingState'
import { TaskCard } from '../components/TaskCard'
import type { Task, TaskStatus } from '../types/task.types'

type TasksResponse = {
  tasks: Task[]
}

type TaskFilter = TaskStatus | 'all'

const filters: { value: TaskFilter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'todo', label: 'Todo' },
  { value: 'in-progress', label: 'In progress' },
  { value: 'done', label: 'Done' },
]

export function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [activeFilter, setActiveFilter] = useState<TaskFilter>('all')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadTasks() {
      try {
        const response = await fetch('/db.json')

        if (!response.ok) {
          throw new Error('Tasks could not be loaded.')
        }

        const data = (await response.json()) as TasksResponse
        setTasks(data.tasks)
      } catch {
        setError('Tasks could not be loaded.')
      } finally {
        setIsLoading(false)
      }
    }

    loadTasks()
  }, [])

  const filteredTasks = useMemo(() => {
    if (activeFilter === 'all') {
      return tasks
    }

    return tasks.filter((task) => task.status === activeFilter)
  }, [activeFilter, tasks])

  return (
    <section className="page">
      <h1>Tasks</h1>

      <div className="task-filters" aria-label="Task status filters">
        {filters.map((filter) => (
          <button
            key={filter.value}
            type="button"
            className={
              activeFilter === filter.value
                ? 'task-filter task-filter-active'
                : 'task-filter'
            }
            onClick={() => setActiveFilter(filter.value)}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {isLoading && <LoadingState message="Loading tasks..." />}
      {error && <ErrorState message={error} />}

      {!isLoading && !error && (
        <ul className="task-list">
          {filteredTasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </ul>
      )}
    </section>
  )
}
