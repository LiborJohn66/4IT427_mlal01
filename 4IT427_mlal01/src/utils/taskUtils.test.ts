import { describe, expect, it } from 'vitest'
import { getCompletionPercentage } from './taskUtils'

describe('getCompletionPercentage', () => {
  it('returns rounded percentage of done tasks', () => {
    const result = getCompletionPercentage([
      { status: 'done' },
      { status: 'todo' },
      { status: 'done' },
    ])

    expect(result).toBe(67)
  })

  it('returns 0 when there are no tasks', () => {
    expect(getCompletionPercentage([])).toBe(0)
  })
})
