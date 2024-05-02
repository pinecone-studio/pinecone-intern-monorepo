import React from "react"
import { fireEvent, render, screen , act} from "@testing-library/react"
import { Input } from "../../../glms-dashboard/src/app/challenge-dashboard/_components"

describe("Input", ()=>{
    it("Should render input component", () => {
        render(<Input/>)
        const field  = screen.queryByTestId("search-text-field")
        expect(field).toBeDefined()
            fireEvent.change(field! ,{target: { value: 'text'}});
            expect(field?.value).toBe('text');
      })
})