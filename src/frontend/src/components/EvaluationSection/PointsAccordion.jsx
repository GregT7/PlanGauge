import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import styleData from "@/utils/styleData.json" with { type: 'json' }


export default function PointsAccordion({thresholds}) {


  let map_desc = "Description: This is the feasibility categorization to point mapping. This is used to quantify the "
  map_desc += "statuses for the week and individual days resulting in values for the daily score and weekly score. "
  map_desc += "Quantification of these two statuses allows for both categorizations to influence the ultimate categorization result"

  const gre = "\u2264"
  const good_str = <span className={styleData.good.text}>Good:</span>
  const mod_str = <span className={styleData.moderate.text}>Moderate:</span>
  const poor_str = <span className={styleData.poor.text}>Poor:</span>

  const map_content = (<div>
    <p className="">Point Mapping Explained</p>
    <p className="pt-2">{map_desc}</p>
    <p className="pt-2">Mapping</p>
    <ul className="list-disc pl-6 space-y-1 pt-2">
        <li>{good_str} {thresholds?.points?.good} points</li>
        <li>{mod_str} {thresholds?.points?.moderate} points</li>
        <li>{poor_str} {thresholds?.points?.poor} points</li>
    </ul>

  </div>);
  
  let range_desc = "Description: These are the point ranges used to convert feasibility "
  range_desc += "into points or vise versa. The point rages are used to calculate the weekly and daily scores. These "
  range_desc += "scores are used to calculate the total overall score. Finally, the overall score is compared back with the"
  range_desc += " point ranges to determine the feasibility of the overall plan"
  const range_content = (<div>
    <p className="">Point Ranges Explained</p>
    <p className="pt-2">{range_desc}</p>
    <p className="pt-2">Range</p>
    <ul className="list-disc pl-6 space-y-1 pt-2">
      <li>{good_str} {thresholds?.overall?.good?.lower} points {gre + " "}
        z {`<`} {thresholds?.overall?.good?.upper} points</li>
      <li>{mod_str} {thresholds?.overall?.moderate?.lower} points {gre + " "} 
        z {`<`} {thresholds?.overall?.moderate?.upper} points</li>
      <li>{poor_str} z {gre} {thresholds?.overall?.moderate?.upper} points</li>
    </ul>
  </div>);

  const content = (<div>
    {map_content}
    <hr className="my-4 border-t border-stone-700/60" />
    {range_content}
  </div>)

  return (
    <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
        <AccordionTrigger className="text-base">
            Point Thresholds
        </AccordionTrigger>
        <AccordionContent>
            {content}
        </AccordionContent>
        </AccordionItem>
    </Accordion>
  );
}