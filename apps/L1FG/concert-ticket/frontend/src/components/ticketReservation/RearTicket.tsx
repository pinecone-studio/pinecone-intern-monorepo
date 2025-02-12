type StandartProps = {
  Decrement: () => void;
  Increment: () => void;
  rearCount: number;
  rearRealCount: number;
  rearPrice: number;
  rearClick: number;
  rear: number;
};
const RearTicket = ({ Decrement, Increment, rearCount, rearRealCount, rearPrice, rear, rearClick }: StandartProps) => {
  return (
    <div>
      <div className="border-dashed border-b-2 border-[#27272A] "></div>
      <div className="w-[345px] h-[72px] flex items-center justify-between">
        <div className="flex items-center  justify-items-center">
          <div className="w-[10px] h-[10px] bg-[#D7D7F8] rounded-full mr-[10px]"></div>
          <div>
            <p className="text-[#D7D7F8] font-thin">Арын тасалбар ({rearRealCount === -1 ? rearRealCount + 1 : rearRealCount})</p>
            <p datatest-id="backside-" className="text-white">
              {rearPrice}₮
            </p>
          </div>
        </div>
        <div className="flex items-center">
          <div data-testid="rear-decrement" onClick={Decrement} className="text-white w-[40px] h-[40px] rounded-sm bg-[#1F1F1F] flex justify-center items-center cursor-pointer">
            -
          </div>
          <div className="text-white mx-4"> {rearRealCount === -1 ? rearCount - 1 : rearCount}</div>
          <button
            disabled={rearRealCount <= -1}
            data-testid="rear-increment"
            onClick={Increment}
            className="text-white w-[40px] h-[40px] rounded-sm bg-[#1F1F1F] flex justify-center items-center cursor-pointer"
          >
            +
          </button>
        </div>
      </div>
      <p data-testid="rear-count" className={`${rearRealCount <= -1 ? 'block' : 'hidden'} text-red-500 text-[12px]`}>
        {rear < rearClick ? rearClick : rearCount}-ш тасалбар захиалах боломжгүй байна.
      </p>
    </div>
  );
};
export default RearTicket;
