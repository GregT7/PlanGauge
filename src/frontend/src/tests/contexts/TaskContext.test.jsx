import React, { useContext } from 'react'
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import TaskContextProvider, { TaskContext } from '@/contexts/TaskContext'


// Stub toLocalMidnight so dates are predictable/no‑op for these tests
vi.mock('@/utils/toLocalMidnight', () => ({
default: (d) => (d instanceof Date ? d : new Date(d))
}))


function TaskConsumer() {
const { tasks, timeSum, setTasks } = useContext(TaskContext)
// expose into DOM for assertions
return (
<div>
<div data-testid="count">{tasks?.length ?? 0}</div>
<div data-testid="sum">{timeSum ?? 0}</div>
<button onClick={() => setTasks([{ start_date: new Date('2025-09-29'), due_date: new Date('2025-09-29'), time_estimation: 1 }])}>
update
</button>
</div>
)
}


describe('TaskContextProvider', () => {
it('computes timeSum from starting_tasks and normalizes dates', () => {
const starting_tasks = [
{ start_date: '2025-09-29T09:00:00Z', due_date: '2025-09-29T10:00:00Z', time_estimation: 3 },
{ start_date: '2025-09-30T12:00:00Z', due_date: '2025-09-30T13:00:00Z', time_estimation: 5 },
]


render(
<TaskContextProvider starting_tasks={starting_tasks}>
<TaskConsumer />
</TaskContextProvider>
)


expect(screen.getByTestId('count').textContent).toBe('2')
expect(screen.getByTestId('sum').textContent).toBe('8')
})


it('updates timeSum when setTasks is called', async () => {
const starting_tasks = [
{ start_date: '2025-09-29', due_date: '2025-09-29', time_estimation: 10 },
]


render(
<TaskContextProvider starting_tasks={starting_tasks}>
<TaskConsumer />
</TaskContextProvider>
)


// initial
expect(screen.getByTestId('sum').textContent).toBe('10')


// update
await screen.getByText('update').click()
expect(screen.getByTestId('count').textContent).toBe('1')
expect(screen.getByTestId('sum').textContent).toBe('1')
})
})