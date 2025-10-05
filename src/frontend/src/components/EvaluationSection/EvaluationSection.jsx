// EvaluationSection.jsx
// Purpose: Top-level evaluation summary (in a stat card) + detailed breakdown,
// wrapped in a dashed border container to match your layout.

import { useContext } from "react"
import { processingContext } from "@/contexts/ProcessingContext"
import determineStatusStyle from "@/utils/determineStatusStyle"
import styleData from "@/utils/styleData.json"
import DetailsAccordion from "./DetailsAccordion"

// shadcn/ui card
import { Card, CardContent } from "@/components/ui/card"

const cap = (s) => (typeof s === "string" && s ? s[0].toUpperCase() + s.slice(1) : s)
const toNum = (v) => (typeof v === "number" && Number.isFinite(v) ? v : null)
const disp = (n, digits = 0) =>
  Number.isFinite(n) ? (digits > 0 ? n.toFixed(digits) : Math.round(n)) : "—"

const Badge = ({ label }) => {
  const cls = styleData?.[label]?.base
  if (!cls) return null
  return <span className={`text-xs rounded-md px-2 py-0.5 ${cls}`}>{cap(label)}</span>
}

const textClassFor = (status, fallback = "text-muted-foreground") =>
  status && styleData?.[status]?.text ? styleData[status].text : fallback

export default function EvaluationSection() {
  const { feasibility } = useContext(processingContext)

  // Single source of truth from evaluator
  const overallStatus = feasibility?.status ?? "unknown"
  const overallScore  = toNum(feasibility?.score)
  const weekStatus    = feasibility?.week_eval?.status ?? "unknown"
  const weekScore     = toNum(feasibility?.week_eval?.score)
  const dailyStatus   = feasibility?.days_eval?.status ?? "unknown"
  const dailyScore    = toNum(feasibility?.days_eval?.score)

  const overallTextCls = textClassFor(overallStatus)
  const weekTextCls    = textClassFor(weekStatus)
  const dailyTextCls   = textClassFor(dailyStatus)

  // --- Card: Evaluation summary (badge + colored points + mini weekly/daily) --
  const summaryCard = (
    <Card className="shadow-sm">
      <CardContent className="py-4">
        {/* Title row */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <Badge label={overallStatus} />
            <h2 className="text-lg font-semibold">Evaluation</h2>
            {Number.isFinite(overallScore) && (
              <span className={`text-sm ${overallTextCls}`}>({disp(overallScore)} pts)</span>
            )}
          </div>

        {/* Mini summaries (Weekly / Daily) */}
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Badge label={weekStatus} />
              <span className="text-muted-foreground">Weekly:</span>
              <span className={Number.isFinite(weekScore) ? weekTextCls : "text-muted-foreground"}>
                {disp(weekScore)} pts
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Badge label={dailyStatus} />
              <span className="text-muted-foreground">Daily:</span>
              <span className={Number.isFinite(dailyScore) ? dailyTextCls : "text-muted-foreground"}>
                {disp(dailyScore)} pts
              </span>
            </div>
          </div>
        </div>

        {/* Guidance copy */}
        <p className="text-sm text-muted-foreground mt-2">
          Your overall label blends weekly and daily points. Open the details below
          for inputs, formula, thresholds, and per-band explanations.
        </p>
        <DetailsAccordion />
      </CardContent>
      
    </Card>
  )

  // --- Return: dashed border container ---------------------------------------
  const systemStyle = determineStatusStyle(feasibility?.status, "border")
  const styling = `w-[73.5%] mx-auto border-2 border-dashed rounded-xl p-3 md:p-4 space-y- ${systemStyle}`
  return (
    <section className={styling}>
      <h1 className="text-2xl pb-4 text-left pl-4">Evaluation Section</h1>
      {summaryCard}
    </section>
  )
}
