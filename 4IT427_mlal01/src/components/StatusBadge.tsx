import type { TaskStatus } from '../types/task.types'

type StatusBadgeProps = {
  status: TaskStatus
}

const statusLabels: Record<TaskStatus, string> = {
  todo: 'Todo',
  'in-progress': 'In progress',
  done: 'Done',
}

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span className={`badge status-badge status-badge-${status}`}>
      {statusLabels[status]}
    </span>
  )
}
