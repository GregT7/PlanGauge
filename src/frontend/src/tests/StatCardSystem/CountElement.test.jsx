import { expect, it, describe } from "vitest";
import { screen, render } from "@testing-library/react";
import StatCard from "@/components/StatCardSystem/StatCard";
import CountElement from "@/components/StatCardSystem/CountElement";

describe("CountElement unit tests", () => {
    it("passes snapshot test", () => {
        const styling = "bg-emerald-500";
        const count = 3;
        const { container } = render(<CountElement styling={styling} count={count}/>)
        expect(container).toMatchSnapshot();
    });

    it("handles empty 'count' and 'styling' props without errors", () => {
        const { container } = render(<CountElement/>)
        expect(container).toBeInTheDocument();
    });

    it("handles invalid 'count' and 'styling' props without errors", () => {
        const count = {'objKey': 123};
        const styling = 512;
        const { container } = render(<CountElement count={count} styling={styling}/>)
        expect(container).toBeInTheDocument();
    });

    // applies default styling and count when invalid props are passed
    it("", () => {
        const count = {'objKey': 123};
        const styling = 512;
        const { container } = render(<CountElement count={count} styling={styling}/>)
        
        expect(screen.getByText('x0')).toBeInTheDocument();
        expect(screen.getByTestId('circle-div')).toHaveClass('bg-stone-300')
    })

    it("applies correct styling and count passed as props", () => {
        const count = 5;
        const styling = "bg-teal-200";
        render(<CountElement count={count} styling={styling}/>)

        expect(screen.getByText("x5")).toBeInTheDocument();
        expect(screen.getByTestId('circle-div')).toHaveClass(styling);
    });


})