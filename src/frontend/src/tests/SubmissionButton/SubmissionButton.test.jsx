// SubmissionButton.test.jsx (Vitest + RTL)
import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

// ---------- HOISTED MOCK HELPERS (must be before any vi.mock) ----------
const {
  submitPlansMock,
  fmtMock,
  MockTaskContextValue,
  ButtonShim,
  toastShim,
  makeFeasibility
} = vi.hoisted(() => {
  const React = require('react');
  return {
    submitPlansMock: vi.fn(),
    fmtMock: vi.fn((input) => (typeof input === 'string' ? `${input}_F` : 'DATE_F')),
    MockTaskContextValue: { tasks: [] },
    ButtonShim: (props) => React.createElement('button', { ...props }, props.children),
    toastShim: {
      promise: vi.fn((p) => p), // pass-through
      error: vi.fn(),
    },
    makeFeasibility: (status = 'neutral') => ({
      score: 0,
      status,
      week_eval: null,
      days_eval: null,
    }),
  };
});

// ---------- MODULE MOCKS ----------
vi.mock('@/components/ui/button', () => ({ Button: ButtonShim }));

vi.mock('@/utils/styleData.json', () => ({
  default: {
    neutral: { base: 'neutral-base', hover: 'neutral-hover' },
    success: { base: 'success-base', hover: 'success-hover' },
    unknown: { base: 'unknown-base', hover: 'unknown-hover' }, // fallback used by component
  },
}));

vi.mock('@/utils/submitPlans', () => ({
  default: (...args) => submitPlansMock(...args),
}));

vi.mock('@/contexts/TaskContext', () => {
  const React = require('react');
  const TaskContext = React.createContext(MockTaskContextValue);
  return { TaskContext };
});

vi.mock('@/utils/formatDateToYYYYMMDD', () => ({
  default: (v) => fmtMock(v),
}));

vi.mock('@/utils/planningRange', () => ({
  DEFAULT_PLAN_START: '2000-01-01',
  DEFAULT_PLAN_END: '2099-12-31',
}));

vi.mock('sonner', () => ({ toast: toastShim }));

// NEW: processingContext is used for styling
vi.mock('@/contexts/ProcessingContext', () => {
  const React = require('react');
  const processingContext = React.createContext({ feasibility: { status: 'neutral' } });
  return { processingContext };
});

// ---------- IMPORT AFTER MOCKS ----------
import SubmissionButton from '@/components/SubmissionButton/SubmissionButton'; // adjust if needed
import { TaskContext } from '@/contexts/TaskContext';
import { processingContext } from '@/contexts/ProcessingContext';

// Helpers
function renderWithProviders(ui, { tasks, feasibilityStatus = 'neutral' } = {}) {
  return render(
    <processingContext.Provider value={{ feasibility: { status: feasibilityStatus } }}>
      <TaskContext.Provider value={{ tasks: tasks ?? [] }}>{ui}</TaskContext.Provider>
    </processingContext.Provider>
  );
}

function deferred() {
  let resolve, reject;
  const p = new Promise((res, rej) => { resolve = res; reject = rej; });
  return { promise: p, resolve, reject };
}

beforeEach(() => {
  vi.clearAllMocks();
});

describe('SubmissionButton (updated)', () => {
  const sampleTasks = [
    { name: 'Task A', category: 'School',   due_date: '2025-09-30', start_date: '2025-09-24', time_estimation: 60 },
    { name: 'Task B', category: 'Personal', due_date: '2025-10-02', start_date: '2025-09-28', time_estimation: 30 },
  ];

  it('renders a button with text "Submit"', () => {
    renderWithProviders(<SubmissionButton />, { tasks: sampleTasks });
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  it('applies styling from processingContext.feasibility.status (neutral)', () => {
    renderWithProviders(<SubmissionButton />, { tasks: sampleTasks, feasibilityStatus: 'neutral' });
    const btn = screen.getByRole('button', { name: /submit/i });
    expect(btn.className).toContain('neutral-base');
    expect(btn.className).toContain('neutral-hover');
  });

  it('applies styling from processingContext.feasibility.status (success)', () => {
    renderWithProviders(<SubmissionButton />, { tasks: sampleTasks, feasibilityStatus: 'success' });
    const btn = screen.getByRole('button', { name: /submit/i });
    expect(btn.className).toContain('success-base');
    expect(btn.className).toContain('success-hover');
  });

  it('falls back to `unknown` styling when status not found', () => {
    renderWithProviders(<SubmissionButton />, { tasks: sampleTasks, feasibilityStatus: 'nonsense' });
    const btn = screen.getByRole('button', { name: /submit/i });
    expect(btn.className).toContain('unknown-base');
    expect(btn.className).toContain('unknown-hover');
  });

  it('formats dates for each task (due_date and start_date)', () => {
    renderWithProviders(<SubmissionButton />, { tasks: sampleTasks });
    // 2 tasks * 2 fields
    expect(fmtMock).toHaveBeenCalledTimes(4);
    expect(fmtMock).toHaveBeenCalledWith('2025-09-30');
    expect(fmtMock).toHaveBeenCalledWith('2025-09-24');
    expect(fmtMock).toHaveBeenCalledWith('2025-10-02');
    expect(fmtMock).toHaveBeenCalledWith('2025-09-28');
  });

  it('disables during submission and re-enables on success', async () => {
    const d = deferred();
    submitPlansMock.mockReturnValueOnce(d.promise);

    renderWithProviders(<SubmissionButton />, { tasks: sampleTasks });
    const btn = screen.getByRole('button', { name: /submit/i });

    fireEvent.click(btn);
    expect(btn).toBeDisabled();

    d.resolve({ ok: true });
    await waitFor(() => expect(btn).not.toBeDisabled());

    expect(toastShim.promise).toHaveBeenCalledTimes(1);
    expect(submitPlansMock).toHaveBeenCalledTimes(1);
  });

  it('re-enables and calls toast.error on failure', async () => {
    const d = deferred();
    submitPlansMock.mockReturnValueOnce(d.promise);

    renderWithProviders(<SubmissionButton />, { tasks: sampleTasks });
    const btn = screen.getByRole('button', { name: /submit/i });

    fireEvent.click(btn);
    expect(btn).toBeDisabled();

    d.reject(new Error('boom'));
    await waitFor(() => expect(btn).not.toBeDisabled());

    expect(toastShim.error).toHaveBeenCalledWith('boom');
  });

  it('passes formatted tasks and default filter dates to submitPlans', async () => {
    const d = deferred();
    submitPlansMock.mockReturnValueOnce(d.promise);

    renderWithProviders(<SubmissionButton />, { tasks: sampleTasks });
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    const [tasksArg, startArg, endArg] = submitPlansMock.mock.calls[0];
    expect(Array.isArray(tasksArg)).toBe(true);
    expect(startArg).toBe('2000-01-01');
    expect(endArg).toBe('2099-12-31');

    // original remains unchanged
    expect(sampleTasks[0].due_date).toBe('2025-09-30');

    // formatted copy passed to submitPlans
    expect(tasksArg[0].due_date).toBe('2025-09-30_F');
    expect(tasksArg[0].start_date).toBe('2025-09-24_F');
    expect(tasksArg[1].due_date).toBe('2025-10-02_F');
    expect(tasksArg[1].start_date).toBe('2025-09-28_F');

    d.resolve({ ok: true });
    await waitFor(() => expect(screen.getByRole('button')).not.toBeDisabled());
  });

  it('respects provided filter_start_date and filter_end_date props', async () => {
    const d = deferred();
    submitPlansMock.mockReturnValueOnce(d.promise);

    renderWithProviders(
      <SubmissionButton filter_start_date="2025-09-01" filter_end_date="2025-09-30" />,
      { tasks: sampleTasks }
    );

    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    const [, startArg, endArg] = submitPlansMock.mock.calls[0];
    expect(startArg).toBe('2025-09-01');
    expect(endArg).toBe('2025-09-30');

    d.resolve({ ok: true });
    await waitFor(() => expect(screen.getByRole('button')).not.toBeDisabled());
  });
});
