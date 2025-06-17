import { describe, it, expect } from 'vitest';
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CustomFooter from "../components/CustomFooter";

describe('custom footer unit testing', () => {
    it('does not crash without props', () => {
        render(<CustomFooter />);
        expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('button runs the callback function when clicked', async () => {
        const user = userEvent.setup();
        
        const handleAddTask = vi.fn();
        render(<CustomFooter handleAddTask={handleAddTask}/>);
        await user.click(screen.getByRole('button'));

        expect(handleAddTask).toHaveBeenCalledTimes(1);
    });

    // calcSum prop edge cases -- ensures that component doesn't break if parent
    // passes invalid props
    it('displays 50 for time display when passed as props', () => {
        render(<CustomFooter calcSum={50}/>);
        expect(screen.getByTestId("time-display")).toHaveTextContent(50);
    });

    it('displays 0 for time display when calcSum is 0', () => {
        render(<CustomFooter calcSum={0}/>);
        expect(screen.getByTestId("time-display")).toHaveTextContent("0");
    });
});