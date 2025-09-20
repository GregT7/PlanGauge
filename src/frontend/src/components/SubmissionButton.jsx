import { Button } from "@/components/ui/button"
import { useContext, useState } from "react"
import styleData from "@/utils/styleData.json"
import submitTasks from "@/utils/submitTasks"
import { TaskContext } from "@/contexts/TaskContext"


// not sure if there would be a 'default' status, this structure is based on StatCard.jsx
// determineStatusStyle function that uses a switch case with a default case

function SubmissionButton({submit_plans = () => {}, status = 'neutral'}) {
    const { tasks } = useContext(TaskContext);

    function handleStyling(status) {
        if (styleData?.[status]) {
            return styleData[status].base + " " + styleData[status].hover
        } else {
            return styleData.error.base + " " + styleData.error.hover
        }
    }


    // ! FIX ME - HARD CODED VALUES
    const filter_start_date = '2025-06-01'
    const filter_end_date =  '2025-06-30'

    const handleClick = () => {
        submitTasks(tasks, filter_start_date, filter_end_date)
    }

    const initialColors = handleStyling(status)
    const [color, setColor] = useState(initialColors)

    return (     
        <Button onClick={handleClick} className={`text-xl p-6 ${color}`} status={status}>
            Submit
        </Button>
    )
}

export default SubmissionButton