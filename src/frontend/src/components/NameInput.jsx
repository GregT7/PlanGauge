import { TableCell } from "@/components/ui/table";

const NameInput = ({task = {'name': ''}, updateTaskField, className}) => {
    const validName = typeof task?.name === "string";
    const taskName = validName ? task.name : '';
    
    return (
        <TableCell className={className}>
            <input 
            type="text" 
            value={taskName} 
            onChange={(e) => {updateTaskField(task.id, "name", e.target.value)}}
            className="outline-none w-full h-full bg-transparent text-left px-2"
            />
        </TableCell>
    );
}

export default NameInput;