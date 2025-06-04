import { useEffect, useState } from 'react';
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import CalendarPopup from "@/components/CalendarPopup";

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
    task_id: 1,
    name: 'Plan Tool p58',
    category: 'Career',
    due_date: '06/03/2025',
    start_date: '06/01/2025',
    time_estimation: "90",
  },
  {
    task_id: 2,
    name: 'Update CV p6',
    category: 'career',
    due_date: '06/25/2025',
    start_date: '06/22/2025',
    time_estimation: "45",
  },
  {
    task_id: 3,
    name: 'Plan Japan trip p2',
    category: 'life',
    due_date: '07/06/2025',
    start_date: '06/12/2025',
    time_estimation: "90",
  },
];

function TestTable2() {
  const [tasks, setTasks] = useState(initial_tasks);
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
      task_id: Date.now(),
      name: '',
      category: '',
      due_date: '',
      start_date: '',
      time_estimation: '',
    };
    setTasks([...tasks, newTask]);
  };

  const toggleSelection = (task_id) => {
    setSelectedTaskIds((prev) => {
      const next = new Set(prev);
      if (next.has(task_id)) {
        next.delete(task_id);
      } else {
        next.add(task_id);
      }
      return next;
    });
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.key === 'Delete' || e.key === 'Backspace') && selectedTaskIds.size > 0) {
        e.preventDefault();
        setTasks((prev) => prev.filter((task) => !selectedTaskIds.has(task.task_id)));
        setSelectedTaskIds(new Set());
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedTaskIds]);

  const updateTaskField = (task_id, field, value) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.task_id === task_id ? { ...task, [field]: value } : task
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
            const isSelected = selectedTaskIds.has(task.task_id);
            return (
              <TableRow
                key={task.task_id}
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
                      onCheckedChange={() => toggleSelection(task.task_id)}
                    />
                  </div>
                </td>

                <TableCell className="w-[40%] px-4 py-2 text-left border border-gray-500">
                  <input
                    type="text"
                    value={task.name}
                    onChange={(e) => updateTaskField(task.task_id, 'name', e.target.value)}
                    className="w-full bg-transparent outline-none"
                  />
                </TableCell>

                <TableCell className="w-[15%] px-4 py-2 text-left border border-gray-500">
                  <input
                    type="text"
                    value={task.category}
                    onChange={(e) => updateTaskField(task.task_id, 'category', e.target.value)}
                    className="w-full bg-transparent outline-none"
                  />
                </TableCell>

                <TableCell className="w-[15%] px-4 py-2 text-left border border-gray-500">
                  <CalendarPopup
                    date={task.due_date}
                    onChange={(val) => updateTaskField(task.task_id, "due_date", val)}
                    isOpen={openPopover[`${task.task_id}-due_date`] || false}
                    onOpenChange={(isOpen) => setPopoverOpen(task.task_id, "due_date", isOpen)}
                  />
                </TableCell>

                <TableCell className="w-[15%] px-4 py-2 text-left border border-gray-500">
                  <CalendarPopup
                    date={task.start_date}
                    onChange={(val) => updateTaskField(task.task_id, "start_date", val)}
                    isOpen={openPopover[`${task.task_id}-start_date`] || false}
                    onOpenChange={(isOpen) => setPopoverOpen(task.task_id, "start_date", isOpen)}
                  />
                </TableCell>

                <TableCell className="w-[15%] px-4 py-2 text-left border border-gray-500">
                  <input
                    type="number"
                    value={task.time_estimation}
                    onChange={(e) => updateTaskField(task.task_id, 'time_estimation', e.target.value)}
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