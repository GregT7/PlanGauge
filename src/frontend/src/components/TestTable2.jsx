import { useEffect, useState, useContext  } from 'react';
import { TaskContext } from "./TaskContext";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";

import {
  Table,
  TableBody,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table";

const initial_tasks = [
  {
    id: 1,
    name: 'Plan Tool p58',
    category: 'Career',
    due_date: '06/03/2025',
    start_date: '06/01/2025',
    time_estimation: "90",
  },
  {
    id: 2,
    name: 'Update CV p6',
    category: 'career',
    due_date: '06/25/2025',
    start_date: '06/22/2025',
    time_estimation: "45",
  },
  {
    id: 3,
    name: 'Plan Japan trip p2',
    category: 'life',
    due_date: '07/06/2025',
    start_date: '06/12/2025',
    time_estimation: "90",
  },
];

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
    <TableCell>
      <Checkbox checked={selected} onCheckedChange={onCheckedChange}/>
    </TableCell>
  );
};

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

function TestTable2() {
  const {tasks, setTasks} = useContext(TaskContext);
  const [selectedTaskIds, setSelectedTaskIds] = useState(new Set());
  const [openPopover, setOpenPopover] = useState({});

  const setPopoverOpen = (taskId, field, isOpen) => {
    setOpenPopover((prev) => ({
      ...prev,
      [`${taskId}-${field}`]: isOpen,
    }));
  };

  const handleAddTask = () => {
    const newTask = {
      id: Date.now(),
      name: '',
      category: '',
      due_date: '',
      start_date: '',
      time_estimation: '',
    };
    setTasks([...tasks, newTask]);
  };

  const toggleSelection = (id) => {
    setSelectedTaskIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.key === 'Delete' || e.key === 'Backspace') && selectedTaskIds.size > 0) {
        e.preventDefault();
        setTasks((prev) => prev.filter((task) => !selectedTaskIds.has(task.id)));
        setSelectedTaskIds(new Set());
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedTaskIds]);

  const updateTaskField = (id, field, value) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, [field]: value } : task
      )
    );
  };

  return (
    <div className="w-[75%] mx-auto -translate-x-2">
      <Table className="table-fixed w-full">
        <TableHeader>
          <TableRow>
            <th className="w-[3%] px-1 py-2 text-center bg-transparent"></th>
            <TableHead className="w-[40%] px-4 py-2 text-left border border-gray-500">Task Name</TableHead>
            <TableHead className="w-[15%] px-4 py-2 text-left border border-gray-500">Category</TableHead>
            <TableHead className="w-[15%] px-4 py-2 text-left border border-gray-500">Due Date</TableHead>
            <TableHead className="w-[15%] px-4 py-2 text-left border border-gray-500">Start Date</TableHead>
            <TableHead className="w-[15%] px-4 py-2 text-left border border-gray-500">Time Estimation</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {tasks.map((task) => {
            const isSelected = selectedTaskIds.has(task.id);
            return (
              <TableRow
                key={task.id}
                className={cn(
                  "transition-colors group",
                  isSelected ? "bg-blue-500/20" : "hover:bg-muted"
                )}
              >
                <td
                  className={cn(
                    "w-[3%] px-1 py-2 text-center",
                    "bg-background dark:bg-[#09090b]",
                    "!hover:bg-transparent group-hover:!bg-transparent"
                  )}
                >
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                    <Checkbox
                      checked={isSelected}
                      onCheckedChange={() => toggleSelection(task.id)}
                    />
                  </div>
                </td>

                <TableCell className="w-[40%] px-4 py-2 text-left border border-gray-500">
                  <input
                    type="text"
                    value={task.name}
                    onChange={(e) => updateTaskField(task.id, 'name', e.target.value)}
                    className="w-full bg-transparent outline-none"
                  />
                </TableCell>

                <TableCell className="w-[15%] px-4 py-2 text-left border border-gray-500">
                  <input
                    type="text"
                    value={task.category}
                    onChange={(e) => updateTaskField(task.id, 'category', e.target.value)}
                    className="w-full bg-transparent outline-none"
                  />
                </TableCell>

                <TableCell className="w-[15%] px-4 py-2 text-left border border-gray-500">
                  <CalendarPopup
                    date={task.due_date}
                    onChange={(val) => updateTaskField(task.id, "due_date", val)}
                    isOpen={openPopover[`${task.id}-due_date`] || false}
                    onOpenChange={(isOpen) => setPopoverOpen(task.id, "due_date", isOpen)}
                  />
                </TableCell>

                <TableCell className="w-[15%] px-4 py-2 text-left border border-gray-500">
                  <CalendarPopup
                    date={task.start_date}
                    onChange={(val) => updateTaskField(task.id, "start_date", val)}
                    isOpen={openPopover[`${task.id}-start_date`] || false}
                    onOpenChange={(isOpen) => setPopoverOpen(task.id, "start_date", isOpen)}
                  />
                </TableCell>

                <TableCell className="w-[15%] px-4 py-2 text-left border border-gray-500">
                  <input
                    type="number"
                    value={task.time_estimation}
                    onChange={(e) => updateTaskField(task.id, 'time_estimation', e.target.value)}
                    className="w-full bg-transparent outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>

        <TableFooter className="!bg-transparent">
          <TableRow className="bg-transparent">
            <td className="w-[3%] p-2 bg-transparent" />
            <TableCell colSpan={5} className="p-0 bg-muted/50 hover:bg-muted transition">
              <button
                className="w-full h-full px-4 py-2 text-left text-sm text-gray-400"
                onClick={handleAddTask}
              >
                + Add Task
              </button>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}

export default TestTable2;