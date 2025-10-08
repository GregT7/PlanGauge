// DailyAccordion.jsx
// Purpose: Show daily distribution evaluation with two clear sections:
//  1) Status Count (Good/Moderate/Poor day counts)
//  2) Equation (how daily points are computed)
// - Progressive build, tiny return
// - Badge + colored points (matches Week styling)

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { useContext, useMemo } from "react"
import { processingContext } from "@/contexts/ProcessingContext"
import styleData from "@/utils/styleData.json"

const cap = (s) => (typeof s === "string" && s ? s[0].toUpperCase() + s.slice(1) : s)
const toNum = (v) => (typeof v === "number" && Number.isFinite(v) ? v : null)

const Badge = ({ label }) => {
  const cls = styleData?.[label]?.base
  if (!cls) return null
  return <span className={`text-xs rounded-md px-2 py-0.5 ${cls}`}>{cap(label)}</span>
}

const textClassFor = (status, fallback = "text-muted-foreground") =>
  status && styleData?.[status]?.text ? styleData[status].text : fallback

// Fixed display order
const ORDER = ["good", "moderate", "poor"]

export default function DailyAccordion() {
  const { thresholds, feasibility, statusCount } = useContext(processingContext)

  const dailyStatus = feasibility?.days_eval?.status ?? "unknown"
  const dailyScore = toNum(feasibility?.days_eval?.score)

  // Color the "(NN pts)" to match status color
  const scoreColorClass = textClassFor(dailyStatus)

  // Stable list of counts for display
  const counts = useMemo(() => {
    const sc = statusCount ?? {}
    return ORDER.map((label) => ({
      label,
      count: typeof sc[label] === "number" ? sc[label] : 0,
    }))
  }, [statusCount])

  const pointsMap = thresholds?.points ?? {}

  // Derived for the equation example
  const totalDays = counts.reduce((acc, x) => acc + x.count, 0)
  const weightedSum = counts.reduce(
    (acc, x) => acc + (typeof pointsMap[x.label] === "number" ? x.count * pointsMap[x.label] : 0),
    0
  )

  // ------------------------------ sections -----------------------------------

  const header = (
    <AccordionTrigger className="text-base">
      <div className="flex items-center gap-2">
        <Badge label={dailyStatus} />
        <span className="font-medium">Daily Evaluation</span>
        {Number.isFinite(dailyScore) ? (
          <span className={`text-sm ${scoreColorClass}`}>({Math.round(dailyScore)} pts)</span>
        ) : null}
      </div>
    </AccordionTrigger>
  )

  const description = (
    <p className="text-sm text-muted-foreground mb-3">
      Daily feasibility averages the point values of each day’s status (Good/Moderate/Poor).
      This daily score feeds into the overall plan score. Values are rounded for display only.
    </p>
  )

  // --- Section 1: Status Count ------------------------------------------------
  const statusCountSection = (
    <div className="rounded-xl border p-3">
      <h5 className="text-sm font-semibold mb-2">Status Count</h5>
      <ul className="list-disc list-inside space-y-1">
        {counts.map(({ label, count }) => (
          <li key={label} className="text-sm flex items-center gap-2">
            <Badge label={label} />
            <span className="font-medium capitalize">{cap(label)}</span>
            <span className="mx-2">→</span>
            <span className="text-muted-foreground">{count} day{count === 1 ? "" : "s"}</span>
          </li>
        ))}
      </ul>
    </div>
  )

  // --- Section 2: Equation ----------------------------------------------------
  const equationSection = (
    <div className="rounded-xl border p-3">
      <h5 className="text-sm font-semibold mb-2">Equation</h5>
      <ul className="list-disc list-inside space-y-2">
        <li className="text-sm">
          <span className="font-medium">What this shows:</span>{" "}
          We compute a weighted average of day statuses using the points assigned to each status.
        </li>

        {/* Compact legend for clarity */}
        <li className="text-xs text-muted-foreground">
          <span className="font-medium">Points:</span>{" "}
          {ORDER.map((k, i) => (
            <span key={k}>
              {cap(k)}={typeof pointsMap[k] === "number" ? pointsMap[k] : "—"}
              {i < ORDER.length - 1 ? ", " : ""}
            </span>
          ))}
        </li>

        {/* Readable formula */}
        <li className="text-sm">
          <span className="font-medium">Formula:</span>{" "}
          <code className="whitespace-nowrap">
            daily = (Σ&nbsp;count<sub>status</sub> × points<sub>status</sub>) / total_days
          </code>
        </li>

        {/* Worked example using the live numbers */}
        <li className="text-sm">
          <span className="font-medium">This run:</span>{" "}
          <code className="whitespace-nowrap">
            ({ORDER.map((k, i) => {
              const c = counts.find((x) => x.label === k)?.count ?? 0
              const p = typeof pointsMap[k] === "number" ? pointsMap[k] : "—"
              return (
                <span key={k}>
                  {i > 0 ? " + " : ""}
                  {c}×{p}
                </span>
              )
            })}) / {totalDays || "—"}{" "}
            ={" "}
            <span className={Number.isFinite(dailyScore) ? scoreColorClass : "text-muted-foreground"}>
              {Number.isFinite(dailyScore) ? Math.round(dailyScore) : "—"} pts
            </span>
          </code>
        </li>
      </ul>
    </div>
  )

  const content = (
    <div className="space-y-3">
      {description}
      {statusCountSection}
      {equationSection}
    </div>
  )

  // -------------------------------- return -----------------------------------
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="daily">
        {header}
        <AccordionContent>{content}</AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
