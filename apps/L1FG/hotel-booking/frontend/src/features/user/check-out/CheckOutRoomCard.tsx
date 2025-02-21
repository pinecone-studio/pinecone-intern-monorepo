import { Zap } from 'lucide-react';
import Image from 'next/image';
import { Room } from '@/generated';
import { useGetHotelByIdQuery } from '@/generated';
import { useQueryState } from 'nuqs';


// interface RoomService {
//   key: string;
//   value: string;
// }
type checkOutProps = {
  room : Room | null | undefined;
}

// interface RoomCardProps {
//   hotelId: string; // For MongoDB ObjectId
//   name: string;
//   roomNumber: string;
//   price: number;
//   bed: number;
//   images: string[];
//   roomInfo: string[];
//   type: string;
//   roomServices: RoomService[];
//   tax?: number; // Optional since no required in schema
// }

export const CheckOutRoomCard = (room : checkOutProps) => {
  const [dateFrom] = useQueryState('dateFrom');
  const [dateTo] = useQueryState('dateTo');
  const imageUrl = room.room?.images[0] || "";
  const hotelId = room.room?.hotelId;
  const price = room.room?.price || 0;
  const dateStart = dateFrom || "";
  const dateEnd = dateTo || "";
  const startDate = new Date(dateStart);
  const endDate = new Date(dateEnd);
  const year1 = startDate.getUTCFullYear();
  const year2  = endDate.getUTCFullYear();
  const month1 = startDate.getMonth()+1;
  const month2 = endDate.getMonth()+1;
  const day1 = startDate.getDate()-1;
  const day2 = endDate.getDate()-1;
  const Difference_In_Time = endDate.getTime() - startDate.getTime();
  const Difference_In_Days =Math.round(Difference_In_Time / (1000 * 3600 * 24));
  const {loading : loading , data : hotel} = useGetHotelByIdQuery({ variables: {getHotelByIdId: hotelId || ""} })
  return (
    <div className="flex flex-col gap-6 w-[515px] text-foreground ">
      <div className="w-full border rounded-[6px]">
        <Image src={imageUrl} alt={'name'} height={216} width={515} className="rounded-t-[6px] w-full" style={{ width: '515px', height: 'auto' }} />

        <div className="w-full flex flex-col gap-2 p-4">
          <div className="flex flex-col gap-1">
            <h1 className="text-base font-bold leading-7 ">{hotel?.getHotelById?.name}</h1>
            <p className="text-muted-foreground text-sm font-normal">{hotel?.getHotelById?.locationName}</p>
          </div>

          <div className="flex gap-[10px] items-center">
            <button className="text-primary-foreground bg-[#2563EB] py-[2px] px-[10px] rounded-full">{hotel?.getHotelById?.rating}</button>
            <p className="text-foreground text-sm">Excellent</p>
          </div>
          <div className="py-4">
            <div className=" border border-border"></div>
          </div>
          <div className="flex flex-col gap-6">
            <div className="text-sm text-muted-foreground font-normal flex flex-col gap-1">
              <p>Check in</p>
              <p className="text-sm text-foreground font-medium">{`${year1}/${month1}/${day1}`}</p>
            </div>
            <div className="text-sm text-muted-foreground font-normal flex flex-col gap-1">
              <p>Check out</p>
              <p className="text-sm text-foreground font-medium">{`${year2}/${month2}/${day2}`}</p>
            </div>
            <div className="text-sm text-muted-foreground font-normal flex flex-col gap-1">
              <p> Number of bed</p>
              <p className="text-sm text-foreground font-medium">{room.room?.bed}</p>
            </div>
          </div>
          <div className="py-4">
            <div className=" border border-border"></div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="font-Inter text-sm font-medium ">{room.room?.name}</div>
            <div className="grid grid-cols-2 gap-3">
              {room.room?.roomInfo?.map((info , index) =>{
                return <div key={index} className="flex items-center gap-2">
                <Zap />
                <p className="text-sm font-Inter font-normal leading-5">{info}</p>
              </div>
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="w-[515px] border rounded-[6px] flex flex-col gap-2 p-4">
        <h1 className="text-base font-bold">Price detail</h1>
        <div className="flex justify-between">
          <div>
            <p className=" text-sm font-normal">1 room x {Difference_In_Days} night</p>
            <p className="text-muted-foreground text-sm font-normal">{price}₮</p>
          </div>
          <div className="flex items-center">
            <p className="font-medium text-sm text-secondary-foreground">{Difference_In_Days * price}₮</p>
          </div>
        </div>
        <div className="py-4">
          <div className="border"></div>
        </div>
        <div className="flex justify-between">
          <div className="text-sm font-medium leading-5 text-secondary-foreground">Total price</div>
          <div className="text-lg font-semibold leading-7 text-secondary-foreground">{Difference_In_Days * price}₮</div>
        </div>
      </div>
    </div>
  );
};
