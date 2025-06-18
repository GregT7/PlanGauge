import { Checkbox } from "@/components/ui/checkbox";
import { TableCell } from "@/components/ui/table";


const RowSelector = ({ selected, onCheckedChange }) => {
  const isSelected = typeof selected === "boolean" ? selected : false;
  const handleChange = typeof onCheckedChange === "function" ? onCheckedChange : () => {};

  return (
    <TableCell data-role="row-selector">
      <Checkbox
        checked={selected}
        onCheckedChange={onCheckedChange}
        className="cursor-pointer"
      />
    </TableCell>
  );
};


export default RowSelector;