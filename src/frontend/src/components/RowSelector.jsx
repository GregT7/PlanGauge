import { Checkbox } from "@/components/ui/checkbox";
import { TableCell } from "@/components/ui/table";


const RowSelector = ({ selected, onCheckedChange }) => {
  return (
    <TableCell>
      <Checkbox checked={selected} onCheckedChange={onCheckedChange}/>
    </TableCell>
  );
};

export default RowSelector;