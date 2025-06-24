import { expect, it, describe } from "vitest";
import { screen, render } from "@testing-library/react";
import { useState } from "react";
import StatusCounter from "@/components/StatCardSystem/StatusCounter";

describe("StatusCounter unit testing", () => {
    it("passes snapshot test", () => {
        const statusCount = {"good": 0, "moderate": 0, "poor": 0};
        const { container } = render(<StatusCounter statusCount={statusCount}/>);
        expect(container).toMatchSnapshot();
    })

    it("renders when no props are passed", () => {
        const { container } = render(<StatusCounter/>);
    })

    it("renders when an empty array is passed", () => {
        const { container } = render(<StatusCounter statusCount={{}}/>);
        expect(screen.getByTestId("StatusCounter")).toBeInTheDocument();
    })

    it("renders when a string is passed", () => {
        const { container } = render(<StatusCounter statusCount={"test 123"}/>);
        expect(screen.getByTestId("StatusCounter")).toBeInTheDocument();
    })

    it("renders when one of the keys is missing (good, moderate, poor)", () => {
        const badData = {'good': 0, 'moderate': 0}
        const { container } = render(<StatusCounter statusCount={badData}/>);
        expect(screen.getByTestId("StatusCounter")).toBeInTheDocument();
    })

    it("renders when one of the keys doesn't have a number as a value", () => {
        const badData = {'good': 0, 'moderate': 0, 'poor': 'random text'}
        const { container } = render(<StatusCounter statusCount={badData}/>);
        expect(screen.getByTestId("StatusCounter")).toBeInTheDocument();
    });

    
    it("render with bad props and check to see that x0 is present x3 times and correct styling is applied", () => {
        const badData = {'good': 0, 'moderate': 0}
        render(<StatusCounter statusCount={badData}/>);
        const counters = screen.getAllByTestId('circle-div');
        expect(counters.length).toEqual(3);
        
        const firstCircle = counters[0];
        const text = firstCircle.parentElement.querySelector('span').textContent;
        expect(text).toBe('x0');

        const styleRegex = /bg-amber-500|bg-emerald-500|bg-rose-500/
        expect(counters[0]).toHaveClass(styleRegex)
        expect(counters[1]).toHaveClass(styleRegex)
        expect(counters[2]).toHaveClass(styleRegex)
    })
});