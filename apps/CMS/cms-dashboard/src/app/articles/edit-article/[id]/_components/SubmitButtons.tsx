export const SubmitButtons = () => {
  return (
    <div data-testid="contained-submit-buttons-id" className="flex flex-col gap-[20px]">
      <button
        data-testid="draft-button-id"
        className="w-[339px] h-[56px] justify-center flex flex-col items-center self-stretch rounded-lg bg-[#F6F6F6] border-0 transition-transform transform active:scale-95 hover:scale-100 duration-300 ease-in-out"
      >
        <span data-testid="content-draft-button-id" className="text-lg font-semibold non-italic leading-6" style={{ color: 'rgba(28, 32, 36, 0.24)' }}>
          Ноорогт хадгалах
        </span>
      </button>
      <button
        data-testid="publish-button-id"
        className="w-[339px] h-[56px] justify-center flex flex-col items-center self-stretch rounded-lg bg-[#D6D8DB] border-0 transition-transform transform active:scale-95 hover:scale-100 duration-300 ease-in-out"
      >
        <span data-testid="content-publish-button-id" className="text-lg font-semibold non-italic leading-6" style={{ color: 'rgba(28, 32, 36, 0.24)' }}>
          Нийтлэх
        </span>
      </button>
    </div>
  );
};
