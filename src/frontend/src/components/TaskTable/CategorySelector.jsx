import { TableCell } from "../ui/table"; 
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"

const CategorySelector = ({task, onChange=()=>{}, categories={"Default Category": "bg-red-600"}, className=""}) => {
  const validKey = typeof task?.category === "string" && (task.category in categories || task.category == "");
  const categoryKey = validKey ? task.category : 'Default Category';
  const categoryStyle = categories[categoryKey];

  return (
    <TableCell className={className}>
        <DropdownMenu >
        <DropdownMenuTrigger className="cursor-pointer w-full h-full text-left">
            <span className={`cursor-pointer ${categoryStyle} px-1.5 py-0.5 rounded-sm`}>
              {categoryKey}
            </span>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
            <DropdownMenuRadioGroup value={categoryKey} onValueChange={onChange}>
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