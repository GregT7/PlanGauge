import { Button } from "@/components/ui/button"
import { useState } from "react"
import styleData from "@/utils/styleData.json"


// not sure if there would be a 'default' status, this structure is based on StatCard.jsx
// determineStatusStyle function that uses a switch case with a default case

function handleStyling(status) {
    if (styleData?.[status]) {
        return styleData[status].base + " " + styleData[status].hover
    } else {
        return styleData.error.base + " " + styleData.error.hover
    }
}


function SubmissionButton({submit_plans = () => {}, status = 'neutral'}) {
    const initialColors = handleStyling(status)
    const [color, setColor] = useState(initialColors)

    return (     
        <Button className={`text-xl p-6 ${color}`} status={status}>
            Submit
        </Button>
    )
}

export default SubmissionButton