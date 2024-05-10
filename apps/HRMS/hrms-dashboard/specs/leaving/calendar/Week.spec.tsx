import React from "react";
import { render } from "@testing-library/react";
import {CalendarWeek} from "../../../src/app/leaving/_components/calendarComponents/Week"
import { TDay } from "../../../src/app/leaving/_components/calendarComponents/DataMatrix";
import dayjs, { Dayjs } from "dayjs";


type TWeek = {
    leaveRequestOfDay: TDay[];
    day: Dayjs;
  };

  const a:TWeek[][] = [[{day: dayjs(), leaveRequestOfDay:[{__typename: "",
  leaveType: "",
  name: "",
  startDate: ""}]
  }]]

describe("Show Absense workers of specific day",()=>{

    it('1. should show div', ()=>{
        const renderWeek = render(<CalendarWeek data={a} />)
        expect(renderWeek).toBeDefined()
    })
    it("2. should show div",()=>{
        const {getAllByTestId} = render(<CalendarWeek data={a}/>)
        const test = getAllByTestId("weekRequests")[0]
        expect(test).toBeDefined()
    })
})