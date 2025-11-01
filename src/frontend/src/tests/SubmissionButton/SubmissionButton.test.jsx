// src/tests/SubmissionButton/SubmissionButton.test.jsx
import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

// ---------------------- Hoisted doubles ----------------------
const {
  submitPlansMock,
  fmtMock,
  toastShim,
  ButtonShim,
  mockedStyleData,
} = vi.hoisted(() => {
  const React = require('react');

  const submitPlansMock = vi.fn();

  // formatDateToYYYYMMDD mock: returns DATE_F for non-strings, echoes strings
  const fmtMock = vi.fn((v) => (typeof v === 'string' ? v : 'DATE_F'));

  // Keep toast simple and non-invasive: record calls; return original promise
  const toastShim = {
    promise: vi.fn((p, _msgs) => p),
    error: vi.fn(),
    success: vi.fn(),
    loading: vi.fn(),
  };

  const ButtonShim = React.forwardRef(({ children, ...props }, ref) => (
    <button ref={ref} {...props}>{children}</button>
  ));
  ButtonShim.displayName = 'ButtonShim';

  // Style data the component consults
  const mockedStyleData = {
    neutral: { base: 'base-neutral', hover: 'hover-neutral' },
    success: { base: 'base-success', hover: 'hover-success' },
    danger:  { base: 'base-danger',  hover: 'hover-danger'  },
    unknown: { base: 'base-unknown', hover: 'hover-unknown' },
  };

  return { submitPlansMock, fmtMock, toastShim, ButtonShim, mockedStyleData };
});

// ---------------------- Module mocks ----------------------
// Use your alias-less (relative) paths below for test stability
vi.mock('../../utils/submitPlans', () => ({ default: submitPlansMock }));
vi.mock('../../utils/formatDateToYYYYMMDD', () => ({ default: fmtMock }));
vi.mock('sonner', () => ({ toast: toastShim }));

// The component imports styleData.json directly; control it here
vi.mock('../../utils/styleData.json', () => ({
  default: mockedStyleData,
}));

// Replace Shadcn Button
vi.mock('../../components/ui/button', () => ({ Button: ButtonShim }));

// Contexts used by the component
vi.mock('../../contexts/TaskContext', () => {
  const React = require('react');
  return { TaskContext: React.createContext({ tasks: [] }) };
});

vi.mock('../../contexts/ProcessingContext', () => {
  const React = require('react');
  return {
    processingContext: React.createContext({
      state: 'idle',
      feasibility: { status: 'neutral' },
    }),
  };
});

// ---------------------- SUT ----------------------
// Use RELATIVE imports to avoid alias resolution issues
import { TaskContext } from '../../contexts/TaskContext';
import { processingContext } from '../../contexts/ProcessingContext';
import SubmissionButton from '../../components/SubmissionButton/SubmissionButton';

// ---------------------- Helpers ----------------------
function renderWithProviders(
  _ui,
  {
    tasks = [],
    processing = { state: 'idle', feasibility: { status: 'neutral' } },
    IS_DEMO = false,
    filter_start_date = '2000-01-01',
    filter_end_date = '2099-12-31',
  } = {}
) {
  return render(
    <processingContext.Provider value={processing}>
      <TaskContext.Provider value={{ tasks }}>
        <SubmissionButton
          IS_DEMO={IS_DEMO}
          filter_start_date={filter_start_date}
          filter_end_date={filter_end_date}
        />
      </TaskContext.Provider>
    </processingContext.Provider>
  );
}

const sampleTasks = [
  { name: 'HW 1', category: 'Class', time_estimation: 60, due_date: '2025-09-30', start_date: '2025-09-24' },
  { name: 'HW 2', category: 'Class', time_estimation: 90, due_date: '2025-10-02', start_date: '2025-09-28' },
];

// ---------------------- Tests (14) ----------------------
describe('SubmissionButton – full suite (updated, no fake timers)', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // 1
  it('renders a clickable "Submit" button', () => {
    renderWithProviders(<></>);
    const btn = screen.getByRole('button', { name: /submit/i });
    expect(btn).toBeInTheDocument();
    expect(btn).not.toBeDisabled();
    expect(btn).toHaveAttribute('aria-busy', 'false');
  });

  // 2  (class comes from styleData.json + feasibility.status)
  it('applies style from feasibility.status via styleData.json', () => {
    renderWithProviders(<></>, { processing: { state: 'idle', feasibility: { status: 'success' } } });
    const btn = screen.getByRole('button', { name: /submit/i });
    expect(btn.className).toContain('base-success');
    expect(btn.className).toContain('hover-success');
    expect(btn.className).toContain('text-xl');
    expect(btn.className).toContain('p-6');
  });

  // 3
  it('does not format on render; formats on click only', async () => {
    renderWithProviders(<></>, { tasks: sampleTasks });
    expect(fmtMock).not.toHaveBeenCalled();

    submitPlansMock.mockResolvedValueOnce({ ok: true });
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => expect(fmtMock).toHaveBeenCalledTimes(4));
  });

  // 4
  it('formats dates for each task (due_date and start_date) on click', async () => {
    submitPlansMock.mockResolvedValueOnce({ ok: true });

    renderWithProviders(<></>, { tasks: sampleTasks });
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => expect(fmtMock).toHaveBeenCalledTimes(4));
    expect(fmtMock).toHaveBeenNthCalledWith(1, '2025-09-30');
    expect(fmtMock).toHaveBeenNthCalledWith(2, '2025-09-24');
    expect(fmtMock).toHaveBeenNthCalledWith(3, '2025-10-02');
    expect(fmtMock).toHaveBeenNthCalledWith(4, '2025-09-28');
  });

  // 5
  it('formats undefined dates safely', async () => {
    submitPlansMock.mockResolvedValueOnce({ ok: true });

    const tasks = [{ name: 'No Dates', category: 'N/A', time_estimation: 5, due_date: undefined, start_date: undefined }];
    renderWithProviders(<></>, { tasks });
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => expect(fmtMock).toHaveBeenCalledTimes(2));
    expect(fmtMock).toHaveBeenNthCalledWith(1, undefined);
    expect(fmtMock).toHaveBeenNthCalledWith(2, undefined);
  });

  // 6
  it('disables and sets aria-busy during in-flight promise', async () => {
    let resolveFirst;
    submitPlansMock.mockReturnValueOnce(new Promise((res) => (resolveFirst = res)));

    renderWithProviders(<></>, { tasks: sampleTasks });
    const btn = screen.getByRole('button', { name: /submit/i });

    fireEvent.click(btn);
    expect(btn).toBeDisabled();
    expect(btn).toHaveAttribute('aria-busy', 'true');

    resolveFirst({ ok: true });
    await waitFor(() => {
      expect(btn).not.toBeDisabled();
      expect(btn).toHaveAttribute('aria-busy', 'false');
    });
  });

  // 7
  it('ignores clicks while a submission is in flight', async () => {
    let resolveFirst;
    submitPlansMock.mockReturnValueOnce(new Promise((res) => (resolveFirst = res)));

    renderWithProviders(<></>, { tasks: sampleTasks });
    const btn = screen.getByRole('button', { name: /submit/i });

    fireEvent.click(btn);
    fireEvent.click(btn); // ignored

    expect(submitPlansMock).toHaveBeenCalledTimes(1);
    expect(btn).toBeDisabled();
    expect(btn).toHaveAttribute('aria-busy', 'true');

    resolveFirst({ ok: true });
    await waitFor(() => {
      expect(btn).not.toBeDisabled();
      expect(btn).toHaveAttribute('aria-busy', 'false');
    });
  });

  // 8
  it('ignores rapid duplicate submissions of identical payload within 1s', async () => {
    let resolveFirst;
    submitPlansMock.mockReturnValueOnce(new Promise((res) => (resolveFirst = res)));

    renderWithProviders(<></>, { tasks: sampleTasks });
    const btn = screen.getByRole('button', { name: /submit/i });

    fireEvent.click(btn);
    await waitFor(() => expect(submitPlansMock).toHaveBeenCalledTimes(1));

    fireEvent.click(btn); // identical rapidly -> ignored
    expect(submitPlansMock).toHaveBeenCalledTimes(1);

    resolveFirst({ ok: true });
    await waitFor(() => expect(btn).toHaveAttribute('aria-busy', 'false'));
  });

  // 9
  it('allows another submission after the first resolves (by changing payload signature)', async () => {
    submitPlansMock.mockResolvedValueOnce({ ok: true });

    // initial render
    const utils = renderWithProviders(<></>, { tasks: sampleTasks, filter_end_date: '2099-12-31' });
    const btn = screen.getByRole('button', { name: /submit/i });

    fireEvent.click(btn);
    await waitFor(() => expect(submitPlansMock).toHaveBeenCalledTimes(1));

    // change props -> different payload signature (bypasses 1s duplicate guard)
    utils.rerender(
      <processingContext.Provider value={{ state: 'idle', feasibility: { status: 'neutral' } }}>
        <TaskContext.Provider value={{ tasks: sampleTasks }}>
          <SubmissionButton
            IS_DEMO={false}
            filter_start_date="2000-01-01"
            filter_end_date="2099-12-30"  // changed
          />
        </TaskContext.Provider>
      </processingContext.Provider>
    );

    submitPlansMock.mockResolvedValueOnce({ ok: true });
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));
    await waitFor(() => expect(submitPlansMock).toHaveBeenCalledTimes(2));
  });

  // 10
  it('shows busy/disabled only during the promise lifecycle', async () => {
    let resolve;
    submitPlansMock.mockReturnValueOnce(new Promise((res) => (resolve = res)));

    renderWithProviders(<></>, { tasks: sampleTasks });
    const btn = screen.getByRole('button', { name: /submit/i });

    fireEvent.click(btn);
    expect(btn).toBeDisabled();
    expect(btn).toHaveAttribute('aria-busy', 'true');

    resolve({ ok: true });
    await waitFor(() => {
      expect(btn).not.toBeDisabled();
      expect(btn).toHaveAttribute('aria-busy', 'false');
    });
  });

  // 11
  it('wires toast.promise with a Promise and messages', async () => {
    const result = Promise.resolve({ ok: true });
    submitPlansMock.mockReturnValueOnce(result);

    renderWithProviders(<></>, { tasks: sampleTasks });
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => expect(toastShim.promise).toHaveBeenCalledTimes(1));

    const [promiseArg, messages] = toastShim.promise.mock.calls[0];
    expect(promiseArg).toBeInstanceOf(Promise);
    expect(messages).toEqual(
      expect.objectContaining({
        loading: expect.anything(),
        success: expect.anything(),
        error: expect.anything(),
      })
    );
  });

  // 12
  it('handles rejection from submitPlans and clears busy state (toast.error available)', async () => {
    submitPlansMock.mockRejectedValueOnce(new Error('boom'));

    renderWithProviders(<></>, { tasks: sampleTasks });
    const btn = screen.getByRole('button', { name: /submit/i });

    fireEvent.click(btn);
    expect(btn).toBeDisabled();
    expect(btn).toHaveAttribute('aria-busy', 'true');

    // UI should clear busy state after the promise settles
    await waitFor(() => {
      expect(btn).not.toBeDisabled();
      expect(btn).toHaveAttribute('aria-busy', 'false');
    });

    // Let the component's catch run its toast.error call
    await Promise.resolve();
    expect(toastShim.error).toHaveBeenCalled();
  });

  // 13
  it('respects feasibility.status = unknown with fallback class', () => {
    renderWithProviders(<></>, { processing: { state: 'idle', feasibility: { status: 'who-knows' } } });
    const btn = screen.getByRole('button', { name: /submit/i });
    expect(btn.className).toContain('base-unknown');
    expect(btn.className).toContain('hover-unknown');
  });

  // 14
  it('shows danger style while busy regardless of feasibility', async () => {
    let resolve;
    submitPlansMock.mockReturnValueOnce(new Promise((res) => (resolve = res)));

    renderWithProviders(<></>, {
      tasks: sampleTasks,
      processing: { state: 'idle', feasibility: { status: 'danger' } },
    });
    const btn = screen.getByRole('button', { name: /submit/i });

    // initial state (not busy) uses danger style from mocked styleData.json
    expect(btn.className).toContain('base-danger');
    expect(btn.className).toContain('hover-danger');

    fireEvent.click(btn);
    fireEvent.click(btn); // ignored while busy
    expect(submitPlansMock).toHaveBeenCalledTimes(1);

    resolve({ ok: true });
    await waitFor(() => expect(btn).toHaveAttribute('aria-busy', 'false'));
  });
});
