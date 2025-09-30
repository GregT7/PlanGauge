import StatCard from "./StatCard"

export default function CardRow ({evaluatedCardStatus, daysRegex, gridClassName, cardData}) {
    return (
        <div className={`${gridClassName} gap-4`}>
            {evaluatedCardStatus
            .filter(card => daysRegex.test(card.name))
            .map(card => (
                <div key={card.date} className="flex justify-center items-center">
                <div className="w-44 h-44 shrink-0">
                    <StatCard cardData={card} />
                </div>
                </div>
            ))}
        </div>
    )
}