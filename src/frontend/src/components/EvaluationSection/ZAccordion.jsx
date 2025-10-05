// ZAccordion.jsx
// Purpose: Explain z-score categorization used for weekly feasibility.
// Ordered visually as Good → Moderate → Poor.

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { useContext, useMemo } from "react"
import { processingContext } from "@/contexts/ProcessingContext"
import styleData from "@/utils/styleData.json"

// ------------------------------- helpers -------------------------------------

const cap = (s) => (typeof s === "string" && s ? s[0].toUpperCase() + s.slice(1) : s)
const toNum = (v) => (typeof v === "number" && Number.isFinite(v) ? v : null)

const renderZRange = (lower, upper) => {
  const lo = toNum(lower)
  const hi = toNum(upper)

  if (lo == null && hi == null) return "—"
  if (lo == null && hi != null) return `|z| < ${hi}`
  if (lo != null && hi == null) return `|z| ≥ ${lo}`
  return `${lo} ≤ |z| < ${hi}`
}

const Badge = ({ label }) => {
  const cls = styleData?.[label]?.base
  if (!cls) return null
  return <span className={`text-xs rounded-md px-2 py-0.5 ${cls}`}>{cap(label)}</span>
}

export default function ZAccordion() {
  const { thresholds: ctxThresholds } = useContext(processingContext)
  const thresholds = ctxThresholds

  const intro =
    "Z-score ranges used to categorize feasibility when comparing weekly time to historical stats. We use the absolute value of z for comparisons."

  // ----------------------------- derived data --------------------------------
  const bands = useMemo(() => {
    const goodU = toNum(thresholds?.zscore?.good?.upper)
    const modU = toNum(thresholds?.zscore?.moderate?.upper)

    const arr = []

    if (goodU != null) arr.push({ label: "good", lower: 0, upper: goodU })

    if (modU != null && goodU != null)
      arr.push({ label: "moderate", lower: goodU, upper: modU })
    else if (modU != null)
      arr.push({ label: "moderate", lower: null, upper: modU })

    if (modU != null) arr.push({ label: "poor", lower: modU, upper: null })

    // ✅ Flip ordering to show Good → Moderate → Poor
    const order = { good: 1, moderate: 2, poor: 3 }
    return arr.sort((a, b) => order[a.label] - order[b.label])
  }, [thresholds])

  // ------------------------------ sections -----------------------------------

  const header = (
    <AccordionTrigger className="text-base">Z-Score Thresholds</AccordionTrigger>
  )

  const description = (
    <p className="text-sm text-muted-foreground mb-3">
      {intro}{" "}
      <span className="whitespace-nowrap">
        <code>z = (x − ave) / std</code>, <code>|z| = absolute value</code>.
      </span>
    </p>
  )

  const list = (
    <div className="rounded-xl border p-3">
      <ul className="list-disc list-inside space-y-1">
        {bands.length ? (
          bands.map((b) => (
            <li key={b.label} className="text-sm flex items-center gap-2">
              <Badge label={b.label} />
              <span className="font-medium capitalize">{cap(b.label)}</span>
              <span className="mx-2">→</span>
              <span className="text-muted-foreground">
                {renderZRange(b.lower, b.upper)}
              </span>
            </li>
          ))
        ) : (
          <li className="text-sm italic text-muted-foreground">No z-score ranges defined.</li>
        )}
      </ul>

      <p className="text-xs text-muted-foreground mt-3">
        <strong>Note:</strong> Z-score requires valid <code>ave</code> and positive{" "}
        <code>std</code>. If <code>std ≤ 0</code> or stats are missing, weekly status becomes{" "}
        <code>unknown</code>.
      </p>
    </div>
  )

  const content = (
    <div className="space-y-3">
      {description}
      {list}
    </div>
  )

  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="z-ranges">
        {header}
        <AccordionContent>{content}</AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
