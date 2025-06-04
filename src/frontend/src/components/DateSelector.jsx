import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar";
import { TableCell } from "./ui/table";
import { useState } from "react";
import { format } from "date-fns";


const DateSelector = ({date, setDate}) => {
  
  return (
    <TableCell className="h-10">
      <Popover>
        <PopoverTrigger className="hover:bg-amber-600 w-full h-full text-left">
          <span className="px-4 py-2">{date ? format(new Date(date), "MMMM do, yyyy") : "\u00A0"}</span>
        </PopoverTrigger>
        <PopoverContent>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
        </PopoverContent>
      </Popover>

    </TableCell>
  );
};


export default DateSelector;

