import type { TaskStatus } from '../types/task.types'

type TaskWithStatus = {
  status: TaskStatus
}

export function getCompletionPercentage(tasks: TaskWithStatus[]) {
  if (tasks.length === 0) {
    return 0
  }

  const completedTasks = tasks.filter((task) => task.status === 'done').length

  return Math.round((completedTasks / tasks.length) * 100)
}
