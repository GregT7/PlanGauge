export function verify_task(task) {
  if (task === null || typeof task !== "object") return false;

  const expected = {
    name: "string",
    category: "string",
    due_date: "string",
    start_date: "string",
    time_estimation: "number"
  };

  return Object.entries(expected).every(([key, type]) =>
    task.hasOwnProperty(key) && typeof task[key] === type
  );
}


export function verify_payload(payload) {


  if (payload === null || typeof payload !== "object") {return false}

  // need to test that it has the right keys
  const keys = ['tasks', 'filter_start_date', 'filter_end_date']
  const missingKeys = !keys.every(key => payload.hasOwnProperty(key))
  if (missingKeys) {return false;}

  // are the filter_dates in the format: 'YYYY-MM-DD' including dashes
  const regex = /^\d{4}-\d{2}-\d{2}$/; // Matches YYYY-MM-DD
  const invalid_start = !regex.test(payload['filter_start_date'])
  const invalid_end = !regex.test(payload['filter_end_date'])
  if (invalid_start || invalid_end) {return false;};

  // are the tasks a non-empty array?
  const notArray = !Array.isArray(payload["tasks"])
  if (notArray) {return false}
  const emptyArray = payload["tasks"].length === 0
  if (emptyArray) {return false}

  // is there at least one valid task?
  const no_valid_tasks = !payload["tasks"].some(task => verify_task(task))
  if (no_valid_tasks) {return false};

  return true;
}