import { useContext, useMemo } from 'react';
import { TaskContext } from '@/contexts/TaskContext';
import { processingContext } from '@/contexts/ProcessingContext';
import { DEFAULT_PLAN_START, DEFAULT_PLAN_END } from "@/utils/planningRange";
import capitalizeFirstLetter from '@/utils/capitalizeFirstLetter';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"


function EvaluationSection() {
  const { timeSum } = useContext(TaskContext)
  const { feasibility, stats, statusCount, thresholds } = useContext(processingContext)



  // Prep for displaying text
  const week_feasibility = capitalizeFirstLetter(feasibility?.week_eval?.status) ?? 'Unknown'
  const week_score = Math.round(feasibility?.week_eval?.score) ?? "-"
  const daily_score = Math.round(feasibility?.daily_score) ?? "-"
  const overall_feasibility = capitalizeFirstLetter(feasibility?.status) ?? "Unknown"
  let overall_score = Math.round(feasibility?.score) ?? "-"
  if (overall_score === -1) overall_score = "-"
  let week_z = Math.round((timeSum - stats?.week?.ave) / stats?.week.std)
  week_z = isFinite(week_z) ? week_z : "-" 

  // Overall score
  const overall_eval = (<span>
    Overall Feasibility:{" "}
      <span className="text-rose-700">
        {overall_feasibility} ({overall_score} / 100 points)
      </span>
  </span>);

  const overall_content = (<ol>
    <li>Equation: score = weight * weekly_score + (1 - weight) * daily_score</li>
    <li>{overall_score} = {thresholds?.weight} * {week_score} + (1 - {thresholds?.weight}) * {feasibility?.daily_score}</li>
    <li className="text-left">Classification thresholds</li>
    <ol>
      <li>Good: {thresholds?.overall?.good?.lower} points {`<= `} 
        total points {`<`} {thresholds?.overall?.good?.upper} points</li>
      <li>Moderate: {thresholds?.overall?.moderate?.lower} points {`<= `} 
        total points {`<`} {thresholds?.overall?.moderate?.upper} points</li>
      <li>Poor: total points {`<`} {thresholds?.overall?.moderate?.lower}</li>
    </ol>
    <li>
      Statistical metrics were calculated based 
      on data collected between {DEFAULT_PLAN_START} and {DEFAULT_PLAN_END}
    </li>
  </ol>);

  const overall_toggle = (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger className="text-base">
            {overall_eval}
        </AccordionTrigger>
        <AccordionContent>
          {overall_content}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )

  // Daily score
  // const accordionStyle = "flex flex-1 items-center justify-between py-4 text-base font-medium text-left"
  const accordionStyle = "font-medium py-4 text-left text-base"
  const daily_eval = <div className={accordionStyle}>
    Daily Score: <span className={`${accordionStyle} text-rose-700`}>({daily_score} / 100 points)</span>
  </div>
  
  // <span className={accordionStyle}>
  //   Daily Score:<span className={`text-left text-rose-700`}>( {daily_score} / 100 points)</span>
  // </span>

  const week_eval = <span>
    Week Feasibility: <span className="text-rose-700">{week_feasibility} ({week_score} / 100 points)</span>
  </span>
  const week_content = <li>
    <ol>Current Total: {timeSum} mins</ol>
    <ol>Historical Average: {Math.round(stats?.week?.ave ) ?? '-'} mins</ol>
    <ol>Historical Standard Deviation: {Math.round(stats?.week?.std) ?? '-'} mins</ol>
    <ol>Z-score: {week_z}</ol>
  </li>

  const week_toggle = (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger className="text-base">
            {week_eval}
        </AccordionTrigger>
        <AccordionContent>
          {week_content}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )

  return (
    <div className="w-[73.5%] mx-auto border-2 border-dashed pt-2">
      <h1 className="text-2xl pt-2 pb-4 text-left pl-8">Evaluation Section</h1>
      <Card className="mb-4 mx-4">
        <CardContent>
          {overall_toggle}
          {week_toggle}
          {daily_eval}
        </CardContent>
      </Card>

    </div>
  )
}

export default EvaluationSection;
