// PointsAccordion.jsx
// Purpose: Display how numeric scores map to feasibility categories (via points),
//          and the "overall" score ranges used for labeling.
// Design notes:
//  - Use your thresholds from context; fall back to defaultThresholds.json.
//  - Use styleData.json to render consistent badges if available.
//  - Round only for display, never for underlying comparisons here.

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { useContext, useMemo } from "react"
import { processingContext } from "@/contexts/ProcessingContext"

// ✅ Your provided files (fallback + styles)
import defaultThresholds from "@/utils/defaultThresholds.json"
import styleData from "@/utils/styleData.json"

// --- Small helpers ------------------------------------------------------------

// Capitalizes a category key like "good" -> "Good"
const cap = (s) => (typeof s === "string" && s.length ? s[0].toUpperCase() + s.slice(1) : s)

// Renders a consistent "a ≤ score < b" string.
// If no lower, show "score < b". If no upper, show "score ≥ a".
// Treat `upper === 100` as inclusive for readability.
const renderRange = (lower, upper) => {
  const hasLower = Number.isFinite(lower)
  const hasUpper = Number.isFinite(upper)

  if (!hasLower && !hasUpper) return "—"
  if (!hasLower && hasUpper) return `score < ${upper}`
  if (hasLower && !hasUpper) return `score ≥ ${lower}`

  const inclusiveMax = upper === 100 // convention: top bucket includes 100
  return `${lower} ≤ score ${inclusiveMax ? "≤" : "<"} ${upper}`
}

// Optional: render a styled badge based on styleData (if exists)
const Badge = ({ label }) => {
  const cls = styleData?.[label]?.base // e.g., styleData.good.base
  if (!cls) return null
  return (
    <span
      className={`text-xs rounded-md px-2 py-0.5 whitespace-nowrap ${cls}`}
      title={cap(label)}
      aria-label={cap(label)}
    >
      {cap(label)}
    </span>
  )
}

export default function PointsAccordion() {
  // Pull thresholds from context; fall back to your defaults for robustness.
  const { thresholds: ctxThresholds } = useContext(processingContext)
  const thresholds = ctxThresholds ?? defaultThresholds

  // --- COPY (tight + clear) ---------------------------------------------------
  const mappingDesc =
    "Maps feasibility categories to points used in daily/weekly computations and the overall score."

  const rangeDesc =
    "Overall score ranges used to translate a numeric score back to a feasibility label. Round only for display, not for calculations."

  // --- DERIVED DATA -----------------------------------------------------------
  // points: { good: 100, moderate: 60, poor: 0, ... }
  const pointMapEntries = useMemo(() => {
    const map = thresholds?.points ?? {}
    return Object.entries(map).sort((a, b) => b[1] - a[1]) // show highest first
  }, [thresholds])

  // overall: { good: { lower: 75, upper: 100 }, moderate: { lower: 50, upper: 75 } }
  // Convert to an array with a stable sorting (highest band first by lower bound).
  const overallRanges = useMemo(() => {
    const o = thresholds?.overall ?? {}
    return Object.entries(o)
      .map(([label, range]) => ({ label, ...range }))
      .filter((r) => r && (Number.isFinite(r.lower) || Number.isFinite(r.upper)))
      .sort((a, b) => (b.lower ?? -Infinity) - (a.lower ?? -Infinity))
  }, [thresholds])

  // --- JSX PIECES -------------------------------------------------------------
  const header = (
    <AccordionTrigger className="text-base">Point Thresholds</AccordionTrigger>
  )

  const mappingSection = (
    <section>
      <h4 className="text-sm font-semibold mb-1">Mapping (Category → Points)</h4>
      <p className="text-sm text-muted-foreground mb-3">{mappingDesc}</p>

      <div className="rounded-xl border p-3">
        <ul className="list-disc list-inside space-y-1">
          {pointMapEntries.length ? (
            pointMapEntries.map(([label, pts]) => (
              <li key={label} className="text-sm flex items-center gap-2">
                {/* Badge + Label */}
                <Badge label={label} />
                <span className="font-medium capitalize">{cap(label)}</span>

                {/* Separator */}
                <span className="mx-2">→</span>

                {/* Points */}
                <span>{pts} pts</span>
              </li>
            ))
          ) : (
            <li className="text-sm italic text-muted-foreground">No mapping defined.</li>
          )}
        </ul>
      </div>
    </section>
  )


  const rangesSection = (
    <section>
      <h4 className="text-sm font-semibold mb-1">Ranges (Overall Score → Category)</h4>
      <p className="text-sm text-muted-foreground mb-3">{rangeDesc}</p>

      <div className="rounded-xl border p-3">
        <ul className="list-disc list-inside space-y-1">
          {overallRanges.length ? (
            overallRanges.map((r) => (
              <li key={r.label} className="text-sm flex items-center gap-2">
                {/* Badge + Label */}
                <Badge label={r.label} />
                <span className="font-medium capitalize">{cap(r.label)}</span>

                {/* Separator */}
                <span className="mx-2">→</span>

                {/* Range text */}
                <span className="text-muted-foreground">
                  {renderRange(r.lower, r.upper)}
                </span>
              </li>
            ))
          ) : (
            <li className="text-sm italic text-muted-foreground">No overall ranges defined.</li>
          )}
        </ul>
      </div>
    </section>
  )

  const content = (
    <div className="space-y-6">
      {mappingSection}
      {rangesSection}
    </div>
  )

  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="points">
        {header}
        <AccordionContent>{content}</AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
