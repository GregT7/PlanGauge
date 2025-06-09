import { TableCell } from "@/components/ui/table";

const NameInput = ({task, updateTaskField, className}) => {

    return (
        <TableCell className={className}>
            <input 
            type="text" 
            value={task.name} 
            onChange={(e) => {updateTaskField(task.id, "name", e.target.value)}}
            className="outline-none w-full h-full bg-transparent text-left px-2"
            />
        </TableCell>
    );
}

export default NameInput;