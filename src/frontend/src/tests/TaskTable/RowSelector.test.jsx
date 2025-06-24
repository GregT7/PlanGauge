import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import RowSelector from '@/components/TaskTable/RowSelector';

const TestWrapper = ({newTask}) => {
    const [task, setTask] = useState(newTask);

    const handleSelection = () => {
        setTask((prev) => (
            {
                ...prev,
                ["selected"] : !task.selected
            }
        ));
    }

    return <RowSelector selected={task.selected} onCheckedChange={handleSelection}/>
}

describe("RowSelector unit testing", () => {
    it("passes snapshot test", () => {
        const { container } = render(<RowSelector/>)
        expect(container).toMatchSnapshot();
    });

    it("renders with no valid prompts", () => {
        const { container } = render(<RowSelector selected={"String123"} onCheckedChange={"abc"}/>)
        expect(container).toBeInTheDocument();
    })

    it("toggles state when clicked twice (off --> on --> off)", async () => {
        render(<TestWrapper newTask={{'selected': false}}/>)

        const user = userEvent.setup();
        const button = screen.getByRole("checkbox");
        await user.click(button);
        expect(button).toHaveAttribute('data-state', 'checked');

        await user.click(button);
        expect(button).toHaveAttribute('data-state', 'unchecked');
    })
});