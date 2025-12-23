// SubmissionButton.jsx — replace your handlers with this version
import { useContext, useState } from "react";
import { Button } from "@/components/ui/button";
import { TaskContext } from "@/contexts/TaskContext";
import formatDateToYYYYMMDD from "@/utils/formatDateToYYYYMMDD";
import { toast } from "sonner";
import styleData from "@/utils/styleData.json";
import { processingContext } from "@/contexts/ProcessingContext";
import { ConfigContext } from "@/contexts/ConfigContext"
import { handleSubmit } from "@/utils/modeUtils";
import { AuthContext } from "@/contexts/AuthContext";
import { determineCapabilities } from "@/contexts/modeConfig";
import { MODES } from "@/contexts/modeConfig";

function SubmissionButton({status = "neutral"}) {
  const { tasks } = useContext(TaskContext);
  const { feasibility } = useContext(processingContext);
  const { mode, setUser, setMode } = useContext(AuthContext);
  const config = useContext(ConfigContext)
  const [isDisabled, setIsDisabled] = useState(false);

  function formatDates(records) {
    records.forEach((item, index) => {
        records[index].due_date = formatDateToYYYYMMDD(records[index].due_date);
        records[index].start_date = formatDateToYYYYMMDD(records[index].start_date);
    })
  }

  function handleStyling(status) {
    if (styleData?.[status]) {
        return styleData[status].base + " " + styleData[status].hover
    } else {
        return styleData.unknown.base + " " + styleData.unknown.hover
    }
  }

  let tasksCopy = structuredClone(tasks)
  formatDates(tasksCopy);
  const capabilities = determineCapabilities(mode);
  async function handleOnClick() {
    const resp = await handleSubmit(config, capabilities, tasksCopy, setIsDisabled)
    if (resp?.ok === false && resp.message === "UNAUTHORIZED") {
      setUser(null)
      setMode(MODES.VISITOR)
    }
  }

  const style = "text-xl p-6 " + handleStyling(feasibility?.status)

  return (
    <Button onClick={handleOnClick} className={style} disabled={isDisabled}>
      Submit
    </Button>
  );
}

export default SubmissionButton;