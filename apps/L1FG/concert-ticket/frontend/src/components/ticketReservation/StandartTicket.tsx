type StandartProps = {
  Decrement: () => void;
  Increment: () => void;
  standardCount: number;
};
const StandartTicket = ({ Decrement, Increment, standardCount }: StandartProps) => {
  return (
    <div>
      <div className="flex items-center">
        <div data-testid="standart-decrement" onClick={Decrement} className="text-white w-[40px] h-[40px] rounded-sm bg-[#1F1F1F] flex justify-center items-center cursor-pointer">
          -
        </div>
        <div data-testid="standard-count" className="text-white mx-4">
          {standardCount}
        </div>
        <div data-testid="standart-increment" onClick={Increment} className="text-white w-[40px] h-[40px] rounded-sm bg-[#1F1F1F] flex justify-center items-center cursor-pointer">
          +
        </div>
      </div>
    </div>
  );
};
export default StandartTicket;
