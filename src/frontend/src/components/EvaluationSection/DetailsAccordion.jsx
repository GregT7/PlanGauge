import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import WeekAccordion from "./WeekAccordion"
import ZAccordion from "./ZAccordion"
import PointsAccordion from "./PointsAccordion"
import capitalizeFirstLetter from "@/utils/capitalizeFirstLetter"
import determineStatusStyle from "@/utils/determineStatusStyle"

export default function DetailsAccordion({feasibility, stats, statusCount, thresholds, dates}) {
    let descr = "Description: The overall feasibility score is calculated on a 0–100 scale. "
    descr += "It combines the weighted weekly score and daily score, then compares the total "
    descr += "against set thresholds to determine the feasibility category."

    let equation = "Equation: Score = a * W + (1 - a) * D"
    let eq_desc = "a = weight, W = weekly score, D = daily score"

    const is_known = feasibility?.status !== "unknown"
    const weight_str = thresholds?.weight?.toFixed(2) ?? 0
    let optional_eq = `${feasibility?.score?.toFixed(2) ?? 0} = ${weight_str}`
    optional_eq += ` * ${thresholds?.week_eval?.score?.toFixed(2) ?? 0} + (1 - ${weight_str}) `
    optional_eq += `* ${feasibility?.daily_score?.toFixed(2) ?? 0}`

    let dates_str = `Note: Statistical metric data was calculated by retrieving`
    dates_str += ` data whose dates fell between `
    dates_str += `${dates?.start ?? "?"} and ${dates?.end ?? "?"}`

    const week_feasibility = feasibility?.week_eval?.status ?? 'unknown'
    const week_score = Math.round(feasibility?.week_eval?.score) ?? "-"



    const week_style = determineStatusStyle(week_feasibility, "text")


        //   <span className={determineStatusStyle(overall_feasibility, "text")}>
        //     {capitalizeFirstLetter(overall_feasibility)} ({overall_score} / 100 points)
        //   </span>

    const details_content = (
        <div className="text-left">
            <p>{descr}</p>
            <p className="pt-4">{equation}</p>
            <p className="pt-1">{eq_desc}</p>
            {is_known && <p className="pt-1">{optional_eq}</p>}
            <p className="pt-4">{dates_str}</p>
            <WeekAccordion week_feasibility={week_feasibility} week_score={week_score} 
            week_style={week_style}/>
            <PointsAccordion thresholds={thresholds}/>
            <ZAccordion thresholds={thresholds}/>
        </div>
    );

    return (
        <div>
            <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                <AccordionTrigger className="text-base">
                    Details
                </AccordionTrigger>
                <AccordionContent>
                    {details_content}
                </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    );
}