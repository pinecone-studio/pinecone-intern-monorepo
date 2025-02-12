type TotalProps = {
  standartCount: number;
  standartPrice: number;
  rearCount: number;
  rearPrice: number;
  vipCount: number;
  vipPrice: number;
  total: number;
  handleNext: () => void;
};

export const TotalPrice = ({ standartCount, standartPrice, rearCount, rearPrice, vipCount, vipPrice, total, handleNext }: TotalProps) => {
  return (
    <div className=" flex-col content-between">
      <div className="flex-col justify-around w-[345px] h-auto mx-auto ">
        <div className={`${standartCount > 0 ? 'block' : 'hidden'} flex items-center justify-between w-[345px] h-[20px] mb-[20px]`}>
          <p className="text-[#A1A1AA] text-[14px]">Энгийн тасалбар x {standartCount}</p>
          <p className="text-[#A1A1AA] text-[14px]">{standartCount * standartPrice}₮</p>
        </div>
        <div className={`${rearCount > 0 ? 'block' : 'hidden'} flex items-center justify-between w-[345px] h-[20px] mb-[20px]`}>
          <p className="text-[#A1A1AA] text-[14px]">Арын тасалбар x {rearCount}</p>
          <p className="text-[#A1A1AA] text-[14px]">{rearCount * rearPrice}₮</p>
        </div>
        <div className={`${vipCount > 0 ? 'block' : 'hidden'} flex items-center justify-between w-[345px] h-[20px] mb-[20px]`}>
          <p className="text-[#A1A1AA] text-[14px]">VIP тасалбар x {vipCount}</p>
          <p className="text-[#A1A1AA] text-[14px]">{vipCount * vipPrice}₮</p>
        </div>
        <div className={`${total > 0 ? 'block' : 'hidden'} flex items-center justify-between w-[345px] h-[20px] mb-[10px]`}>
          <p className="text-[#A1A1AA] text-[14px]">Нийт төлөх дүн:</p>
          <p className="text-white text-[18px] font-semibold">{total}₮</p>
        </div>
      </div>
      <button data-testid="ticket-buy-button" onClick={handleNext} className="w-[297px] h-[36px] mx-auto mt-[30px] rounded-lg bg-[#00B7F4] hover:bg-[#3279e3] flex justify-center items-center">
        Тасалбар авах
      </button>
    </div>
  );
};
