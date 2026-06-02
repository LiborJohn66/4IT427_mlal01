import { PriorityBadge } from './PriorityBadge'
import { StatusBadge } from './StatusBadge'
import type { Task } from '../types/task.types'

type TaskCardProps = {
  task: Task
}

export function TaskCard({ task }: TaskCardProps) {
  return (
    <li className="task-card">
      <h3>{task.title}</h3>
      <p>{task.category}</p>
      <div className="task-card-badges">
        <StatusBadge status={task.status} />
        <PriorityBadge priority={task.priority} />
      </div>
      <p>Deadline: {task.deadline}</p>
    </li>
  )
}
