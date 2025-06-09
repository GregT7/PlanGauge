import { TableCell } from "@/components/ui/table";

const TimeInput = ({task, updateTaskField, className}) => {

    return (
        <TableCell className={className}>
                <input
                type="number"
                value={task.time_estimation === 0 ? '' : task.time_estimation}
                onChange={(e) => updateTaskField(task.id, 'time_estimation', Number(e.target.value))}
                onWheel={(event) => event.currentTarget.blur()}
                className="text-left px-2 w-full h-full bg-transparent outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
        </TableCell>
    );
};

export default TimeInput;