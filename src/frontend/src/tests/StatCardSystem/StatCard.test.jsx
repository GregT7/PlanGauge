import { expect, it, describe } from "vitest";
import { screen, render } from "@testing-library/react";
import StatCard from "@/components/StatCardSystem/StatCard";
import toLocalMidnight from "@/utils/toLocalMidnight";
import { format } from "date-fns";

const cardData = { "name": "Monday", "ave": 90, "std": 35, "date": "2025-06-16", "status": "neutral", "sum": 500 };
const goodData = { "name": "Tuesday", "ave": 90, "std": 35, "date": "2025-06-17", "status": "good", "sum": 90 };
const moderateData = { "name": "Wednesday", "ave": 90, "std": 35, "date": "2025-06-18", "status": "moderate", "sum": 990 };
const poorData = { "name": "Thursday", "ave": 90, "std": 35, "date": "2025-06-19", "status": "poor", "sum": 34 };
const unknownData = { "name": "Monday", "ave": 90, "std": 35, "date": "2025-06-16", "status": "unknown", "sum": -1 }

describe("StatCard unit testing", () => {
    it("passes snapshot test", () => {
        const { container } = render(<StatCard cardData={cardData}/>);
        expect(container).toMatchSnapshot();
    })

    it("handles empty 'cardData' and 'className' props passed", ()=> {
        render(<StatCard/>)
        expect(screen.getByTestId('StatCard')).toBeInTheDocument();
    })

    it("handles invalid className prop", () => {
        render(<StatCard className={{test: "123"}}/>)
        expect(screen.getByTestId('StatCard')).toBeInTheDocument();
    });

    // completely invalid: not an object, or an object with no matching keys
    it("handles completely invalid 'cardData' passed as props", () => {
        const cardData = "data 123"
        render(<StatCard cardData={cardData}/>)
        expect(screen.getByTestId('StatCard')).toBeInTheDocument();
    })

    //  { "name": "Monday",    "ave": 90, "std": 35, "date": "2025-06-16", "status": "neutral", "sum": 0 },
    it("correctly parses & renders cardData when valid props are passed", () => {
        render(<StatCard cardData={cardData}/>);

        const dateStr = format(toLocalMidnight(cardData.date), 'MMMM d, yyyy')
        expect(screen.getByText(dateStr)).toBeInTheDocument();
        expect(screen.getByText("Monday")).toBeInTheDocument();

        let capitalizedStr = cardData.status.charAt(0).toUpperCase() + cardData.status.slice(1)
        capitalizedStr = "Status: " + capitalizedStr;
        expect(screen.getByText(capitalizedStr)).toBeInTheDocument();

        const sumText = "Sum: " + cardData.sum + " mins"
        expect(screen.getByText(sumText)).toBeInTheDocument();


        screen.debug();
    })



    it("applies the correct styling based on passed status (neutral, good, moderate, poor, uknown)", () => {
        // status: neutral
        const { unmount: unmount1 } = render(<StatCard cardData={cardData}/>)
        expect(screen.getByTestId("StatCard")).toHaveClass("bg-zinc-900");
        unmount1();

        // status: good
        const { unmount: unmount2 } = render(<StatCard cardData={goodData}/>)
        expect(screen.getByTestId("StatCard")).toHaveClass("bg-emerald-800 border-emerald-600");
        unmount2();

        // status: moderate
        const { unmount: unmount3 } = render(<StatCard cardData={moderateData}/>)
        expect(screen.getByTestId("StatCard")).toHaveClass("bg-amber-800 border-2 border-amber-600");
        unmount3();

        // status: poor
        const { unmount: unmount4 } = render(<StatCard cardData={poorData}/>)
        expect(screen.getByTestId("StatCard")).toHaveClass("bg-rose-800 border-2 border-rose-600");
        unmount4();

        // status: unknown
        const { unmount: unmount5 } = render(<StatCard cardData={unknownData}/>)
        expect(screen.getByTestId("StatCard")).toHaveClass("bg-red-800 border-2 border-red-600");
        unmount5();
    })
})