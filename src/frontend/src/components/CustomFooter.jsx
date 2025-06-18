import {
  TableCell,
  TableRow,
  TableFooter
} from "@/components/ui/table";

const CustomFooter = ({handleAddTask, calcSum}) => {

    return (
      <TableFooter>
        <TableRow>
          <TableCell/>
          <TableCell colSpan={5} className="h-10 border border-stone-600">
            <button className="text-left hover:bg-stone-800 w-full h-full px-2" onClick={handleAddTask}>+ New Page</button>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell colSpan={5}/>
          <TableCell className="text-right">
            <span className="text-stone-400 px-2">SUM</span>
            <span data-testid="time-display">{String(isNaN(calcSum) ? 0 : calcSum)}</span>
          </TableCell>
        </TableRow>
      </TableFooter>

    );
};

export default CustomFooter;