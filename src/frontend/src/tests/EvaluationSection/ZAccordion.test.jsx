// src/tests/EvaluationSection/ZAccordion.test.jsx
import React from "react";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";

// --- Mock shadcn/ui accordion primitives (keep it minimal & accessible)
vi.mock("@/components/ui/accordion", () => ({
  Accordion: ({ children }) => <div data-testid="accordion">{children}</div>,
  AccordionItem: ({ children }) => <div role="group">{children}</div>,
  AccordionTrigger: ({ children, ...props }) => (
    <button type="button" {...props}>{children}</button>
  ),
  AccordionContent: ({ children }) => <div>{children}</div>,
}));

// --- Mock ProcessingContext (avoid hoist/initialization errors)
vi.mock("@/contexts/ProcessingContext", () => {
  const React = require("react");
  return { processingContext: React.createContext({}) };
});

import ZAccordion from "@/components/EvaluationSection/ZAccordion";
import { processingContext as ProcessingCtx } from "@/contexts/ProcessingContext";

describe("ZAccordion", () => {
  it("renders z-score thresholds in Good → Moderate → Poor order", async () => {
    // Arrange thresholds so we can assert the exact ranges
    const processing = {
      thresholds: { zscore: { good: { upper: 0.5 }, moderate: { upper: 1.5 } } },
    };

    render(
      <ProcessingCtx.Provider value={processing}>
        <ZAccordion />
      </ProcessingCtx.Provider>
    );

    // Header exists (AccordionTrigger renders as a button)
    const trigger = screen.getByRole("button", { name: /Z-Score/i });
    expect(trigger).toBeInTheDocument();

    // If the accordion is collapsed by default, expand it (harmless if already open)
    await userEvent.click(trigger);

    // Find the UL that actually contains the three labels
    const lists = screen.getAllByRole("list");
    const thresholdList = lists.find((l) => {
      const t = (l.textContent || "").toLowerCase();
      return t.includes("good") && t.includes("moderate") && t.includes("poor");
    });
    if (!thresholdList) throw new Error("Threshold list not found");

    const items = within(thresholdList).getAllByRole("listitem");
    expect(items.length).toBe(3);

    // Helper: get the first label token from a list item (“Good”, “Moderate”, or “Poor”)
    const firstLabel = (el) => {
      const t = (el.textContent || "").trim();
      // If the component renders duplicate label fragments (e.g., "GoodGood→..."),
      // grab the first occurrence of any label and use that as the canonical label.
      const m = t.match(/Good|Moderate|Poor/i);
      return m ? m[0] : "";
    };

    // Assert the ordering via the first label token of each <li>
    expect(firstLabel(items[0]).toLowerCase()).toBe("good");
    expect(firstLabel(items[1]).toLowerCase()).toBe("moderate");
    expect(firstLabel(items[2]).toLowerCase()).toBe("poor");

    // Assert the range strings (use regex to ignore minor whitespace/formatting differences)
    // Good:   0 ≤ |z| < 0.5
    expect(items[0]).toHaveTextContent(/0\s*≤\s*\|z\|\s*<\s*0\.5/);

    // Moderate: 0.5 ≤ |z| < 1.5
    expect(items[1]).toHaveTextContent(/0\.5\s*≤\s*\|z\|\s*<\s*1\.5/);

    // Poor:   |z| ≥ 1.5
    expect(items[2]).toHaveTextContent(/\|z\|\s*≥\s*1\.5/);

    // Optional: overall sequence check on the entire list text
    const listText = (thresholdList.textContent || "").replace(/\s+/g, " ");
    expect(listText).toMatch(/Good.*Moderate.*Poor/i);
  });
});
