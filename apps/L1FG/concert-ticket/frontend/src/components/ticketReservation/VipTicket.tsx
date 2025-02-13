type StandartProps = {
  Decrement: () => void;
  Increment: () => void;
  vipCount: number;
  vipRealCount: number;
  vipPrice: number;
  vipClick: number;
  vip: number;
};
const VipTicket = ({ Decrement, Increment, vip, vipClick, vipCount, vipRealCount, vipPrice }: StandartProps) => {
  return (
    <div>
      <div className="border-dashed border-b-2 border-[#27272A] "></div>
      <div className="w-[345px] h-[72px] flex items-center justify-between">
        <div className="flex items-center  justify-items-center">
          <div className="w-[10px] h-[10px] bg-[#4651C9] rounded-full mr-[10px]"></div>
          <div>
            <p data-testid="have-vip-ticket" className="text-[#4651C9] font-thin">
              VIP тасалбар ({vipRealCount === -1 ? vipRealCount + 1 : vipRealCount})
            </p>
            <p className="text-white">{vipPrice}₮</p>
          </div>
        </div>
        <div className="flex items-center">
          <div data-testid="vip-decrement" onClick={Decrement} className="text-white w-[40px] h-[40px] rounded-sm bg-[#1F1F1F] flex justify-center items-center cursor-pointer">
            -
          </div>
          <div className="text-white mx-4"> {vipRealCount === -1 ? vipCount - 1 : vipCount}</div>
          <button
            disabled={vipRealCount <= -1}
            data-testid="vip-increment"
            onClick={Increment}
            className="text-white w-[40px] h-[40px] rounded-sm bg-[#1F1F1F] flex justify-center items-center cursor-pointer"
          >
            +
          </button>
        </div>
      </div>
      <p data-testid="vip-count" className={`${vipRealCount <= -1 ? 'block' : 'hidden'} text-red-500 text-[12px]`}>
        {vip < vipClick ? vipClick : vipCount}-ш тасалбар захиалах боломжгүй байна.
      </p>
    </div>
  );
};
export default VipTicket;
