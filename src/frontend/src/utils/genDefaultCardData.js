export function genDefaultCardData(date = new Date()) {
    const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
    return { name: dayName, ave: -1, std: -1, sum: -1, date, status: "neutral" };
}

export function genDaysOfCurrentWeek() {
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

function getTestCardsData() {
    let days = []
    
    days.push(new Date(2025, 9, 20));
    days.push(new Date(2025, 9, 21));
    days.push(new Date(2025, 9, 22));
    days.push(new Date(2025, 9, 23));
    days.push(new Date(2025, 9, 24));
    days.push(new Date(2025, 9, 25));
    days.push(new Date(2025, 9, 26));

    return days
}


export function genDefaultCardsData() {
    let cardData = []
    // const days = genDaysOfCurrentWeek()
    const days = getTestCardsData()

    for (const day of days) {
        cardData.push(genDefaultCardData(day));
    }

    return cardData
}