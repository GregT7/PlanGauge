import { TableCell } from "./ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
// import isValidTask from "../utils/validateTask";
import createNewTask from "../utils/createNewTask";



    // "Career": "bg-amber-600",
const CategorySelector = ({task, onChange, categories={"Default Category": "bg-red-600"}, className=""}) => {

  return (
    <TableCell className={className}>
        <DropdownMenu >
        <DropdownMenuTrigger className="cursor-pointer w-full h-full text-left">
            <span className={`cursor-pointer ${categories[task.category]} px-1.5 py-0.5 rounded-sm`}>
              {task.category}
            </span>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
            <DropdownMenuRadioGroup value={task.category} onValueChange={onChange}>
              {
                Object.entries(categories).map(([key, value]) => (
                  <DropdownMenuRadioItem key={key} value={key} className={value}>{key}</DropdownMenuRadioItem>
                ))
              }
            </DropdownMenuRadioGroup>
        </DropdownMenuContent>
        </DropdownMenu>
    </TableCell>
  )
}


export default CategorySelector;