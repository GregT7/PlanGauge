
import * as React from "react";
import categories from "../categories";
import { TableCell } from "./ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useContext  } from "react";
import { TaskContext } from "../contexts/TaskContext";



const CategorySelector = ({task, onChange, className=""}) => {
  const {tasks} = useContext(TaskContext);
  return (
    <TableCell className={className}>
        <DropdownMenu >
        <DropdownMenuTrigger className="cursor-pointer w-full h-full text-left">
            <span className={`cursor-pointer ${categories[task.category]} px-1.5 py-0.5 rounded-sm`}>{task.category}</span>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
            <DropdownMenuRadioGroup value={task.category} onValueChange={onChange}>
            <DropdownMenuRadioItem value="Career">Career</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="Chore">Chore</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="Errand">Errand</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="Therapy">Therapy</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="Life">Life</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="Social">Social</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="Health">Health</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="Productivity">Productivity</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
        </DropdownMenuContent>
        </DropdownMenu>
    </TableCell>
  )
}


export default CategorySelector;