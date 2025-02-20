import { Booking, Room } from '@/generated';
import Image from 'next/image';

export type RoomDataProps = {
  roomData: Room | undefined | null;
  data: Booking | undefined | null;
};

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-US', {}).format(price);
};

const calculateNights = (startDate: string, endDate: string) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  return Math.max(1, Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)));
};

const RoomHeader = ({ name }: { name: string | undefined | null }) => (
  <div className="flex items-center justify-between">
    <p className="text-[#09090B] font-Inter text-lg font-semibold">{name || '-/-'}</p>
    <p className="px-4 py-2 text-[#2563EB] font-Inter text-sm font-medium">View</p>
  </div>
);

const RoomImage = ({ imageUrl }: { imageUrl: string | undefined }) => (
  <div className="relative w-full h-[294px]">
    <Image
      src={imageUrl || 'https://www.trical.co.nz/modules/custom/legrand_ecat/assets/img/no-image.png'}
      alt="Room"
      width={392}
      height={294}
      className="object-cover object-center rounded-sm w-full h-full"
    />
  </div>
);

const PriceDetails = ({ nights, roomPrice, tax }: { nights: number; roomPrice: number; tax: number }) => {
  const totalPrice = roomPrice + tax;

  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <p className="text-[#18181B] font-Inter text-sm font-normal">{nights} nights</p>
            <p className="text-[#71717A] font-Inter text-sm font-normal">{formatPrice(roomPrice)}₮ per night</p>
          </div>
          <p className="text-[#18181B] font-Inter text-sm font-medium">{formatPrice(roomPrice)}₮</p>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-[#18181B] font-Inter text-sm font-normal">Taxes</p>
          <p className="text-[#18181B] font-Inter text-sm font-medium">{formatPrice(tax)}₮</p>
        </div>
      </div>
      <div className="py-4">
        <div className="w-full h-[1px] bg-[#E4E4E7]"></div>
      </div>
      <div className="flex items-center justify-between">
        <p className="text-[#18181B] font-Inter text-sm font-medium">Total price</p>
        <p className="text-[#18181B] font-Inter text-lg font-semibold">{formatPrice(totalPrice)}₮</p>
      </div>
    </div>
  );
};

export const RoomInfoContainer = ({ roomData, data }: RoomDataProps) => {
  const nights = calculateNights(data?.startDate, data?.endDate);
  const price = roomData?.price || 0;
  const tax = roomData?.tax || 0;

  return (
    <div className="max-w-[440px] w-full flex flex-col gap-2">
      <div className="w-full border border-[#E4E4E7] rounded-[8px] bg-white px-6 pt-4 pb-6 flex flex-col gap-4">
        <RoomHeader name={roomData?.name} />
        <RoomImage imageUrl={roomData?.images[0]} />
      </div>
      <div className="w-full border border-[#E4E4E7] rounded-[8px] bg-white p-6 flex flex-col gap-4">
        <p className="text-[#09090B] font-Inter text-xl font-semibold tracking-[-0.5px]">Price Detail</p>
        <PriceDetails nights={nights} roomPrice={price} tax={tax} />
      </div>
    </div>
  );
};
