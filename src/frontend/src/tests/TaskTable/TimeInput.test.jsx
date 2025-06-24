import { expect, it, describe } from 'vitest';
import userEvent from '@testing-library/user-event';
import { screen, render } from '@testing-library/react';
import TimeInput from "@/components/TaskTable/TimeInput";
import { useState } from 'react';

const TestWrapper = ({ defaultTask }) => {
  const [task, setTask] = useState(defaultTask);

  const updateTaskField = (id, field, value) => {
    setTask((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return <TimeInput task={task} updateTaskField={updateTaskField} />;
};


// const TimeInput = ({ task = { id: Date.now(), time_estimation: 0 }, updateTaskField = () => {}, className }) => {
describe("TimeInput unit testing", () => {
    it("passes snapshot test", () => {
        const task = {id: 1, time_estimation: 10}
        const { container } = render(<TimeInput task={task} onChange={() => {}}/>);
        expect(container).toMatchSnapshot();
    });

    it("renders when no props are passed", () => {
        const { container } = render(<TimeInput/>);
        expect(container).toBeInTheDocument();
    });

    it ("updates state when user enters an integer", async () => {
        const task = {id: 1, time_estimation: 10}
        render(<TestWrapper defaultTask={task}/>)

        const user = userEvent.setup();
        const numInput = screen.getByRole('spinbutton')
        await user.type(numInput, '567');
        expect(numInput).toHaveValue(10567);
    });

    it ("does not update state when user enters a non-integer", async () => {
        const task = {id: 1, time_estimation: 10}
        render(<TestWrapper defaultTask={task}/>)

        const user = userEvent.setup();
        const numInput = screen.getByRole('spinbutton')
        await user.type(numInput, 'aa123aabc456');
        expect(numInput).toHaveValue(10123456);
    });
});