// SubmissionButton.jsx — replace your handlers with this version
import { useRef, useContext, useState } from "react";
import { Button } from "@/components/ui/button";
import submitPlans from "@/utils/submitPlans";
import { TaskContext } from "@/contexts/TaskContext";
import formatDateToYYYYMMDD from "@/utils/formatDateToYYYYMMDD";
import { DEFAULT_PLAN_START, DEFAULT_PLAN_END } from "@/utils/planningRange";
import { toast } from "sonner";
import styleData from "@/utils/styleData.json";
import { processingContext } from "@/contexts/ProcessingContext";
import { ConfigContext } from "@/contexts/ConfigContext"

function SubmissionButton({
  status = "neutral",
  filter_start_date = DEFAULT_PLAN_START,
  filter_end_date = DEFAULT_PLAN_END,
}) {
  const { tasks } = useContext(TaskContext);
  const { feasibility } = useContext(processingContext);
  const config = useContext(ConfigContext)

  const [isDisabled, setIsDisabled] = useState(false);

  // Re-entrancy lock for true simultaneity
  const inFlightRef = useRef(null); // holds the current Promise or null
  // Recent identical submission guard
  const lastSigRef = useRef({ hash: null, time: 0 });

  function fmtTasks(records) {
    const copy = structuredClone(records);
    copy.forEach((r, i) => {
      copy[i].due_date = formatDateToYYYYMMDD(copy[i].due_date);
      copy[i].start_date = formatDateToYYYYMMDD(copy[i].start_date);
    });
    return copy;
  }

  // Simple stable “hash” via JSON
  const signatureOf = (payload) => JSON.stringify(payload);

  const handleClickSubmit = async () => {
    // Build current payload at click time
    const payload = {
      tasks: fmtTasks(tasks),
      filter_start_date,
      filter_end_date,
    };
    const sig = signatureOf(payload);

    // 1) If a submission is currently in flight, ignore
    if (inFlightRef.current) return;

    // 2) If the same payload was just submitted within 1s, ignore
    const now = Date.now();
    if (
      lastSigRef.current.hash === sig &&
      now - lastSigRef.current.time < 1000
    ) {
      return;
    }

    setIsDisabled(true);
    try {
      // Kick off exactly one submission and lock
      const promise = submitPlans(
        payload.tasks,
        payload.filter_start_date,
        payload.filter_end_date,
        config.flaskUrl.plan_submissions
      ); // this does a single fetch POST:contentReference[oaicite:1]{index=1}
      inFlightRef.current = promise;

      await toast.promise(promise, {
        loading: "Submitting Plan Records...",
        success: "Data Successfully Saved!",
        error: "Error: There Was An Unexpected Issue!",
      });

      // Mark successful recent submission signature + time
      lastSigRef.current = { hash: sig, time: Date.now() };
    } catch (err) {
      console.log("Submission exception caught: ", err);
      toast.error(err?.message || "Error: There Was An Unexpected Issue!");
    } finally {
      inFlightRef.current = null;
      setIsDisabled(false);
    }
  };

  const handleClickDemo = async () => {
    if (inFlightRef.current) return;
    const promise = new Promise((resolve) =>
      setTimeout(() => resolve({ name: "Sonner" }), 4000)
    );
    inFlightRef.current = promise;
    setIsDisabled(true);
    try {
      await toast.promise(promise, {
        loading: "Mocking plan submission...",
        success: () => "Mock submission successful!",
        error: "Error: Mock submission failed!",
      });
    } finally {
      inFlightRef.current = null;
      setIsDisabled(false);
    }
  };

  function handleStyling(s) {
    return (styleData?.[s]?.base || styleData.unknown.base) + " " + (styleData?.[s]?.hover || styleData.unknown.hover);
  }

  const style = "text-xl p-6 " + handleStyling(feasibility?.status);
  const handleClick = config.isDemo ? handleClickDemo : handleClickSubmit;

  return (
    <Button
      type="button"
      onClick={handleClick}
      className={style}
      disabled={isDisabled}
      aria-disabled={isDisabled}
      aria-busy={!!inFlightRef.current}
    >
      Submit
    </Button>
  );
}

export default SubmissionButton;
