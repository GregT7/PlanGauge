
      // id: Date.now(),
      // name: '',
      // category: '',
      // due_date: '',
      // start_date: '',
      // time_estimation: 0,
      // selected: null

function verify_task(task) {
  if (typeof task !== "object" || task === null) return false;

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


function verify_payload(payload) {
  if (typeof(payload) !== "object") {return false}

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


      // id: Date.now(),
      // name: '',
      // category: '',
      // due_date: '',
      // start_date: '',
      // time_estimation: 0,
      // selected: null


export default async function submitPlans(tasks, filter_start_date, filter_end_date) {
  const submit_url = "http://localhost:5000/api/plan-submissions";
  let data = "Submission request rejected due to invalid plan data"
  
  const payload = {
    tasks,
    filter_start_date,
    filter_end_date,
  };

  const is_valid_payload = verify_payload(payload);
  tasks = tasks.filter(task => verify_task(task))
  if (is_valid_payload) {
    const res = await fetch(submit_url, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify(payload),
    });

    const text = await res.text();
    try { data = text ? JSON.parse(text) : null; } catch { data = { raw: text }; }

    if (!res.ok) {
      // Bubble a structured error up to the UI (toast, etc.)
      const status = res.status;
      const msg = data?.error?.message || `HTTP ${status}`;
      const code = data?.error?.code || "http_error";
      throw Object.assign(new Error(msg), { status, code, details: data?.error?.details ?? data });
    }
  }

  return data
}