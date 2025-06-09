import { useState, useContext, useEffect, useMemo } from 'react';
import { TaskContext } from "../contexts/TaskContext";
import RowSelector from "./RowSelector";
import CategorySelector from "./CategorySelector";
import DateSelector from './DateSelector';
import NameInput from "./NameInput";
import TimeInput from "./TimeInput";
import CustomFooter from "./CustomFooter";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter
} from "@/components/ui/table";


function TaskTable() {
  
  const {tasks, setTasks} = useContext(TaskContext);

  const calcSum = useMemo(() => {
    return tasks.reduce((accumulator, task) => accumulator + task.time_estimation, 0)
  }, [tasks]); 


  useEffect(() => {
    const handleKeyDown = ((e) => {
      const {key} = e;
      const exists = tasks.some(task => task.selected);
      if (exists) {
        if (key === "Delete" || key === "Backspace") {
          setTasks((prev) => 
           prev.filter((task) => !task.selected));
        }
        e.preventDefault();
      }
    });
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  const updateTaskField = (id, field, val) => {
    setTasks((prev) => 
      prev.map((task) => 
        task.id === id ? {...task, [field]: val} : task
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
      time_estimation: '',
      selected: null
    };
    setTasks([...tasks, newTask]);
  }

  const hoverColor = "hover:bg-stone-800";
  const selectColor = "bg-cyan-600/50";
  const applyHoverSelectStyles = (task) => task.selected ? selectColor : hoverColor;

  return (
    <Table className="w-[73.5%] mx-auto">
      <TableHeader >
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
            <RowSelector selected={task.selected}
            onCheckedChange={(val) => updateTaskField(task.id, "selected", val)}/>
            
            <NameInput task={task} updateTaskField={updateTaskField}
            className={`border border-stone-600 ${applyHoverSelectStyles(task)}`}/>
           
            <CategorySelector task={task} onChange={(val) => {updateTaskField(task.id, "category", val)}} 
            className={`px-2 border border-stone-600 ${applyHoverSelectStyles(task)}`}/>

            <DateSelector task={task} onSelect={(val) => updateTaskField(task.id, "due_date", val) } field={"due_date"}
            className={`h-10 text-left border border-stone-600 ${applyHoverSelectStyles(task)}`}/>

            <DateSelector task={task} onSelect={(val) => updateTaskField(task.id, "start_date", val) } field={"start_date"}
            className={`h-10 text-left border border-stone-600 ${applyHoverSelectStyles(task)}`}/>

            <TimeInput task={task} updateTaskField={updateTaskField}
            className={`h-10 text-left border border-stone-600 ${applyHoverSelectStyles(task)}`}/>
          </TableRow>
        ))}
      </TableBody>
      <CustomFooter handleAddTask={handleAddTask} calcSum={calcSum}/>

    </Table>
    
  );
}

export default TaskTable;