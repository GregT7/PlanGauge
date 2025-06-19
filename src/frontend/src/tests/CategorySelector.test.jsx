import { describe, expect, it } from 'vitest';
import { render, screen} from '@testing-library/react';
import "../components/CategorySelector";
import userEvent from "@testing-library/user-event";
import CategorySelector from '../components/CategorySelector';
import default_tasks from '../../public/default_tasks';
import { useState } from "react"
import {
  Table,
  TableBody,
  TableRow,
} from "@/components/ui/table";


const TestWrapper = ({categories}) => {
    const [task, setTask] = useState({'category': 'Career'});
    
    const updateTask = (newSelection) => {
        setTask({'category': newSelection});
    }

    return (<CategorySelector onChange={updateTask} task={task} categories={categories}/>)
}

describe("category selector unit testing", () => {
    it("renders an individual category", () => {
        render(<CategorySelector task={{'category': 'Life'}}/>)
        expect(screen.getByRole("button")).toBeInTheDocument();
    });

    it("renders when categories prop is missing", () => {
        render(<CategorySelector task={{'category': 'Career'}}/>)
        expect(screen.getByRole("button")).toBeInTheDocument();
    });

    it("renders when task prop is missing", () => {
        render(<CategorySelector categories={{'Career':'bg-amber-900'}}/>);
        expect(screen.getByRole("button")).toBeInTheDocument();
    });

    it("renders when both task prop and categories prop is missing", () => {
        render(<CategorySelector/>);
        expect(screen.getByRole("button")).toBeInTheDocument();
    });

    it("displays the selected category on render", () => {
        const osTask = {'category': 'Operating Systems'};
        const osCategory = {'Operating Systems': 'bg-amber-500'};
        render(<CategorySelector task={osTask} categories={osCategory}/>)
        expect(screen.getByRole("button")).toHaveTextContent('Operating Systems');
    })

    it("applies the correct color styling to the selected category with no popup opened", () => {
        const categories = {'Cryptography': 'bg-red-500'};
        const task={'category': 'Cryptography'};

        render(<CategorySelector task={task} categories={categories}/>)
        const categorySpan = screen.getByText('Cryptography');
        expect(categorySpan).toHaveClass('bg-red-500');
    });

    it("applies all category options to selection popup when opened", async () => {
        const categories = {'Cryptography': 'bg-red-500', 'Operating Systems': 'bg-indigo-300', 'Team Projects': 'bg-slate-500'}
        const task={'category': 'Cryptography'};

        const user = userEvent.setup();

        render(<CategorySelector categories={categories} task={task}/>)
        await user.click(screen.getByRole('button'));

        const radioMenuItems = await screen.findAllByRole("menuitemradio");
        const textArray = [];
        const catKeys = Object.keys(categories);

        for (let item in radioMenuItems) {
            textArray.push(radioMenuItems[item].textContent)
        }

        expect(textArray.sort()).toEqual(catKeys.sort());
    });

    it("applies the correct styling to all menu radio items when popup is opened", async () => {
        const categories = {'Cryptography': 'bg-red-500', 'Operating Systems': 'bg-indigo-300', 'Team Projects': 'bg-slate-500'};
        const task={'category': 'Cryptography'};

        render(<CategorySelector categories={categories} task={task}/>)
        const user = userEvent.setup();
        await user.click(screen.getByRole("button"));

        const radioMenuItems = await screen.findAllByRole('menuitemradio');
        const categoryValues = Object.values(categories);
        const classArray = [];


        for (let key in radioMenuItems) {
            const classString = radioMenuItems[key].className;
            for (let style in categoryValues) {
                if (classString.includes(categoryValues[style])) {
                    classArray.push(categoryValues[style]);
                }
            }
        }

        expect(categoryValues.sort()).toEqual(classArray.sort());

    });

    it("renders as many category selectors as there are tasks in default_tasks file", () => {
        const numTasks = default_tasks.length;
        render(
            <Table>
                <TableBody>
                    {default_tasks.map(task => (
                        <TableRow key={task.id}>
                            <CategorySelector task={task}/>
                        </TableRow>       
                    ))}
                </TableBody>
            </Table>
        );

        const catSelectors = screen.getAllByRole("button");
        expect(catSelectors).toHaveLength(numTasks);
    });

    it("onChange gets called when a category menu radio item is selected", async () => {
        const user = userEvent.setup();
        const task = {'category': 'Career'}
        const categories = {'Career': 'bg-amber-500',"Chore": "bg-yellow-600"};
        const mockOnChange = vi.fn()
        render(<CategorySelector task={task} categories={categories} onChange={mockOnChange}/>)
        
        const triggerButton = screen.getByRole("button");
        await user.click(triggerButton);
        const choreItem = await screen.findByRole("menuitemradio", { name: "Chore" });
        await user.click(choreItem);
        expect(mockOnChange).toHaveBeenCalledWith("Chore")

    });

    it ("updates the category once a new option is selected", async () => {
        const user = userEvent.setup();

        const categories = {'Career': 'bg-amber-500',"Chore": "bg-yellow-600"};

        render(<TestWrapper categories={categories} />);
        const triggerButton = screen.getByRole("button");
        await user.click(triggerButton);

        const choreItem = await screen.findByRole("menuitemradio", { name: "Chore" });
        await user.click(choreItem);
        expect(triggerButton).toHaveTextContent("Chore");
    });
})