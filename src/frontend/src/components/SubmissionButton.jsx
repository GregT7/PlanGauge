import { Button } from "@/components/ui/button"
import { useContext, useState } from "react"
import styleData from "@/utils/styleData.json"
import submitTasks from "@/utils/submitPlans"
import { TaskContext } from "@/contexts/TaskContext"
import formatDateToYYYYMMDD from "@/utils/formatDateToYYYYMMDD"
import { DEFAULT_PLAN_START, DEFAULT_PLAN_END } from "@/utils/planningRange";


// not sure if there would be a 'default' status, this structure is based on StatCard.jsx
// determineStatusStyle function that uses a switch case with a default case

function SubmissionButton({status = 'neutral', 
    filter_start_date = DEFAULT_PLAN_START, filter_end_date = DEFAULT_PLAN_END}) {

    const { tasks } = useContext(TaskContext);
    let tasksCopy = structuredClone(tasks)

    function formatDates(records) {
        records.forEach((item, index) => {
            records[index].due_date = formatDateToYYYYMMDD(records[index].due_date);
            records[index].start_date = formatDateToYYYYMMDD(records[index].start_date);
        })
    }

    

    function handleStyling(status) {
        if (styleData?.[status]) {
            return styleData[status].base + " " + styleData[status].hover
        } else {
            return styleData.error.base + " " + styleData.error.hover
        }
    }


    formatDates(tasksCopy);
    const handleClick = async () => {
    try {
        const resp = await submitTasks(tasksCopy, filter_start_date, filter_end_date);
        if (resp.ok) {
            console.log("Successful POST: ", resp)
        } else {
            console.log("Failed POST: ", resp)
        }
        // e.g., toast.success(`Synced ${resp?.num_plans ?? 0} plans`);
    } catch (err) {
        // e.g., toast.error(err.message || "Submission failed");
        console.error(err);
    }
    };


    const initialColors = handleStyling(status)
    const [color, setColor] = useState(initialColors)

    return (     
        <Button onClick={handleClick} className={`text-xl p-6 ${color}`} status={status}>
            Submit
        </Button>
    )
}

export default SubmissionButton