import toLocalMidnight from "./toLocalMidnight";

export default function validateCardData(cardData) {
    if (typeof cardData === "object") {
        const dayRegex = /Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday/i;
        const statusRegex = /neutral|good|moderate|poor|unknown/i;
        const dateObj = toLocalMidnight(cardData?.date);

        const validName = dayRegex.test(cardData?.name);
        const validAve = typeof cardData?.ave === "number";
        const validDate = dateObj instanceof Date && !isNaN(dateObj.getTime());
        const validStd = typeof cardData?.std === "number";
        const validStatus = statusRegex.test(cardData?.status);
        const validSum = typeof cardData?.sum === "number";

        return validName && validAve && validDate && validStd && validStatus && validSum;
    } else {
        return false;
    }
}