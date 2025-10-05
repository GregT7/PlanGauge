// DetailsAccordion.jsx
// Purpose: Compact, readable breakdown of the overall feasibility calculation.
// - Keeps earlier refactor intact
// - ADDS: nested accordions (Week, Daily, Z, Points) under a "More details" block

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { useContext, useMemo, useState } from "react"
import { processingContext } from "@/contexts/ProcessingContext"
import styleData from "@/utils/styleData.json"

// ✅ NEW: bring back your smaller accordions
import WeekAccordion from "./WeekAccordion"
import DailyAccordion from "./DailyAccordion"
import ZAccordion from "./ZAccordion"
import PointsAccordion from "./PointsAccordion"

// ------------------------------- helpers -------------------------------------

const cap = (s) => (typeof s === "string" && s ? s[0].toUpperCase() + s.slice(1) : s)
const toNum = (v) => (typeof v === "number" && Number.isFinite(v) ? v : null)
const clamp = (val, min, max) => Math.max(min, Math.min(max, val))

const Badge = ({ label }) => {
  const cls = styleData?.[label]?.base
  if (!cls) return null
  return <span className={`text-xs rounded-md px-2 py-0.5 ${cls}`}>{cap(label)}</span>
}

const textClassFor = (status, fallback = "text-muted-foreground") =>
  status && styleData?.[status]?.text ? styleData[status].text : fallback

export default function DetailsAccordion() {
  const {
    thresholds,
    stats,
    feasibility,   // { score, status, week_eval: {score,status}, days_eval: {score,status} }
    filterDates,
  } = useContext(processingContext)

  // ------------------------------- derived -----------------------------------

  const weeklyScore = toNum(feasOr(feasibility?.week_eval?.score))
  const dailyScore  = toNum(feasOr(feasibility?.days_eval?.score))
  const overallScore = toNum(feasOr(feasibility?.score))
  const overallStatus = feasibility?.status ?? "unknown"

  const weight = useMemo(() => {
    const w = toNum(thresholds?.score_weight) ?? toNum(thresholds?.weight) ?? 0.5
    return clamp(w, 0, 1)
  }, [thresholds])

  const disp = (n, digits = 0) =>
    Number.isFinite(n) ? (digits > 0 ? n.toFixed(digits) : Math.round(n)) : "—"

  const overallPtsClass = textClassFor(overallStatus)

  const equationStr = useMemo(() => {
    const ws = Number.isFinite(weeklyScore) ? weeklyScore : null
    const ds = Number.isFinite(dailyScore) ? dailyScore : null
    const os = Number.isFinite(overallScore) ? overallScore : null
    const w  = Number.isFinite(weight) ? weight : null
    if (ws == null || ds == null || os == null || w == null) return "—"
    return `(${w.toFixed(2)} × ${Math.round(ws)}) + (${(1 - w).toFixed(2)} × ${Math.round(ds)}) = ${Math.round(os)}`
  }, [weeklyScore, dailyScore, overallScore, weight])

  const equationJSX = useMemo(() => {
    const ws = Number.isFinite(weeklyScore) ? Math.round(weeklyScore) : "—"
    const ds = Number.isFinite(dailyScore) ? Math.round(dailyScore) : "—"
    const os = Number.isFinite(overallScore) ? Math.round(overallScore) : "—"
    const w  = Number.isFinite(weight) ? weight : null

    return (
      <code className="whitespace-nowrap">
        (<span className="text-muted-foreground">{w != null ? w.toFixed(2) : "—"}</span>{" "}
        ×{" "}
        <span className={textClassFor(feasibility?.week_eval?.status)}>{ws}</span>)
        {"  +  "}
        (<span className="text-muted-foreground">
          {w != null ? (1 - w).toFixed(2) : "—"}
        </span>{" "}
        ×{" "}
        <span className={textClassFor(feasibility?.days_eval?.status)}>{ds}</span>)
        {"  =  "}
        <span className={overallPtsClass}>{os}</span>
      </code>
    )
  }, [weeklyScore, dailyScore, overallScore, weight, feasibility, overallPtsClass])

  // ------------------------------- sections -----------------------------------

const header = (
  <AccordionTrigger className="text-base">
    <span className="font-medium">Details</span>
  </AccordionTrigger>
)


  const description = (
    <p className="text-sm text-muted-foreground mb-3">
      The overall score blends the weekly points and the daily distribution points using a weight{" "}
      (<code>w</code> from thresholds). Values are rounded for display only.
    </p>
  )

  const inputs = (
    <div className="rounded-xl border p-3">
      <ul className="list-disc list-inside space-y-1">
        <li className="text-sm">
          <span className="font-medium">Weekly Points:</span>{" "}
          <span className={textClassFor(feasibility?.week_eval?.status)}>
            {disp(weeklyScore)} pts
          </span>
        </li>
        <li className="text-sm">
          <span className="font-medium">Daily Points:</span>{" "}
          <span className={textClassFor(feasibility?.days_eval?.status)}>
            {disp(dailyScore)} pts
          </span>
        </li>
        <li className="text-sm">
          <span className="font-medium">Weight (w):</span>{" "}
          <span className="text-muted-foreground">{Number.isFinite(weight) ? weight.toFixed(2) : "—"}</span>
        </li>
      </ul>
    </div>
  )

const equation = (
  <div className="rounded-xl border p-3">
    <ul className="list-disc list-inside space-y-2">
      <li className="text-sm">
        <span className="font-medium">What this shows:</span>{" "}
        We blend <em>Weekly Points</em> (from the z-score of your weekly time) and
        <em> Daily Points</em> (from the distribution of day statuses) using a weight <code>w</code>.
      </li>

      {/* Inputs (colorized where helpful) */}
      <li className="text-sm">
        <span className="font-medium">Inputs:</span>{" "}
        <span className={textClassFor(feasibility?.week_eval?.status)}>
          Weekly = {disp(weeklyScore)} pts
        </span>
        {", "}
        <span className={textClassFor(feasibility?.days_eval?.status)}>
          Daily = {disp(dailyScore)} pts
        </span>
        {", "}
        <span className="text-muted-foreground">
          w = {Number.isFinite(weight) ? weight.toFixed(2) : "—"}
          {",  "}(1 − w) = {Number.isFinite(weight) ? (1 - weight).toFixed(2) : "—"}
        </span>
      </li>

      {/* Readable formula */}
      <li className="text-sm">
        <span className="font-medium">Formula:</span>{" "}
        <code className="whitespace-nowrap">
          overall = (w × weekly) + ((1 − w) × daily)
        </code>
      </li>

      {/* Worked example using the live numbers */}
      <li className="text-sm">
        <span className="font-medium">This run:</span>{" "}
        <code className="whitespace-nowrap">
          ({Number.isFinite(weight) ? weight.toFixed(2) : "—"} ×{" "}
          <span className={textClassFor(feasibility?.week_eval?.status)}>
            {disp(weeklyScore)}
          </span>
          ) + ({Number.isFinite(weight) ? (1 - weight).toFixed(2) : "—"} ×{" "}
          <span className={textClassFor(feasibility?.days_eval?.status)}>
            {disp(dailyScore)}
          </span>
          ) ={" "}
          <span className={overallPtsClass}>
            {disp(overallScore)} {/* rounded only for display */}
          </span>
        </code>
      </li>

      {/* Classification hint */}
      <li className="text-xs text-muted-foreground">
        <span className="font-medium">How the label is chosen:</span>{" "}
        Your overall score is compared against predefined score ranges — Good, 
        Moderate, and Poor. Scores below the Moderate range are considered Poor
      </li>
    </ul>
  </div>
)


// Replace your existing `filterDates` const with this:

const filterDatesText = (
  <div className="rounded-xl border p-3">
    <ul className="list-disc list-inside space-y-2">
      <li className="text-sm">
        <span className="font-medium">Stats Filter:</span>{" "}
        <span className="text-muted-foreground">
          {filterDates?.start || filterDates?.end
            ? <>
                {filterDates?.start ?? "—"} <span className="opacity-60">→</span> {filterDates?.end ?? "—"}
              </>
            : "No filter dates were found."}
        </span>
      </li>

      <li className="text-sm">
        <span className="font-medium">Weekly Stats used:</span>{" "}
        <span className="text-muted-foreground">
          ave = {Number.isFinite(stats?.week?.ave) ? Math.round(stats.week.ave) : "—"} mins,
          {"  "}std = {Number.isFinite(stats?.week?.std) ? Math.round(stats.week.std) : "—"} mins
        </span>
      </li>

      <li className="text-xs text-muted-foreground">
        These stats are what power the weekly z-score in the equation above. If ave/std are missing
        or std ≤ 0, the weekly status becomes <code>unknown</code>.
      </li>
    </ul>
  </div>
)


  // ✅ NEW: nested “More details” section with your smaller accordions
  const moreDetails = (
    <div className="rounded-xl border p-3">
      <div className="space-y-2">
        <WeekAccordion />
        <DailyAccordion />
        <ZAccordion />
        <PointsAccordion />
      </div>
    </div>
  )

  const content = (
    <div className="space-y-3">
      {description}
      {inputs}
      {equation}
      {filterDatesText}
      {moreDetails} {/* 👈 added back in */}
    </div>
  )

  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="details">
        {header}
        <AccordionContent>{content}</AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

function feasOr(v) {
  const n = toNum(v)
  return Number.isFinite(n) ? n : null
}
