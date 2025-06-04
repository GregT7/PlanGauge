import { useState, useContext } from 'react';
import { TaskContext } from "./TaskContext";
import RowSelector from "./RowSelector";
import CategorySelector from "./CategorySelector";
import DateSelector from './DateSelector';

 
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

  const updateTaskField = (id, field, val) => {
    setTasks((prev) => 
      prev.map((task) => 
        task.id === id ? {...task, [field]: val} : task
      )
    );
  };




  return (
    <Table className="">
      <TableHeader >
        <TableRow>
          <TableHead>X</TableHead>
          <TableHead>Task Name</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Due Date</TableHead>
          <TableHead>Start Date</TableHead>
          <TableHead>Time Estimation</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
      
        {tasks.map((task) => (
          <TableRow key={task.id}>
            <RowSelector></RowSelector>
            <TableCell>{task.name}</TableCell>
            {/* <TableCell>{task.category}</TableCell> */}
            <CategorySelector task={task} onChange={(val) => {updateTaskField(task.id, "category", val)}}/>
            <DateSelector task={task} onSelect={(val) => updateTaskField(task.id, "due_date", val) } field={"due_date"}/>
            <DateSelector task={task} onSelect={(val) => updateTaskField(task.id, "start_date", val) } field={"start_date"}/>
            {/* <DateSelector task={task} onSelect={(val) => updateTaskField(task.id, "due_date", val)}/> */}

            
          </TableRow>
        
        ))}
      </TableBody>
      

    </Table>
    
  );
}

export default TaskTable;