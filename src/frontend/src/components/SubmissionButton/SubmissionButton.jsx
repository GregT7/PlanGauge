import { Button } from "@/components/ui/button"
import { useContext, useState } from "react"
import styleData from "@/utils/styleData.json"
import submitPlans from "@/utils/submitPlans"
import { TaskContext } from "@/contexts/TaskContext"
import formatDateToYYYYMMDD from "@/utils/formatDateToYYYYMMDD"
import { DEFAULT_PLAN_START, DEFAULT_PLAN_END } from "@/utils/planningRange";
import { toast } from 'sonner'
import { processingContext } from "@/contexts/ProcessingContext"
import determineStatusStyle from '@/utils/determineStatusStyle';

function SubmissionButton({IS_DEMO, status = 'neutral', 
    filter_start_date = DEFAULT_PLAN_START, filter_end_date = DEFAULT_PLAN_END}) {

    const { tasks } = useContext(TaskContext);
    const [isDisabled, setIsDisabled] = useState(false)
    
    function formatDates(records) {
        records.forEach((item, index) => {
            records[index].due_date = formatDateToYYYYMMDD(records[index].due_date);
            records[index].start_date = formatDateToYYYYMMDD(records[index].start_date);
        })
    }
    let tasksCopy = structuredClone(tasks)
    formatDates(tasksCopy);

    const handleClickSubmit = async () => {
        setIsDisabled(true);
        try {
            const resp = submitPlans(tasksCopy, filter_start_date, filter_end_date);

            await toast.promise(resp, {
                loading: 'Submitting Plan Records...',
                success: "Data Successfully Saved!",
                error: 'Error: There Was An Unexpected Issue!',
            })
        } catch (err) {
            // e.g., toast.error(err.message || "Submission failed");
            console.log("Submission exception caught: ", err);
            toast.error(err.message || 'Error: There Was An Unexpected Issue!');
        } finally {
            setIsDisabled(false);
        }
    };

    const handleClickDemo = async () => {
        setIsDisabled(true);
        try {
            const promise = () => new Promise((resolve) => setTimeout(() => resolve({ name: 'Sonner' }), 4000));

            toast.promise(promise, {
            loading: 'Mocking plan submission...',
            success: (data) => {
                return `Mock submission successful!`;
            },
            error: 'Error: Mock submission failed!',
            });
        } catch (err) {
            console.log("Submission exception caught: ", err);
            toast.error(err.message || 'Error: There Was An Unexpected Issue!');
        } finally {
            setIsDisabled(false);
        }
    }


    function handleStyling(status) {
        if (styleData?.[status]) {
            return styleData[status].base + " " + styleData[status].hover
        } else {
            return styleData.unknown.base + " " + styleData.unknown.hover
        }
    }

    const { feasibility } = useContext(processingContext);
    const style = "text-xl p-6 " + handleStyling(feasibility?.status)

    const handleClick = IS_DEMO ? handleClickDemo : handleClickSubmit

    return (     
        <Button onClick={handleClick} className={style} disabled={isDisabled}>
            Submit
        </Button>
    )
}

export default SubmissionButton