import { describe, expect, it } from "vitest";
import { render, screen, userEvent } from '@testing-library/react';
import DateSelector from "../components/DateSelector";
import { useState } from "react"

// {task, onSelect, field, className=""}
const TestWrapper = ({field}) => {
    defaultTask = {'start_date': '3/14/1932', 'due_date': '8/27/2097'}
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

    it("renders when both props passed with correct due date", () => {
        const task = {'due_date':'6/16/2025'};
        const field = 'due_date';
        render(<DateSelector task={task} field={field}/>);
        expect(screen.getByText("June 16, 2025")).toBeInTheDocument();
    });

    

    
});