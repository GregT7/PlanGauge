import { describe, expect, it } from "vitest";

import { render, screen, within } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import DateSelector from "../components/DateSelector";
import { useState } from "react"
import { format } from "date-fns";

// {task, onSelect, field, className=""}
const TestWrapper = ({field, defaultTask}) => {
    const [task, setTask] = useState(defaultTask);

    const handleTaskUpdate = (newDate) => {
        setTask(prev => (
            {
                ...prev,
                [field]: newDate
            }
        )
    )
    }

    return <DateSelector task={task} field={field} onSelect={handleTaskUpdate}/>
}

describe("DateSelector unit testing", () => {
    it("passes snapshot test", () => {
        const task = {'due_date':'6/16/2025'};
        const field = 'due_date';
        const onSelect = () => {};
        const { container } = render(<DateSelector task={task} field={field} onSelect={onSelect}/>);
        expect(container).toMatchSnapshot();
    });

    it("renders when no props are passed", () => {
        render(<DateSelector/>);
        expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it("renders when no field prop is passed", () => {
        const task = {'due_date': '6/16/2025'};
        render(<DateSelector task={task}/>);
        expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it("renders when no task prop is passed", () => {
        const field = 'due_date';
        render(<DateSelector field={field}/>);
        expect(screen.getByRole('button')).toBeInTheDocument();
    });



    it("calls onSelect passed as props to DateSelector component when a date is selected", async () => {
        const user = userEvent.setup();
        const task = {'due_date':'6/16/2025'};
        const field = 'due_date';
        const dateObj = new Date();
        const expectedMonth = format(dateObj, "LLLL yyyy");
        const onSelect = vi.fn();

        render(<DateSelector task={task} field={field} onSelect={onSelect}/>);

        const calendarLaunchButton = screen.getByRole("button");
        await user.click(calendarLaunchButton);

        const body = within(document.body);
        await body.findByText(expectedMonth);

        const gridcells = body.getAllByRole("gridcell");
        const targetDay = gridcells.find((cell) =>
            cell.textContent.trim() === "20"
        );
        await user.click(targetDay);

        expect(onSelect).toHaveBeenCalledTimes(1);
    });

    it("updates the task state when a new day is selected from the calendar popup", async () => {
        const user = userEvent.setup();
        const field = "start_date";
        const defaultTask = {'start_date': '3/14/1932'};
        const dateObj = new Date();

        const expectedMonth = format(dateObj, "LLLL yyyy");
        const expectedDate = format(dateObj, 'MMMM d, yyyy');

        render(<TestWrapper field={field} defaultTask={defaultTask}/>);

        const launchButton = screen.getByRole("button");
        await user.click(launchButton);
        
        const body = within(document.body);
        await body.findByText(expectedMonth);

        const gridcells = body.getAllByRole("gridcell");
        const targetDay = gridcells.find((cell) =>
            cell.textContent.trim() === dateObj.getDate().toString()
        );

        await user.click(targetDay);
        expect(screen.getByText(expectedDate)).toBeInTheDocument();
    });

    
});