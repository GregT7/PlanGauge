import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import capitalizeFirstLetter from "@/utils/capitalizeFirstLetter";

//   const week_content = <li>
//     <ol>Current Total: {timeSum} mins</ol>
//     <ol>Historical Average: {Math.round(stats?.week?.ave ) ?? '-'} mins</ol>
//     <ol>Historical Standard Deviation: {Math.round(stats?.week?.std) ?? '-'} mins</ol>
//     <ol>Z-score: {week_z}</ol>
//   </li>
export default function WeekAccordion({week_feasibility, week_score, week_style}) {
  const week_eval = <span>
    Week Feasibility: {" "}
        <span className={week_style}>{capitalizeFirstLetter(week_feasibility)} ({week_score} / 100 points)</span>
  </span>

    return (
        <div>
            <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                <AccordionTrigger className="text-base">
                    {week_eval}
                </AccordionTrigger>
                <AccordionContent>
                    asdasdasd
                </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    );
}