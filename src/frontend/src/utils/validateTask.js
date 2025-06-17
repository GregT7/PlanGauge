function isValidTask(task) {
  return (
    typeof task === 'object' &&
    task !== null &&
    typeof task.category === 'string' &&
    typeof task.name === 'string' 
    // typeof task.dueDate === 'string' // or Date or whatever format you use
  );
}

export default isValidTask;