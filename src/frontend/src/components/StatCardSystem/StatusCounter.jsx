import CountElement from "./CountElement";

function StatusCounter({statusCount}) {
    return (
        <div className="flex justify-center gap-5 items-center py-5">
            <CountElement styling={"bg-emerald-500"} count={statusCount.good}/>
            <CountElement styling={"bg-amber-500"} count={statusCount.moderate}/>
            <CountElement styling={"bg-rose-500"} count={statusCount.poor}/>
        </div>
    );
}

export default StatusCounter;