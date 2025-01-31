type StandartProps = {
  Decrement: () => void;
  Increment: () => void;
  vipCount: number;
};
const VipTicket = ({ Decrement, Increment, vipCount }: StandartProps) => {
  return (
    <div>
      <div className="flex items-center">
        <div data-testid="vip-decrement" onClick={Decrement} className="text-white w-[40px] h-[40px] rounded-sm bg-[#1F1F1F] flex justify-center items-center cursor-pointer">
          -
        </div>
        <div className="text-white mx-4">{vipCount}</div>
        <div data-testid="vip-increment" onClick={Increment} className="text-white w-[40px] h-[40px] rounded-sm bg-[#1F1F1F] flex justify-center items-center cursor-pointer">
          +
        </div>
      </div>
    </div>
  );
};
export default VipTicket;
