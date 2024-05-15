'use client';

import { ChangeEventHandler } from 'react';

type CreateLeaveRequestSelectedDayOffProps = {
  step2DateName: string;
  step2DateValue: string | undefined;
  step2DateChange: ChangeEventHandler<HTMLInputElement>;
  step2DateError: string | undefined;
  step2StartHourName: string;
  step2StartHourValue: string | undefined;
  step2StartHourChange: ChangeEventHandler<HTMLInputElement>;
  step2StartHourError: string | undefined;
  step2EndHourName: string;
  step2EndHourValue: string | undefined;
  step2EndHourChange: ChangeEventHandler<HTMLInputElement>;
  step2EndHourError: string | undefined;
};

export const CreateLeaveRequestSelectedDayOff = (props: CreateLeaveRequestSelectedDayOffProps) => {
  const {
    step2DateName,
    step2DateValue,
    step2DateChange,
    step2DateError,
    step2StartHourName,
    step2StartHourValue,
    step2StartHourChange,
    step2StartHourError,
    step2EndHourName,
    step2EndHourValue,
    step2EndHourChange,
    step2EndHourError,
  } = props;

  return (
    <div data-cy="leaveRequestDayOff" data-testid="leaveRequestDayOff" className="flex flex-col gap-[16px]">
      <div className="flex flex-col gap-[4px]">
        <div data-cy="step2Label" className="text-[16px] font-normal text-[#121316]">
          Огноо
        </div>
        <div data-testid="date-picker-container" className="w-[100%] p-[8px] bg-[#F7F7F8] rounded-[8px] border-[1px] border-[#D6D8DB]">
          <input
            id="step2Date"
            data-cy="date-picker-container"
            className="w-[100%] bg-[#F7F7F8] text-[#121316]"
            name={step2DateName}
            value={step2DateValue}
            onChange={step2DateChange}
            type="date"
          ></input>
        </div>
        <p className="text-[#DC143C] text-[12px]">{step2DateError}</p>
      </div>
      <div className="flex gap-[16px]">
        <div className="flex flex-col gap-[4px] basis-0 grow">
          <div data-cy="step2Label" className="text-[16px] font-normal text-[#121316]">
            Эхлэх цаг
          </div>
          <div data-testid="startHour-picker-container" className="w-[100%] p-[8px] bg-[#F7F7F8] rounded-[8px] border-[1px] border-[#D6D8DB]">
            <input
              data-cy="startHour-picker-container"
              className="w-[100%] bg-[#F7F7F8] text-[#121316]"
              name={step2StartHourName}
              value={step2StartHourValue}
              onChange={step2StartHourChange}
              type="time"
            ></input>
          </div>
          <p className="text-[#DC143C] text-[12px]">{step2StartHourError}</p>
        </div>
        <div className="flex flex-col gap-[4px] basis-0 grow">
          <div data-cy="step2Label" className="text-[16px] font-normal text-[#121316]">
            Дуусах цаг
          </div>
          <div data-testid="endHour-picker-container" className="w-[100%] p-[8px] bg-[#F7F7F8] rounded-[8px] border-[1px] border-[#D6D8DB]">
            <input
              data-cy="endHour-picker-container"
              className="w-[100%] bg-[#F7F7F8] text-[#121316]"
              name={step2EndHourName}
              value={step2EndHourValue}
              onChange={step2EndHourChange}
              type="time"
            ></input>
          </div>
          <p className="text-[#DC143C] text-[12px]">{step2EndHourError}</p>
        </div>
      </div>
    </div>
  );
};
