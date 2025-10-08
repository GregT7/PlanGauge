import StatCard from "./StatCard"

export default function CardRow({ daysRegex, gridClassName, cardData }) {
  if (!Array.isArray(cardData)) return null;

  return (
    <div className={`${gridClassName} gap-4`}>
      {cardData
        .filter(card => daysRegex.test(card.name))
        .map(card => (
          <div key={card.date} className="flex justify-center items-center">
            <div className="w-44 h-44 shrink-0">
              <StatCard cardData={card} status={card.status} />
            </div>
          </div>
        ))}
    </div>
  );
}
