'use client';
export const SubmitButton = ({ text }: { text: string }) => {
  return (
    <div data-testid="contained-submit-buttons-id" className="flex flex-col gap-[20px]">
      <button
        data-testid="submit-button-id"
        className="w-[339px] h-[56px] justify-center flex flex-col items-center self-stretch rounded-lg  border-0 transition-transform transform active:scale-95 hover:scale-100 duration-300 ease-in-out"
        style={{ background: text === 'Ноорогт хадгалах' ? '#f6f6f6' : '#D6D8D8' }}
      >
        <span data-testid="content-draft-button-id" className="text-lg font-semibold non-italic leading-6" style={{ color: 'rgba(28, 32, 36, 0.24)' }}>
          {text}
        </span>
      </button>
    </div>
  );
};
