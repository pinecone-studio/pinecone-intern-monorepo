type StandartProps = {
  Decrement: () => void;
  Increment: () => void;
  standartClick: number;
  standartCount: number;
  standartRealCount: number;
  standartPrice: number;
  standart: number;
  handleChange: (_event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
};
const StandartTicket = ({ standartRealCount, standart, standartClick, Decrement, Increment, standartCount, standartPrice }: StandartProps) => {
  return (
    <div>
      <div className="border-dashed border-b-2 border-[#27272A] "></div>
      <div className="w-[345px] h-[72px] flex items-center justify-between">
        <div className="flex items-center  justify-items-center">
          <div className="w-[10px] h-[10px] bg-[#C772C4] rounded-full mr-[10px]"></div>
          <div>
            <p className="text-[#C772C4] font-thin " data-testid="standart-ticket">
              Энгийн тасалбар ({standartRealCount === -1 ? standartRealCount + 1 : standartRealCount})
            </p>
            <p className="text-white" data-testid="standart-ticket-price">
              {standartPrice}₮
            </p>
          </div>
        </div>
        <div className="flex items-center">
          <button data-testid="standart-decrement" onClick={Decrement} className="text-white w-[40px] h-[40px] rounded-sm bg-[#1F1F1F] flex justify-center items-center cursor-pointer">
            -
          </button>
          <div data-testid="standard-count" className="text-white mx-4">
            {standartRealCount === -1 ? standartCount - 1 : standartCount}
          </div>
          <button
            data-cy="standart-ticket"
            disabled={standartRealCount <= -1}
            data-testid="standart-increment"
            onClick={Increment}
            className="text-white w-[40px] h-[40px] rounded-sm bg-[#1F1F1F] flex justify-center items-center cursor-pointer"
          >
            +
          </button>
        </div>
      </div>
      <p data-testid="standart-count" className={`${standartRealCount <= -1 ? 'block' : 'hidden'} text-red-500 text-[12px]`}>
        {standart < standartClick ? standartClick : standartCount}-ш тасалбар захиалах боломжгүй байна.
      </p>
    </div>
  );
};
export default StandartTicket;
