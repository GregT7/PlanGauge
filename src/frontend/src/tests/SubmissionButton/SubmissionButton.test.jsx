// SubmissionButton.test.jsx
import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

// ---------- HOISTED MOCK HELPERS (must be before any vi.mock) ----------
const { submitPlansMock, fmtMock, MockTaskContextValue, ButtonShim, toastShim } =
  vi.hoisted(() => {
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
    };
  });

// ---------- MODULE MOCKS ----------
vi.mock('@/components/ui/button', () => {
  // Use createElement to avoid JSX inside hoisted factory
  return { Button: ButtonShim };
});

vi.mock('@/utils/styleData.json', () => ({
  default: {
    neutral: { base: 'neutral-base', hover: 'neutral-hover' },
    success: { base: 'success-base', hover: 'success-hover' },
    error: { base: 'error-base', hover: 'error-hover' },
  },
}));

vi.mock('@/utils/submitPlans', () => ({
  default: (...args) => submitPlansMock(...args),
}));

// Instead of importing the real context module, provide a lightweight mock.
vi.mock('@/contexts/TaskContext', () => {
  const React = require('react');
  // Create a context we control; we'll replace its value per test
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

vi.mock('sonner', () => ({
  toast: toastShim,
}));

// ---------- IMPORT AFTER MOCKS ----------
import { TaskContext } from '@/contexts/TaskContext';
import SubmissionButton from '@/components/SubmissionButton/SubmissionButton';

// Helper: render with our mocked TaskContext value
function renderWithTasks(ui, tasks) {
  return render(
    <TaskContext.Provider value={{ tasks }}>
      {ui}
    </TaskContext.Provider>
  );
}

// controllable promise helper
function deferred() {
  let resolve, reject;
  const p = new Promise((res, rej) => {
    resolve = res;
    reject = rej;
  });
  return { promise: p, resolve, reject };
}

beforeEach(() => {
  vi.clearAllMocks();
});

describe('SubmissionButton', () => {
  const sampleTasks = [
    {
      name: 'Task A',
      category: 'School',
      due_date: '2025-09-30',
      start_date: '2025-09-24',
      time_estimation: 60,
    },
    {
      name: 'Task B',
      category: 'Personal',
      due_date: '2025-10-02',
      start_date: '2025-09-28',
      time_estimation: 30,
    },
  ];

  it('renders a button with text "Submit"', () => {
    renderWithTasks(<SubmissionButton />, sampleTasks);
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  it('applies neutral styling by default', () => {
    renderWithTasks(<SubmissionButton />, sampleTasks);
    const btn = screen.getByRole('button', { name: /submit/i });
    expect(btn.className).toContain('neutral-base');
    expect(btn.className).toContain('neutral-hover');
  });

  it('applies provided status styling (success)', () => {
    renderWithTasks(<SubmissionButton status="success" />, sampleTasks);
    const btn = screen.getByRole('button');
    expect(btn.className).toContain('success-base');
    expect(btn.className).toContain('success-hover');
  });

  it('falls back to error styling for unknown status', () => {
    renderWithTasks(<SubmissionButton status="wut" />, sampleTasks);
    const btn = screen.getByRole('button');
    expect(btn.className).toContain('error-base');
    expect(btn.className).toContain('error-hover');
  });

  it('formats dates for each task (due_date and start_date)', () => {
    renderWithTasks(<SubmissionButton />, sampleTasks);
    // 2 tasks * 2 fields
    expect(fmtMock).toHaveBeenCalledTimes(4);
    expect(fmtMock).toHaveBeenCalledWith('2025-09-30');
    expect(fmtMock).toHaveBeenCalledWith('2025-09-24');
  });

  it('disables during submission and re-enables on success', async () => {
    const d = deferred();
    submitPlansMock.mockReturnValueOnce(d.promise);

    renderWithTasks(<SubmissionButton />, sampleTasks);
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

    renderWithTasks(<SubmissionButton />, sampleTasks);
    const btn = screen.getByRole('button');

    fireEvent.click(btn);
    expect(btn).toBeDisabled();

    d.reject(new Error('boom'));
    await waitFor(() => expect(btn).not.toBeDisabled());

    expect(toastShim.error).toHaveBeenCalledWith('boom');
  });

  it('passes formatted tasks and default filter dates to submitPlans', async () => {
    const d = deferred();
    submitPlansMock.mockReturnValueOnce(d.promise);

    renderWithTasks(<SubmissionButton />, sampleTasks);
    fireEvent.click(screen.getByRole('button'));

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

    d.resolve({});
    await waitFor(() => expect(screen.getByRole('button')).not.toBeDisabled());
  });

  it('respects provided filter_start_date and filter_end_date props', async () => {
    const d = deferred();
    submitPlansMock.mockReturnValueOnce(d.promise);

    renderWithTasks(
      <SubmissionButton filter_start_date="2025-09-01" filter_end_date="2025-09-30" />,
      sampleTasks
    );

    fireEvent.click(screen.getByRole('button'));

    const [, startArg, endArg] = submitPlansMock.mock.calls[0];
    expect(startArg).toBe('2025-09-01');
    expect(endArg).toBe('2025-09-30');

    d.resolve({});
    await waitFor(() => expect(screen.getByRole('button')).not.toBeDisabled());
  });
});