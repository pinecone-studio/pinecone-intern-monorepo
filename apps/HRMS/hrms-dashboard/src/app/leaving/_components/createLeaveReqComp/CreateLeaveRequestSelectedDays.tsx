'use client';

import { ChangeEventHandler } from 'react';

type CreateLeaveRequestSelectedDaysProps = {
  step2StartDateName: string;
  step2StartDateValue: undefined;
  step2StartDateChange: ChangeEventHandler<HTMLInputElement>;
  step2StartDateError: string | undefined;
  step2EndDateName: string;
  step2EndDateValue: undefined;
  step2EndDateChange: ChangeEventHandler<HTMLInputElement>;
  step2EndDateError: string | undefined;
};

export const CreateLeaveRequestSelectedDays = (props: CreateLeaveRequestSelectedDaysProps) => {
  const { step2StartDateName, step2StartDateValue, step2StartDateChange, step2StartDateError, step2EndDateName, step2EndDateValue, step2EndDateChange, step2EndDateError } = props;
  return (
    <div data-cy="leaveRequestDays" data-testid="leaveRequestDays">
      <div className="flex flex-col gap-[4px]">
        <div data-cy="step2Label" className="text-[16px] font-normal text-[#121316]">
          Эхлэх өдөр
        </div>
        <div data-testid="starDate-picker-container" className="w-[100%] p-[8px] bg-[#F7F7F8] rounded-[8px] border-[1px] border-[#D6D8DB]">
          <input
            id="step2Date"
            data-cy="starDate-picker-container"
            className="w-[100%] bg-[#F7F7F8] text-[#121316]"
            name={step2StartDateName}
            value={step2StartDateValue}
            onChange={step2StartDateChange}
            type="date"
          ></input>
        </div>
        <p className="text-[#DC143C] text-[12px]">{step2StartDateError}</p>
      </div>
      <div className="flex flex-col gap-[4px]">
        <div data-cy="step2Label" className="text-[16px] font-normal text-[#121316]">
          Дуусах өдөр
        </div>
        <div data-testid="endDate-picker-container" className="w-[100%] p-[8px] bg-[#F7F7F8] rounded-[8px] border-[1px] border-[#D6D8DB]">
          <input
            id="step2Date"
            data-cy="endDate-picker-container"
            className="w-[100%] bg-[#F7F7F8] text-[#121316]"
            name={step2EndDateName}
            value={step2EndDateValue}
            onChange={step2EndDateChange}
            type="date"
          ></input>
        </div>
        <p className="text-[#DC143C] text-[12px]">{step2EndDateError}</p>
      </div>
    </div>
  );
};
