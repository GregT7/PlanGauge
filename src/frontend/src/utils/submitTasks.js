import { persistentFetch} from './persistentFetch';

// fetch('https://jsonplaceholder.typicode.com/posts', {
//     method: 'POST', // Specify the HTTP method as POST
//     headers: {
//         'Content-Type': 'application/json', // Indicate that the body is JSON
//     },
//     body: JSON.stringify(postData), // Convert the JavaScript object to a JSON string
// })
// .then(response => {
//     if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//     }
//     return response.json(); // Parse the JSON response
// })
// .then(data => {
//     console.log('Success:', data);
// })
// .catch(error => {
//     console.error('Error:', error);
// });

// persistentFetch(url, service_str, timeoutDuration = 2500)
export default async function submitTasks(tasks) {
    const submit_url = "http://localhost:5000/api/plan-submissions"
    // const response = await persistentFetch(submit_url, "plan submission", 5000).then(value => {
    //     console.log(value)
    // })

    const response = await fetch(submit_url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "Accept": "application/json"
        },
        body: JSON.stringify(tasks)
    }).then(response => {
        if(!response.ok) {
            console.log(response)
            // throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json(); // Parse the JSON response
    }).then(data => {
        console.log('Success:', data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
    
}