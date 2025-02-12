import { OrderProps } from '@/app/ticketReservation/[ticketID]/page';
import { useGetConcertQuery } from '@/generated';

type SubBuyProps = {
  handleNext: () => void;
  value: OrderProps;
  ticketID: string;
};

const TicketSubscriberBuysection = ({ handleNext, value, ticketID }: SubBuyProps) => {
  const { data } = useGetConcertQuery({ variables: { id: ticketID } });

  return (
    <div className="w-[440px] mx-auto mt-[100px] h-[284px] bg-[#131313] rounded-xl p-[30px] flex-col items-center">
      <div>
        <div className="flex items-center justify-between w-[345px] h-[20px] mb-[10px]">
          <p className="text-[#A1A1AA] text-[14px]">Бүтээгдэхүүний тоо:</p>
          <p data-testid="subscriber-ticket-number" className="text-white text-[18px] font-semibold">
            x {value.vipQuantity + value.standartQuantity + value.standingAreaQuantity}
          </p>
        </div>
        {value.standartQuantity === 0 ? (
          ''
        ) : (
          <div className="flex items-center mt-[15px]">
            <div className="w-[10px] h-[10px] bg-[#4651C9] rounded-full mr-[10px]"></div>
            <div className="flex ">
              <p className="text-[#4651C9]">standart тасалбар </p>
              <div className="flex gap-5 ml-[100px]">
                <p className="text-[#A1A1AA] text-[14px]">
                  {data?.getConcert.regularTicket?.price} x {value.standartQuantity}
                </p>
                <p className="text-white text-[14px]">{value.standartPrice}₮ </p>
              </div>
            </div>{' '}
            <div className="border-dashed border-b-2 border-[#27272A] mt-[10px] "></div>
          </div>
        )}

        {value.standingAreaQuantity === 0 ? (
          ''
        ) : (
          <div className="flex items-center mt-[10px]">
            <div className="w-[10px] h-[10px] bg-[#D7D7F8] rounded-full mr-[10px]"></div>
            <div className="flex ">
              <p className="text-[#D7D7F8]">ariin тасалбар </p>
              <div className="flex gap-5 ml-[100px]">
                <p className="text-[#A1A1AA] text-[14px]">
                  {data?.getConcert.standingAreaTicket?.price} x {value.standingAreaQuantity}
                </p>
                <p className="text-white text-[14px]">{value.standingAreaPrice}₮ </p>
              </div>
            </div>{' '}
            <div className="border-dashed border-b-2 border-[#27272A] mt-[10px] "></div>
          </div>
        )}

        {value.vipQuantity === 0 ? (
          ''
        ) : (
          <div className="flex items-center mt-[10px]">
            <div className="w-[10px] h-[10px] bg-[#C772C4] rounded-full mr-[10px]"></div>
            <div className="flex ">
              <p className="text-[#C772C4]">VIP тасалбар </p>
              <div className="flex gap-5 ml-[100px]">
                <p className="text-[#A1A1AA] text-[14px]">
                  {data?.getConcert.vipTicket?.price} x {value.vipQuantity}
                </p>
                <p className="text-white text-[14px]">{value.vipPrice}₮ </p>
              </div>
            </div>{' '}
          </div>
        )}

        <div className="border-dashed border-b-2 border-[#27272A] mt-[8px] "></div>
        <div className="flex items-center justify-between w-[345px] h-[20px] mt-[5px]">
          <p className="text-[#A1A1AA] text-[15px]">Нийт төлөх дүн:</p>
          <p className="text-white text-[15px] font-semibold">{value.totalPrice}</p>
        </div>
      </div>
      <button data-testid="ticket-buy-continue" onClick={handleNext} className="w-[392px] h-[36px] mx-auto mt-[15px] rounded-lg bg-[#00B7F4] hover:bg-[#3279e3] flex justify-center items-center">
        Үргэлжлүүлэх
      </button>
    </div>
  );
};
export default TicketSubscriberBuysection;
