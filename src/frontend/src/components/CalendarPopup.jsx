import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";

const CalendarPopup = ({ date, onChange, isOpen, onOpenChange }) => {
  return (
    <Popover open={isOpen} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <button className="w-full text-left bg-transparent outline-none text-sm text-white/80">
          {date ? format(new Date(date), "MM/dd/yyyy") : "\u00A0"}
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date ? new Date(date) : undefined}
          onSelect={(selected) => {
            if (selected) {
              onChange(format(selected, "MM/dd/yyyy"));
              onOpenChange(false); // Close popover
            }
          }}
        />
      </PopoverContent>
    </Popover>
  );
};

export default CalendarPopup;