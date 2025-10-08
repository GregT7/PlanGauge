// WeekAccordion.jsx
// Adds colored weekly score text based on status badge color.
// Mirrors the progressive-build approach used in PointsAccordion.

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { useContext, useMemo } from "react"
import { processingContext } from "@/contexts/ProcessingContext"
import { TaskContext } from "@/contexts/TaskContext"
import styleData from "@/utils/styleData.json" // color classes for badges

// ------------------------------- helpers -------------------------------------

const cap = (s) => (typeof s === "string" && s ? s[0].toUpperCase() + s.slice(1) : s)
const toNum = (v) => (typeof v === "number" && Number.isFinite(v) ? v : null)

/** z = |(x - ave) / std|, null if not computable */
const calcZ = (x, ave, std) => {
  const X = toNum(x), A = toNum(ave), S = toNum(std)
  if (X == null || A == null || S == null || S <= 0) return null
  return Math.abs((X - A) / S)
}

const Badge = ({ label }) => {
  const cls = styleData?.[label]?.base
  if (!cls) return null
  return <span className={`text-xs rounded-md px-2 py-0.5 ${cls}`}>{cap(label)}</span>
}

export default function WeekAccordion() {
  const { timeSum } = useContext(TaskContext)
  const { stats, feasibility } = useContext(processingContext)

  const ave = toNum(stats?.week?.ave)
  const std = toNum(stats?.week?.std)
  const z = calcZ(timeSum, ave, std)

  const weekStatus = feasibility?.week_eval?.status ?? (z == null ? "unknown" : "—")
  const weekScore = toNum(feasibility?.week_eval?.score)

  // Dynamically color the score text to match the badge scheme
  const scoreColorClass =
    weekStatus && styleData?.[weekStatus]?.text
      ? styleData[weekStatus].text
      : "text-muted-foreground"

  // ------------------------------ sections -----------------------------------

  const header = (
    <AccordionTrigger className="text-base">
      <div className="flex items-center gap-2">
        <Badge label={weekStatus} />
        <span className="font-medium">Weekly Evaluation</span>
        {Number.isFinite(weekScore) ? (
          <span className={`text-sm ${scoreColorClass}`}>
            ({Math.round(weekScore)} pts)
          </span>
        ) : null}
      </div>
    </AccordionTrigger>
  )

  const description = (
    <p className="text-sm text-muted-foreground mb-3">
      Weekly feasibility is derived from your total minutes this week compared to historical
      weekly stats via a z-score, then mapped to points for the overall score calculation.
      Values are rounded only for display.
    </p>
  )

  const valuesList = (
    <ul className="list-disc list-inside space-y-1">
      <li>
        <span className="font-medium">Time Sum:</span>{" "}
        <span className="text-muted-foreground">
          {Number.isFinite(toNum(timeSum)) ? Math.round(timeSum) : "—"} mins
        </span>
      </li>
      <li>
        <span className="font-medium">Average:</span>{" "}
        <span className="text-muted-foreground">
          {Number.isFinite(ave) ? Math.round(ave) : "—"} mins
        </span>
      </li>
      <li>
        <span className="font-medium">Standard Deviation:</span>{" "}
        <span className="text-muted-foreground">
          {Number.isFinite(std) ? Math.round(std) : "—"} mins
        </span>
      </li>
      <li>
        <span className="font-medium">Z-Score:</span>{" "}
        <span className="text-muted-foreground">
          {Number.isFinite(z) ? z.toFixed(2) : "—"}
        </span>
      </li>
    </ul>
  )

  const content = (
    <div className="space-y-3">
      {description}
      <div className="rounded-xl border p-3">{valuesList}</div>
    </div>
  )

  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="week">
        {header}
        <AccordionContent>{content}</AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
