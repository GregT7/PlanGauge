import NameInput from "../components/NameInput";
import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest";
import userEvent from "@testing-library/user-event";
import { useState } from "react"

const TestWrapper = ({ defaultTask }) => {
  const [task, setTask] = useState(defaultTask);

  const updateTaskField = (id, field, value) => {
    setTask((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return <NameInput task={task} updateTaskField={updateTaskField} />;
};


describe("NameInput unit tests", () => {
    it("passes snapshot test", () => {
        const task = {'name': 'Plan tool p88'};
        const updateTaskField = () => {};
        const { container } = render(<NameInput task={task} updateTaskField={updateTaskField}/>)
        expect(container).toMatchSnapshot();
    });

    it("renders with no props passed", () => {
        const {container} = render(<NameInput/>);
        expect(container).toBeInTheDocument();
    });

    it("renders with an empty task passed", () => {
        const { container } = render(<NameInput task={{}}/>)
        expect(container).toBeInTheDocument();
    })

    it("renders with a valid task prop and no updateTaskField function prop", () => {
        const { container } = render(<NameInput task={{'name': 'Plan tool p88'}}/>)
        expect(container).toBeInTheDocument();
    })

    it("renders with a bad updateTaskField prop passed", () => {
        const { container } = render(<NameInput task={{'name': 'Plan tool p88'}} updateTaskField={5}/>)
        expect(container).toBeInTheDocument();
    });

    it("updates state when the cell is selected and the user types something in", async () => {
    const user = userEvent.setup();
    render(<TestWrapper defaultTask={{ id: 1, name: "Plan tool p88" }} />);

    const textbox = screen.getByRole("textbox");
    await user.clear(textbox)
    await user.click(textbox);
    await user.type(textbox, "Update resume");

    expect(textbox).toHaveValue("Update resume");
    });

    it("does not update state when the cell is NOT selected and the user types something in", async () => {
        const user = userEvent.setup();
        const {container} = render(<TestWrapper defaultTask={{ id: 1, name: "Plan tool p88" }} />);

        const textbox = screen.getByRole("textbox");
        await user.type(container, "Update resume");

        expect(textbox).toHaveValue("Plan tool p88");
    });
});