import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import toLocalMidnight from "@/utils/toLocalMidnight";
import styleData from "@/utils/styleData.json"
import { format } from "date-fns";

const today = new Date();
const defaultCardData = {name: today.day, ave: -1, std: -1, sum: -1, date: today, status: "neutral"};

function capitalizeFirstLetter(str) {
  if (typeof str !== 'string' || str.length === 0) {
    return str; // Handle non-string or empty inputs
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function determineStatusStyle(status) {
    if (styleData?.[status]) {
        return styleData[status].base
    } else {
        return styleData.error.base
    }
}


function validateCardData(cardData) {
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

const StatCard = ({cardData=defaultCardData, className=""}) => {
    const valClassName = typeof className === "string" ? className : "";
    const valCardData = validateCardData(cardData) ? cardData : defaultCardData;


    const cardDate = toLocalMidnight(valCardData?.date);
    const desciptStr = format(cardDate, 'MMMM d, yyyy')
    
    return (
        <Card className={`${valClassName} ${determineStatusStyle(valCardData.status)} h-full overflow-hidden`} data-testid="StatCard">
            <CardHeader className="space-y-1">
                <CardTitle className="text-base truncate">{valCardData.name}</CardTitle>
                <CardDescription className="text-sm truncate">{desciptStr}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-1 text-sm">
                <p className="truncate">{`Status: ${capitalizeFirstLetter(valCardData.status)}`}</p>
                <p className="truncate">{`Sum: ${valCardData.sum} mins`}</p>
            </CardContent>
        </Card>
    );
}

export default StatCard;