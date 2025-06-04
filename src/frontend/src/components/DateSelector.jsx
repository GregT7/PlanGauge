import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar";
import { TableCell } from "./ui/table";

import { format } from "date-fns";
import { useContext  } from "react";
import { TaskContext } from "./TaskContext";



const DateSelector = ({task, onSelect, field}) => {
  const {tasks} = useContext(TaskContext);


  
  return (
    <TableCell className="h-10">
      <Popover>
        <PopoverTrigger className="hover:bg-amber-600 w-full h-full text-left">
          <span className="px-4 py-2">{task[field] ? format(task[field], "yyyy-MM-dd") : "\u00A0"}</span> 
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

