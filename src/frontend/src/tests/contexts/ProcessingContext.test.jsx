// ------------------------------------------------------------
// Save as: src/contexts/__tests__/ProcessingContext.test.jsx
import React, { useContext } from 'react'
import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import TaskContextProvider from '@/contexts/TaskContext'
import { ProcessingContextProvider, processingContext } from '@/contexts/ProcessingContext'

// Silence toast side‑effects
vi.mock('sonner', () => ({ toast: { promise: () => {}, error: () => {} } }))

// Make midnight conversion a no‑op; keep Date instances
vi.mock('@/utils/toLocalMidnight', () => ({ default: (d) => (d instanceof Date ? d : new Date(d)) }))

// Simple same‑day comparator for the test environment
vi.mock('@/utils/isSameDay', () => ({ default: (a, b) => a.toDateString() === b.toDateString() }))

// Provide deterministic default card data (3 days)
const CARD_DATES = [
  new Date('2025-09-29T00:00:00Z'),
  new Date('2025-09-30T00:00:00Z'),
  new Date('2025-10-01T00:00:00Z'),
]
vi.mock('@/utils/genDefaultCardData', () => {
  const genDefaultCardsData = () => CARD_DATES.map(date => ({ date, ave: 2, std: 1, sum: 0 }))
  return {
    // Named export (most likely what ProcessingContext uses)
    genDefaultCardsData,
    // Also provide a default in case the module is imported as default
    default: genDefaultCardsData,
  }
})


// Pass‑through (no real stat enrichment for this test)
vi.mock('@/utils/updateCardStats', () => ({ default: (cards) => cards }))

// Map sums to status strings
vi.mock('@/utils/evaluateFeasibility', () => ({
  eval_status: (sum) => (sum > 0 ? 'good' : 'poor'),
  evaluateFeasibility: () => ({ score: 42, label: 'good' }),
}))

// Pretend API returns week stats; we won’t await anything explicit in the test
vi.mock('@/utils/retrieveStats', () => ({ default: async () => ({ message: 'ok', data: { week: { ave: 10, std: 2 }, day: {} } }) }))

// Threshold & planning constants
vi.mock('@/utils/defaultThresholds.json', () => ({ default: { zscore: { good: 1, moderate: 2 } } }), { virtual: true })
vi.mock('@/utils/planningRange', () => ({ DEFAULT_PLAN_START: new Date('2025-09-29'), DEFAULT_PLAN_END: new Date('2025-10-05') }))

function ProcessingConsumer() {
  const ctx = useContext(processingContext)
  if (!ctx) return null
  const { cardData, statusCount, feasibility, thresholds, filterDates } = ctx
  return (
    <div>
      <div data-testid="cards">{cardData?.length ?? 0}</div>
      <div data-testid="good">{statusCount?.good ?? 0}</div>
      <div data-testid="poor">{statusCount?.poor ?? 0}</div>
      <div data-testid="score">{feasibility?.score ?? 0}</div>
      <div data-testid="thresh-good">{thresholds?.zscore?.good ?? ''}</div>
      <div data-testid="start">{new Date(filterDates?.start).toDateString()}</div>
      <div data-testid="end">{new Date(filterDates?.end).toDateString()}</div>
    </div>
  )
}

describe('ProcessingContextProvider', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('derives card sums/statuses, computes feasibility, and exposes config', async () => {
    // Make two tasks on the first card’s date to ensure a positive sum there
    const starting_tasks = [
      { start_date: '2025-09-29T09:00:00Z', due_date: '2025-09-29T10:00:00Z', time_estimation: 3 },
      { start_date: '2025-09-29T12:00:00Z', due_date: '2025-09-29T13:00:00Z', time_estimation: 5 },
    ]

    render(
      <TaskContextProvider starting_tasks={starting_tasks}>
        <ProcessingContextProvider>
          <ProcessingConsumer />
        </ProcessingContextProvider>
      </TaskContextProvider>
    )

    // 3 cards from mocked genDefaultCardData
    expect(screen.getByTestId('cards').textContent).toBe('3')

    // One card has sum > 0 -> status "good"; the others are "poor" via mocked eval_status
    await waitFor(() => {
      expect(screen.getByTestId('good').textContent).toBe('1')
      expect(screen.getByTestId('poor').textContent).toBe('2')
    })

    // Feasibility comes from mocked evaluateFeasibility
    expect(screen.getByTestId('score').textContent).toBe('42')

    // Threshold passthrough + planning range
    expect(screen.getByTestId('thresh-good').textContent).toBe('1')
    expect(screen.getByTestId('start').textContent).toBe(new Date('2025-09-29').toDateString())
    expect(screen.getByTestId('end').textContent).toBe(new Date('2025-10-05').toDateString())
  })
})
