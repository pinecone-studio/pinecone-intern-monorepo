import React from "react"
import { fireEvent, render, screen } from "@testing-library/react"
import { InputValue } from "../../../src/app/challenge-dashboard/_components/"

describe("Input", ()=>{
    it("Should render input component", () => {
        render(<InputValue/> )
        const field  = screen.queryByTestId("search-text-field")
        expect(field).toBeDefined()

        fireEvent.change(field! ,{target: { value: 'text'}});
        expect(field?.value).toBe('text');
      })
})