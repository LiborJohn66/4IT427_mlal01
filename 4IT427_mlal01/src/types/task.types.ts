export type TaskStatus = 'todo' | 'in-progress' | 'done'

export type Priority = 'low' | 'medium' | 'high'

export type Task = {
  id: string
  eventId: string
  title: string
  category: string
  assigneeId: string
  status: TaskStatus
  priority: Priority
  deadline: string
}
