import type { Task } from '../types/task.types'

type TaskCardProps = {
  task: Task
}

export function TaskCard({ task }: TaskCardProps) {
  return (
    <li className="task-card">
      <h3>{task.title}</h3>
      <p>{task.category}</p>
      <p>
        {task.status} · {task.priority} priority
      </p>
      <p>Deadline: {task.deadline}</p>
    </li>
  )
}
