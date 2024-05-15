'use client';

type PreviousButtonCustomProps = {
  onClickPrev: () => void;
};

export const CreateLeaveRequestPreviousButtonCustom = (props: PreviousButtonCustomProps) => {
  const { onClickPrev } = props;

  return (
    <button data-cy="returnPreviousStep" data-testid="returnPreviousStep" onClick={onClickPrev} className={`p-[12px] bg-[#1C20240A] rounded-full  `}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#121316" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
      </svg>
    </button>
  );
};
