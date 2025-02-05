type StandartProps = {
  Decrement: () => void;
  Increment: () => void;
  rearCount: number;
};
const RearTicket = ({ Decrement, Increment, rearCount }: StandartProps) => {
  return (
    <div>
      <div className="flex items-center">
        <div data-testid="rear-decrement" onClick={Decrement} className="text-white w-[40px] h-[40px] rounded-sm bg-[#1F1F1F] flex justify-center items-center cursor-pointer">
          -
        </div>
        <div className="text-white mx-4">{rearCount}</div>
        <div data-testid="rear-increment" onClick={Increment} className="text-white w-[40px] h-[40px] rounded-sm bg-[#1F1F1F] flex justify-center items-center cursor-pointer">
          +
        </div>
      </div>
    </div>
  );
};
export default RearTicket;
