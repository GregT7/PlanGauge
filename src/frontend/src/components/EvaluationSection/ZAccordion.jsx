import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import styleData from "@/utils/styleData.json" with { type: 'json' }


export default function ZAccordion({thresholds}) {

  const desc_str = "Description: These are the z-score ranges used to categorize feasibility"

  const gre = "\u2264"
  const good_str = <span className={styleData.good.text}>Good:</span>
  const mod_str = <span className={styleData.moderate.text}>Moderate:</span>
  const poor_str = <span className={styleData.poor.text}>Poor:</span>
  const content = (<div>
    <p className="">Z-Score Ranges Explained</p>
    <p className="pt-2">{desc_str}</p>
    <p className="pt-2">Ranges</p>
    <ul className="list-disc pl-6 space-y-1 pt-2">
      <li>{good_str} {thresholds?.zscore?.good?.lower} {gre + " "}
        z {`<`} {thresholds?.zscore?.good?.upper}</li>
      <li>{mod_str} {thresholds?.zscore?.moderate?.lower} {gre + " "} 
        z {`<`} {thresholds?.zscore?.moderate?.upper}</li>
      <li>{poor_str} z {gre} {thresholds?.zscore?.moderate?.upper}</li>
    </ul>
  </div>);

  return (
    <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
        <AccordionTrigger className="text-base">
            Z-Score Thresholds
        </AccordionTrigger>
        <AccordionContent>
            {content}
        </AccordionContent>
        </AccordionItem>
    </Accordion>
  );
}