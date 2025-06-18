import { TableCell } from "@/components/ui/table";

const TimeInput = ({ task = { id: Date.now(), time_estimation: 0 }, updateTaskField = () => {}, className }) => {
  return (
    <TableCell className={className}>
      <input
        type="number"
        value={task.time_estimation === 0 ? "" : task.time_estimation}
        onChange={(e) => {
          const newValue = Number(e.target.value);
          updateTaskField(task.id, 'time_estimation', newValue);
        }}
        onWheel={(event) => event.currentTarget.blur()}
        className="text-left px-2 w-full h-full bg-transparent outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
      />
    </TableCell>
  );
};


export default TimeInput;