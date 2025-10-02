
// cardData = [
//   { "name": "Monday",    "ave": 90, "std": 35, "date": "2025-06-16", "status": "neutral", "sum": 0 },
//   { "name": "Tuesday",   "ave": 100, "std": 20, "date": "2025-06-17", "status": "neutral", "sum": 0 },
//   { "name": "Wednesday", "ave": 50, "std": 30, "date": "2025-06-18", "status": "neutral", "sum": 0 },
//   { "name": "Thursday",  "ave": 80, "std": 10, "date": "2025-06-19", "status": "neutral", "sum": 0 },
//   { "name": "Friday",    "ave": 120, "std": 40, "date": "2025-06-20", "status": "neutral", "sum": 0 },
//   { "name": "Saturday",  "ave": 70, "std": 15, "date": "2025-06-21", "status": "neutral", "sum": 0 },
//   { "name": "Sunday",    "ave": 40, "std": 25, "date": "2025-06-22", "status": "neutral", "sum": 0 }
// ]

/* stats = {
    ave: {
        Mon: 10
        Tue: 20,
        ...,
        Sun: 30
    },
    std: {
        Mon: 10
        Tue: 20,
        ...,
        Sun: 30
    }
}

*/

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