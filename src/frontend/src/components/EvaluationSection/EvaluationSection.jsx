import { useContext, useMemo } from 'react';
import { TaskContext } from '@/contexts/TaskContext';
import { processingContext } from '@/contexts/ProcessingContext';
import { DEFAULT_PLAN_START, DEFAULT_PLAN_END } from "@/utils/planningRange";
import capitalizeFirstLetter from '@/utils/capitalizeFirstLetter';
import determineStatusStyle from '@/utils/determineStatusStyle';
import DetailsAccordion from './DetailsAccordion';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { addSeconds } from 'date-fns';



function EvaluationSection() {
  const { timeSum } = useContext(TaskContext)

  const { feasibility, stats, statusCount, thresholds } = useContext(processingContext)

  const overall_feasibility = feasibility?.status ?? "unknown"
  let overall_score = Math.round(feasibility?.score) ?? "-"
  if (overall_score === -1) overall_score = "-"
  const overall_eval = (<span className="text-2xl font-medium">
    Feasibility:{" "}
      <span className={determineStatusStyle(overall_feasibility, "text")}>
        {capitalizeFirstLetter(overall_feasibility)} ({overall_score} / 100 points)
      </span>
  </span>);


  const dates = {
    start: DEFAULT_PLAN_START,
    end: DEFAULT_PLAN_END
  }


  return (
    <div className="w-[73.5%] mx-auto border-2 border-dashed pt-2">
      <h1 className="text-2xl pt-2 pb-4 text-left pl-8">Evaluation Section</h1>
      <Card className="mb-4 mx-4">
        <CardContent>
          {overall_eval}
          {/* feasibility, stats, statusCount, thresholds */}
          <DetailsAccordion feasibility={feasibility} stats={stats} 
          statusCount={statusCount} thresholds={thresholds} dates={dates}/>
        </CardContent>
      </Card>

    </div>
  )
}

export default EvaluationSection;
