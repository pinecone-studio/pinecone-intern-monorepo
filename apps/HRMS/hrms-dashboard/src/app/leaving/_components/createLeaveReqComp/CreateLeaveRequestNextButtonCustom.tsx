'use client';

type NextButtonCustomProps = {
  onClick: () => void;
  disabled: boolean | undefined;
};

export const CreateLeaveRequestNextButtonCustom = (props: NextButtonCustomProps) => {
  const { onClick, disabled } = props;

  return (
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
  );
};
