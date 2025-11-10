import { verify_task, verify_payload } from "./verifyPayload";

export default async function submitPlans(tasks, filter_start_date, filter_end_date, url) {
  let resp = {
    message: "Error: Invalid Plan Data!",
    details: null
  }
  
  const payload = {
    tasks,
    filter_start_date,
    filter_end_date,
  };

  const is_valid_payload = verify_payload(payload);
  tasks = tasks.filter(task => verify_task(task))
  if (is_valid_payload) {
    const submit_response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify(payload),
    });

    resp.details = submit_response

    if (!submit_response?.ok) {
      resp.message = "Submission Failed"
      return Promise.reject(resp)
    } else {
      resp.message = "Submission was successful"
      return Promise.resolve(resp)
    }
  }

  return Promise.reject(resp)
}