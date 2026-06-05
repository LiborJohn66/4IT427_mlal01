import { useEffect, useMemo, useState } from 'react'
import { ErrorState } from '../components/ErrorState'
import { LoadingState } from '../components/LoadingState'
import type { Task } from '../types/task.types'
import type { User } from '../types/user.types'

type TeamResponse = {
  tasks: Task[]
  users: User[]
}

export function TeamPage() {
  const [users, setUsers] = useState<User[]>([])
  const [tasks, setTasks] = useState<Task[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadTeam() {
      try {
        const response = await fetch('/db.json')

        if (!response.ok) {
          throw new Error('Team could not be loaded.')
        }

        const data = (await response.json()) as TeamResponse
        setUsers(data.users)
        setTasks(data.tasks)
      } catch {
        setError('Team could not be loaded.')
      } finally {
        setIsLoading(false)
      }
    }

    loadTeam()
  }, [])

  const teamMembers = useMemo(
    () =>
      users.map((user) => ({
        ...user,
        taskCount: tasks.filter((task) => task.assigneeId === user.id).length,
      })),
    [tasks, users],
  )

  return (
    <section className="page">
      <h1>Team</h1>

      {isLoading && <LoadingState message="Loading team..." />}
      {error && <ErrorState message={error} />}

      {!isLoading && !error && (
        <ul className="team-list">
          {teamMembers.map((member) => (
            <li key={member.id} className="team-card">
              <h2>{member.name}</h2>
              <p>{member.role}</p>
              <p className="team-card-email">{member.email}</p>
              <strong>{member.taskCount} tasks</strong>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
