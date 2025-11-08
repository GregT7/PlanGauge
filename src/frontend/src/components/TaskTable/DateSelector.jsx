import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../ui/popover"
import { Calendar } from "../ui/calendar";
import { TableCell } from "../ui/table";
import { parse, isValid, format } from "date-fns";


const DateSelector = ({task, onSelect, field, className=""}) => {
  const rawDate = task?.[field];
  const parsedDate = typeof rawDate === 'string' ? parse(rawDate, 'M/d/yyyy', new Date()) : rawDate;
  const validDate = parsedDate instanceof Date && isValid(parsedDate);
  const dateText = validDate ? format(parsedDate, 'MMMM d, yyyy') : "\u00A0";

  return (
    <TableCell className={className}>
      <Popover>
        <PopoverTrigger className="w-full h-full text-left cursor-pointer"> {/* hover:bg-amber-600 */ }
          <span className="px-2 py-2 wrap-normal">{dateText}</span> 
        </PopoverTrigger>
        <PopoverContent>
        <Calendar
          mode="single"
          selected={dateText}
          onSelect={onSelect}
          initialFocus
        />
        </PopoverContent>
      </Popover>

    </TableCell>
  );
};


export default DateSelector;

