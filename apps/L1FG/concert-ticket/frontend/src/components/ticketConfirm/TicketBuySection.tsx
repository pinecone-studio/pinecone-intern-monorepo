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
    <div className=" mx-auto  bg-[#131313] rounded-xl p-8 flex  flex-col gap-5">
      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between p-2  mb-[10px]">
          <p className="text-white font-thin text-[16px]">Бүтээгдэхүүний тоо:</p>
          <p data-testid="subscriber-ticket-number" className="text-white text-base font-thin">
            x {value.vipQuantity + value.standartQuantity + value.standingAreaQuantity}
          </p>
        </div>
        <div>
          {value.standartQuantity === 0 ? (
            ''
          ) : (
            <div>
              <div className="flex justify-between items-center p-2">
                <div className="flex flex-row items-center gap-2">
                  <div className="p-1.5 bg-[#4651C9] rounded-full"></div>
                  <p className="text-[#4651C9] font-thin text-base">Энгийн тасалбар </p>
                </div>
                <div className="flex gap-5 ml-[100px]">
                  <p className="text-[#A1A1AA] text-[16px]">
                    {data?.getConcert.regularTicket?.price} x {value.standartQuantity}
                  </p>
                  <p className="text-white font-thin text-[16px]">{value.standartPrice}₮ </p>
                </div>
              </div>{' '}
              <div className="border-dashed border-b-2 border-[#27272A] mt-[10px] "></div>
            </div>
          )}

          {value.standingAreaQuantity === 0 ? (
            ''
          ) : (
            <div>
              <div className="flex justify-between items-center p-2">
                <div className="flex flex-row items-center gap-2">
                  <div className="p-1.5 bg-[#D7D7F8] rounded-full "></div>
                  <p className="text-[#D7D7F8] font-thin text-base">Арын тасалбар</p>{' '}
                </div>{' '}
                <div className="flex gap-5 ml-[100px]">
                  <p className="text-[#A1A1AA] text-[16px]">
                    {data?.getConcert.standingAreaTicket?.price} x {value.standingAreaQuantity}
                  </p>
                  <p className="text-white text-[16px]">{value.standingAreaPrice}₮ </p>
                </div>
              </div>{' '}
              <div className="border-dashed border-b-2 border-[#27272A] mt-[10px] "></div>
            </div>
          )}

          {value.vipQuantity === 0 ? (
            ''
          ) : (
            <div>
              <div className="flex justify-between items-center p-2">
                <div className="flex flex-row items-center gap-2">
                  <div className="p-1.5 bg-[#C772C4] rounded-full "></div>
                  <p className="text-[#C772C4] font-thin text-base">VIP тасалбар </p>{' '}
                </div>{' '}
                <div className="flex gap-5 ml-[100px]">
                  <p className="text-[#A1A1AA] text-[16px]">
                    {data?.getConcert.vipTicket?.price} x {value.vipQuantity}
                  </p>
                  <p className="text-white text-[16px]">{value.vipPrice}₮ </p>
                </div>
              </div>{' '}
            </div>
          )}
        </div>
        <div className="flex flex-row justify-between p-2 ">
          <p className="text-white font-thin text-[16px]">Нийт төлөх дүн:</p>
          <p className="text-white text-[16px] font-thin">{value.totalPrice}</p>
        </div>
      </div>
      <button data-testid="ticket-buy-continue" onClick={handleNext} className=" py-1 px-24  mx-auto w-full rounded-lg bg-[#00B7F4] hover:bg-[#3279e3] flex justify-center items-center">
        Үргэлжлүүлэх
      </button>
    </div>
  );
};
export default TicketSubscriberBuysection;
