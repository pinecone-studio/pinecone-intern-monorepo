import {render } from "@testing-library/react";
import React from "react";
import {Day} from "../../../src/app/leaving/_components/calendarComponents/Days"

describe("Show Absense workers of specific day",()=>{
    const props = {
    __typename: "leaveRequest",
    leaveType: "MEDICAL",
    name: "WorkerName",
    startDate: "2024-05-09"
    }
    const props2 = {
        __typename: "leaveRequest",
        leaveType: "SHIT_HAPPENED",
        name: "WorkerName",
        startDate: "2024-05-09"
        }
    it('1. should show div', ()=>{
        const renderDay = render(<Day data={[props]}/>)
        expect(renderDay).toBeDefined()

    })
    it('2. should show p',()=>{
        const { getAllByTestId} = render(<Day data={[props]}/>)
        const test = getAllByTestId('requestName')[0]
        expect(test).toBeDefined()
    })
    it('3. if leave Request is Medical it should change color', ()=>{
        const { getAllByTestId} = render(<Day data={[props2]}/>)
        const test = getAllByTestId('requestName')[0]
        expect(test).toBeDefined()
    })
})