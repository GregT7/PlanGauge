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
import capitalizeFirstLetter from "@/utils/capitalizeFirstLetter"
import determineStatusStyle from "@/utils/determineStatusStyle"
import validateCardData from "@/utils/validateCardData"
import { genDefaultCardData } from "@/utils/genDefaultCardData";
import { format } from "date-fns";

const StatCard = ({cardData=genDefaultCardData(), className=""}) => {
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