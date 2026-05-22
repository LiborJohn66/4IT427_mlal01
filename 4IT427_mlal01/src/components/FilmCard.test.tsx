import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import FilmCard, { type FilmCardProps } from './FilmCard'

const defaultProps: FilmCardProps = {
  id: 'arrival-2016',
  title: 'Arrival',
  year: 2016,
  genre: 'Sci-fi drama',
  rating: 9,
  watched: false,
  onToggleWatched: vi.fn(),
  onRemove: vi.fn(),
}

function renderFilmCard(overrides: Partial<FilmCardProps> = {}) {
  return render(<FilmCard {...defaultProps} {...overrides} />)
}

describe('FilmCard', () => {
  it('shows the title and release year', () => {
    renderFilmCard()

    expect(screen.getByText('Arrival')).toBeInTheDocument()
    expect(screen.getByText('2016')).toBeInTheDocument()
  })

  it('shows the watched badge for a watched film', () => {
    renderFilmCard({ watched: true })

    expect(screen.getByText('✓ Zhlédnuto')).toBeInTheDocument()
  })

  it('does not show the watched badge for an unwatched film', () => {
    renderFilmCard()

    expect(screen.queryByText('✓ Zhlédnuto')).not.toBeInTheDocument()
  })

  it('calls onToggleWatched once with the film id', async () => {
    const user = userEvent.setup()
    const onToggleWatched = vi.fn()

    renderFilmCard({ onToggleWatched })

    await user.click(
      screen.getByRole('button', { name: 'Označit jako zhlédnuté' }),
    )

    expect(onToggleWatched).toHaveBeenCalledTimes(1)
    expect(onToggleWatched).toHaveBeenCalledWith('arrival-2016')
  })
})
