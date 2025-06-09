import React from "react";
import NameInput from "../components/NameInput";
import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest";


describe("NameInput", () => {
    it("works with an empty task", () => {
        render(<NameInput task={{}}/>)
        
    })
});