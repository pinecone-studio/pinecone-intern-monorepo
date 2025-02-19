/*eslint-disable*/
type TotalProps = {
  standartCount: number;
  standartPrice: number;
  rearCount: number;
  rearPrice: number;
  vipCount: number;
  vipPrice: number;
  total: number;
  vipClick: number;
  handleNext: () => void;
  rearClick: number;
  standartClick: number;
};

export const TotalPrice = ({ standartCount, standartPrice, rearCount, rearPrice, vipCount, vipPrice, vipClick, total,  handleNext, standartClick, rearClick }: TotalProps) => {
  console.log(vipCount, vipClick);
  return (
    <div className="flex flex-col gap-4 content-between">
      <div className="flex-col justify-around w-[345px] h-auto mx-auto ">
        <div className={`${standartCount > 0 ? 'block' : 'hidden'} flex items-center justify-between w-[345px] h-[20px] mb-[20px]`}>
          <p className="text-neutral-500 text-[14px] font-thin">Энгийн тасалбар x {standartCount}</p>
          <p className="text-neutral-500  text-[14px]">{standartCount * standartPrice}₮</p>
        </div>
        <div className={`${rearCount > 0 ? 'block' : 'hidden'} flex items-center justify-between w-[345px] h-[20px] mb-[20px]`}>
          <p className="text-neutral-500  text-[14px] font-thin">Арын тасалбар x {rearCount}</p>
          <p className="text-neutral-500  text-[14px]">{rearCount * rearPrice}₮</p>
        </div>
        <div className={`${vipCount > 0 ? 'block' : 'hidden'} flex items-center justify-between w-[345px] h-[20px] mb-[20px]`}>
          <p className="text-neutral-500  text-[14px] font-thin">VIP тасалбар x {vipCount}</p>
          <p className="text-neutral-500  text-[14px]">{vipCount * vipPrice}₮</p>
        </div>
        <div className={`${total > 0 ? 'block' : 'hidden'} flex items-center justify-between w-[345px] h-[20px] mb-[10px]`}>
          <p className="text-white font-thin text-base">Нийт төлөх дүн:</p>
          <p className="text-white text-[18px] font-semibold">{total}₮</p>
        </div>
      </div>
      <button
        data-cy="ticket-buy"
        disabled={vipClick === 0 && standartClick === 0 && rearClick === 0}
        data-testid="ticket-buy-button"
        onClick={handleNext}
        className="w-[297px] h-[36px] mx-auto  rounded-lg bg-[#00B7F4] hover:bg-[#3279e3] flex justify-center items-center"
      >
        Тасалбар авах
      </button>
    </div>
  );
};
