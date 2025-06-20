import { useMemo, createContext, useContext } from "react";
import { TaskContext } from "./TaskContext";
import evaluatePlan from "@/utils/evaluatePlan";

export const EvaluationContext = createContext(undefined);

export default function EvaluationContextProvider({ children, statuses }) {
    const { tasks, timeSum } = useContext(TaskContext);
    const evaluation = useMemo(() => evaluatePlan(statuses, timeSum), 
        [tasks]
    );

    return (
        <EvaluationContext.Provider value={evaluation}>
            {children}
        </EvaluationContext.Provider>
    );
};