export function genDefaultCardData(date = new Date()) {
    const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
    return { name: dayName, ave: -1, std: -1, sum: -1, date, status: "neutral" };
}

// [
//   { "name": "Monday",    "ave": 90, "std": 35, "date": "2025-06-16", "status": "neutral", "sum": 0 },
//   { "name": "Tuesday",   "ave": 100, "std": 20, "date": "2025-06-17", "status": "neutral", "sum": 0 },
//   { "name": "Wednesday", "ave": 50, "std": 30, "date": "2025-06-18", "status": "neutral", "sum": 0 },
//   { "name": "Thursday",  "ave": 80, "std": 10, "date": "2025-06-19", "status": "neutral", "sum": 0 },
//   { "name": "Friday",    "ave": 120, "std": 40, "date": "2025-06-20", "status": "neutral", "sum": 0 },
//   { "name": "Saturday",  "ave": 70, "std": 15, "date": "2025-06-21", "status": "neutral", "sum": 0 },
//   { "name": "Sunday",    "ave": 40, "std": 25, "date": "2025-06-22", "status": "neutral", "sum": 0 }
// ]

// 


function genDaysOfCurrentWeek() {
    // Get current date
    const today = new Date();

    // Calculate first day (Monday)
    const firstDayOfWeek = new Date(today);
    const day = today.getDay(); // Sunday = 0, Monday = 1, ..., Saturday = 6
    const diffToMonday = (day === 0 ? -6 : 1 - day);
    firstDayOfWeek.setDate(today.getDate() + diffToMonday);

    let days = []
    for (let i = 0; i < 7; ++i) {
        const nextDay = new Date(firstDayOfWeek);
        nextDay.setDate(firstDayOfWeek.getDate() + i);
        days.push(nextDay)
    }

    return days
}


export function genDefaultCardsData() {
    let cardData = []
    const days = genDaysOfCurrentWeek()

    for (const day of days) {
        cardData.push(genDefaultCardData(day));
    }

    return cardData
}