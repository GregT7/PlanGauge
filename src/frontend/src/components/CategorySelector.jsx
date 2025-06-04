
import * as React from "react"
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
import { TaskContext } from "./TaskContext";



const CategorySelector = ({task, onChange}) => {
  const [position, setPosition] = React.useState("bottom")
  const {tasks} = useContext(TaskContext);
  return (
    <TableCell>
        <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <span>{task.category}</span>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
            <DropdownMenuRadioGroup value={task.category} onValueChange={onChange}>
            {/* <DropdownMenuRadioGroup value={position} onValueChange={setPosition}> */}
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