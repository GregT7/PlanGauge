import CountElement from "./CountElement";

const defaultCount = {"good": 0, "moderate": 0, "poor": 0};

function StatusCounter({statusCount = defaultCount}) {
    // const isObject = typeof statusCount === "object";
    const hasValidkeys = Boolean(
        Number.isInteger(statusCount?.["good"]) && 
        Number.isInteger(statusCount?.["moderate"]) && 
        Number.isInteger(statusCount?.["poor"])
    );

    const validatedStatCount = hasValidkeys ? statusCount : defaultCount;
    
    return (
        <div className="flex justify-center gap-5 items-center py-5" data-testid="StatusCounter">
            <CountElement styling={"bg-emerald-500"} count={statusCount.good}/>
            <CountElement styling={"bg-amber-500"} count={statusCount.moderate}/>
            <CountElement styling={"bg-rose-500"} count={statusCount.poor}/>
        </div>
    );
}

export default StatusCounter;