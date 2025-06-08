import { Checkbox } from "@/components/ui/checkbox";
import { TableCell } from "@/components/ui/table";

const RowSelector = ({ selected, onCheckedChange }) => {
    const selectedStyle = {
        cell: "bg-blue-500/20",
        checkbox: 'visible'
    }

    const unselectedStyle = {
        cell: "bg-transparent",
        checkbox: "invisible group-hover:visible"
    }


  return (
    // <TableCell className={`${selected ? selectedStyle.cell : unselectedStyle.cell} transition-opacity duration-200`}>
    //     <Checkbox checked={selected} onCheckedChange={handleSelection}
    //     className={`${selected ? selectedStyle.checkbox : unselectedStyle.checkbox} transition-opacity duration-200`}/>
    // </TableCell>
    <TableCell>
      <Checkbox checked={selected} onCheckedChange={onCheckedChange}/>
    </TableCell>
  );
};

export default RowSelector;
