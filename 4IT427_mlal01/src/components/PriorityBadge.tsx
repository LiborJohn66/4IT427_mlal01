import type { Priority } from '../types/task.types'

type PriorityBadgeProps = {
  priority: Priority
}

const priorityLabels: Record<Priority, string> = {
  low: 'Low priority',
  medium: 'Medium priority',
  high: 'High priority',
}

export function PriorityBadge({ priority }: PriorityBadgeProps) {
  return (
    <span className={`badge priority-badge priority-badge-${priority}`}>
      {priorityLabels[priority]}
    </span>
  )
}
