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
import { format } from "date-fns";

function capitalizeFirstLetter(str) {
  if (typeof str !== 'string' || str.length === 0) {
    return str; // Handle non-string or empty inputs
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function determineStatusStyle(status) {
    switch (status) {
        case "neutral":
            return "bg-zinc-900";
        case "good":
            return "bg-emerald-900 border-2 border-emerald-400"
        case "moderate":
            return "bg-amber-900 border-2 border-amber-400"
        case "poor":
            return "bg-rose-900 border-2 border-rose-400";
        default:
            return "bg-red-900 border-2 border-red-500"
    }
}

const StatCard = ({cardData, className=""}) => {
    const cardDate = toLocalMidnight(cardData.date);
    const desciptStr = format(cardDate, 'MMMM d, yyyy')
    
    return (
        <Card className={`${className} ${determineStatusStyle(cardData.status)} h-full overflow-hidden`}>
            <CardHeader className="space-y-1">
                <CardTitle className="text-base truncate">{cardData.name}</CardTitle>
                <CardDescription className="text-sm truncate">{desciptStr}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-1 text-sm">
                <p className="truncate">{`Status: ${capitalizeFirstLetter(cardData.status)}`}</p>
                <p className="truncate">{`Sum: ${cardData.sum} mins`}</p>
            </CardContent>
        </Card>

    );
}

export default StatCard;