import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar";
import { TableCell } from "./ui/table";

import { format } from "date-fns";
import { useContext  } from "react";
import { TaskContext } from "../contexts/TaskContext";



const DateSelector = ({task, onSelect, field, className=""}) => {
  const {tasks} = useContext(TaskContext);

  return (
    <TableCell className={className}>
      <Popover>
        <PopoverTrigger className="w-full h-full text-left cursor-pointer"> {/* hover:bg-amber-600 */ }
          <span className="px-2 py-2 wrap-normal">{task[field] ? format(task[field], "MMMM d, yyyy") : "\u00A0"}</span> 
        </PopoverTrigger>
        <PopoverContent>
        <Calendar
          mode="single"
          selected={task[field]}
          onSelect={onSelect}
          initialFocus
        />
        </PopoverContent>
      </Popover>

    </TableCell>
  );
};


export default DateSelector;

