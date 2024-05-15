'use client';

import { useContext } from 'react';
import { LeaveRequestCreationContext } from '../_providers/LeaveRequestCreationProvider';

type ButtonCustomProps = {
  onClickPrev?: () => void;
  onClick: () => void;
  disabled: boolean | undefined;
};

export const CreateLeaveRequestButtonCustom = (props: ButtonCustomProps) => {
  const { onClickPrev, onClick, disabled } = props;
  const { leaveReqStep } = useContext(LeaveRequestCreationContext);

  return (
    <div className="pt-[40px] flex justify-between">
      <button
        data-cy="returnPreviousStep"
        data-testid="returnPreviousStep"
        onClick={onClickPrev}
        className={`p-[12px] bg-[#1C20240A] rounded-full ${leaveReqStep.type.name == 'CreateLeaveRequestGeneralInput' ? 'invisible' : 'visible'} `}
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#121316" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
        </svg>
      </button>
      <button
        data-cy="next-btn"
        data-testid="nextButton"
        onClick={onClick}
        className="bg-[#121316] flex gap-[4px] py-[12px] px-[16px] rounded-[8px] text-white disabled:bg-[#D6D8DB] disabled:text-[#1C20243D]"
        disabled={disabled}
      >
        <div className="text-[16px] font-semibold">Дараах</div>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M12 4L10.59 5.41L16.17 11H4V13H16.17L10.59 18.59L12 20L20 12L12 4Z" fill="white" />
        </svg>
      </button>
    </div>
  );
};
