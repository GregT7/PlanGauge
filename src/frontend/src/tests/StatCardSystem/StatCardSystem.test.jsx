import { expect, it, describe } from 'vitest';
import { screen, render } from '@testing-library/react';
import StatCardSystem from '@/components/StatCardSystem/StatCardSystem';
import { useMemo, useState } from 'react';
import { TaskContext } from "@/contexts/TaskContext";
import default_tasks from '@/utils/default_tasks';

const ContextWrapper = ({ initial_tasks, children }) => {
    const [tasks, setTasks] = useState(initial_tasks);

    const timeSum = useMemo(() => 
        tasks.reduce((sum, task) => sum + task.time_estimation, 0),
    [tasks]);

    return (
        <TaskContext.Provider value={{tasks, timeSum}}>
            {children}
        </TaskContext.Provider>
    );
};


// Mock cardData imported inside StatCardSystem
vi.mock('@/utils/testCardData', () => {
    const today = new Date();
    return {
        default: [
            { name: 'Monday', ave: 60, std: 10, sum: 0, date: today },
            { name: 'Tuesday', ave: 30, std: 5, sum: 0, date: today },
            { name: 'Saturday', ave: 50, std: 15, sum: 0, date: today },
    ]
    };
});

const mockTasks = [
    { start_date: new Date(), time_estimation: 60 },
    { start_date: new Date(), time_estimation: 30 },
];

const setup = (tasks = mockTasks) => {
  return render(
    <TaskContext.Provider value={{ tasks }}>
      <StatCardSystem />
    </TaskContext.Provider>
  );
};

describe('StatCardSystem', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });


  it('renders the StatCardSystem component', () => {
    setup();
    // expect(screen.getByText(/Stat Card System/i)).toBeInTheDocument();
    screen.debug()
  });

    it("passes a snapshot test", () => {
        const { container } = render(
            <ContextWrapper initial_tasks={default_tasks}>
                <StatCardSystem />
            </ContextWrapper>
        );

        expect(container).toMatchSnapshot(); // <- actual snapshot test
    });

  it('renders StatCards for days matching regex (weekday and weekend rows)', () => {
    setup();

    // The cards should be rendered based on the mocked cardData
    const cards = screen.getAllByTestId('StatCard');
    expect(cards.length).toBeGreaterThanOrEqual(2); // at least for Mon and Tue
  });

  it('renders the StatusCounter', () => {
    setup();
    expect(screen.getByTestId('StatusCounter')).toBeInTheDocument();
  });

  it('renders correct count bubbles in StatusCounter', () => {
    setup();

    const bubbles = screen.getAllByTestId('circle-div');
    expect(bubbles.length).toBe(3); // good, moderate, poor

    // Optionally check class names for styling
    expect(bubbles[0].className).toMatch(/bg-emerald-500/);
    expect(bubbles[1].className).toMatch(/bg-amber-500/);
    expect(bubbles[2].className).toMatch(/bg-rose-500/);
  });

  it('handles no tasks gracefully (no crash, all statuses should be "neutral")', () => {
    setup([]);

    const cards = screen.getAllByTestId('StatCard');
    expect(cards.length).toBeGreaterThan(0);

    const statusTexts = cards.map(card => card.textContent);
    statusTexts.forEach(text => {
      expect(text.toLowerCase()).toContain('status');
    });
  });

  it('correctly applies z-score classification via integration', () => {
    setup([
      {
        start_date: new Date(),
        time_estimation: 90, // force high z-score for poor classification
      },
    ]);

    const cards = screen.getAllByTestId('StatCard');
    const hasPoor = cards.some(card =>
      card.textContent.toLowerCase().includes('poor')
    );
    expect(hasPoor).toBe(true);
  });
});