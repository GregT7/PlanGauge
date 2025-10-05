import { useContext, useEffect, useMemo } from 'react';
import { TaskContext } from "../../contexts/TaskContext";
import RowSelector from "./RowSelector";
import CategorySelector from "./CategorySelector";
import DateSelector from './DateSelector';
import NameInput from "./NameInput";
import TimeInput from "./TimeInput";
import CustomFooter from "./CustomFooter";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import categories from "@/utils/categories";
import determineStatusStyle from '@/utils/determineStatusStyle';
import { processingContext } from '@/contexts/ProcessingContext';

function TaskTable() {
  const { tasks, setTasks, timeSum } = useContext(TaskContext);

  // 🔻 Handle Backspace/Delete key to remove selected tasks
  useEffect(() => {
    const handleKeyDown = (e) => {
      const { key } = e;
      const exists = tasks.some(task => task.selected);
      if (exists && (key === "Delete" || key === "Backspace")) {
        setTasks(prev => prev.filter(task => !task.selected));
        e.preventDefault();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [tasks, setTasks]);

    // ✅ 🔻 Handle deselection when clicking outside row selectors
  useEffect(() => {
    const handleMouseDown = (e) => {
      // If user clicked inside *any* RowSelector, skip
      const isInsideRowSelector = e.target.closest('[data-role="row-selector"]');
      const isInsideDropdownOrDate = e.target.closest('[data-role="popup"]');

      if (isInsideRowSelector || isInsideDropdownOrDate) return;

      // Defer to next event loop tick to avoid race condition with onChange
      setTimeout(() => {
        const anySelected = tasks.some(task => task.selected);
        if (anySelected) {
          setTasks(prev => prev.map(task => ({ ...task, selected: false })));
        }
      }, 0);
    };

    document.addEventListener('mousedown', handleMouseDown);
    return () => document.removeEventListener('mousedown', handleMouseDown);
  }, [tasks, setTasks]);


  const updateTaskField = (id, field, val) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, [field]: val } : task
      )
    );
  };

  const handleAddTask = () => {
    const newTask = {
      id: Date.now(),
      name: '',
      category: '',
      due_date: '',
      start_date: '',
      time_estimation: 0,
      selected: null
    };
    setTasks([...tasks, newTask]);
  };

  const hoverColor = "hover:bg-stone-800";
  const selectColor = "bg-cyan-600/50";
  const applyHoverSelectStyles = (task) => task.selected ? selectColor : hoverColor;

  const { feasibility } = useContext(processingContext);
  const systemStyle = determineStatusStyle(feasibility?.status, "border")
  const styling = `w-[73.5%] mx-auto border-2 border-dashed pr-9 ${systemStyle}`
  
  return (
    <div className={styling}>
      <h1 className="text-2xl py-4 text-left pl-8">Task Table</h1>
      <Table className="w-full">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[3.5%]"></TableHead>
            <TableHead className="text-left px-2 border border-stone-600 w-[30%]">Task Name</TableHead>
            <TableHead className="text-left px-2 border border-stone-600 w-[12.5%]">Category</TableHead>
            <TableHead className="text-left px-2 border border-stone-600 w-[12.5%]">Due Date</TableHead>
            <TableHead className="text-left px-2 border border-stone-600 w-[12.5%]">Start Date</TableHead>
            <TableHead className="text-left px-2 border border-stone-600 w-[2.5%]">Time</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.map((task) => (
            <TableRow key={task.id}>
              <RowSelector
                selected={task.selected}
                onCheckedChange={(val) => updateTaskField(task.id, "selected", val)}
                data-role="row-selector"
              />
              <NameInput
                task={task}
                updateTaskField={updateTaskField}
                className={`border border-stone-600 ${applyHoverSelectStyles(task)}`}
              />
              <CategorySelector
                task={task}
                onChange={(val) => updateTaskField(task.id, "category", val)}
                className={`px-2 border border-stone-600 ${applyHoverSelectStyles(task)}`}
                categories={categories}
              />
              <DateSelector
                task={task}
                onSelect={(val) => updateTaskField(task.id, "due_date", val)}
                field={"due_date"}
                className={`h-10 text-left border border-stone-600 ${applyHoverSelectStyles(task)}`}
              />
              <DateSelector
                task={task}
                onSelect={(val) => updateTaskField(task.id, "start_date", val)}
                field={"start_date"}
                className={`h-10 text-left border border-stone-600 ${applyHoverSelectStyles(task)}`}
              />
              <TimeInput
                task={task}
                updateTaskField={updateTaskField}
                className={`h-10 text-left border border-stone-600 ${applyHoverSelectStyles(task)}`}
              />
            </TableRow>
          ))}
        </TableBody>
        <CustomFooter handleAddTask={handleAddTask} calcSum={timeSum} />
      </Table>
    </div>
  );
}

export default TaskTable;
