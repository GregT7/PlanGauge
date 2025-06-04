import { useState, useContext } from 'react';
import { TaskContext } from "./TaskContext";
import RowSelector from "./RowSelector";
import DateSelector from './DateSelector';


import {
  flexRender,
  getCoreRowModel,
  useReactTable
} from "@tanstack/react-table"
 
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"


function TaskTable() {
  
  const {tasks, setTasks} = useContext(TaskContext);



  return (
    <h1>Hello World</h1>
  );
}

export default TaskTable;