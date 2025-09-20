import { persistentFetch } from './persistentFetch';


export default async function submitTasks(tasks, start_date, end_date) {
    const submit_url = "http://localhost:5000/api/plan-submissions"
    // const response = await persistentFetch(submit_url, "plan submission", 5000).then(value => {
    //     console.log(value)
    // })
    const payload = {
        'tasks': tasks,
        'filter_start_date': start_date,
        'filter_end_date': end_date
    }

    const response = await fetch(submit_url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "Accept": "application/json"
        },
        body: JSON.stringify(payload)
    }).then(response => {
        if(!response.ok) {
            console.log("response: ", response)
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json(); // Parse the JSON response
    }).then(data => {
        console.log('Success:', data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}