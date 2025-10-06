import toLocalMidnight from "./toLocalMidnight"
export default function updateCardStats(cardData, stats) {
    if (!Array.isArray(cardData) || !stats) return false;

    try {
        for (const card of cardData) {
            const cardDate = toLocalMidnight(card?.date)
            const dayKey = cardDate
                ? cardDate.toLocaleDateString('en-US', { weekday: 'short' }) // "Mon", "Tue", ...
                : null;

            if (dayKey) {
                if (stats?.ave && dayKey in stats.ave) card.ave = stats.ave[dayKey];
                if (stats?.std && dayKey in stats.std) card.std = stats.std[dayKey];
            }
        }
        return true
    } catch (error) {
        console.log("Updating stat card data failed: ", error.message)
        return false
    }
}