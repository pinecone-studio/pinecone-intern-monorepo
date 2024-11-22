'use client';
import Image from 'next/image';
import { FiCalendar } from 'react-icons/fi';
import { IoLocationOutline } from 'react-icons/io5';
import { useRouter } from 'next/navigation';

interface Venue {
  __typename?: string;
  name: string;
  price: number;
  quantity: number;
}
export interface EventCardProps {
  _id: string;
  name: string;
  description: string;
  eventDate: string[];
  images: string[];
  venues: Venue[];
  discount: number;
}

const formatNumber = (value: number): string => {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "'");
};

const EventPrice = ({ originalPrice, discountedPrice, discount }: { originalPrice: number; discountedPrice: number; discount: number }) => (
  <div className="w-fit flex items-end gap-2">
    {discount > 0 && <h1 className="text-[16px] text-[#FAFAFA] opacity-50 line-through">{formatNumber(originalPrice)}₮</h1>}
    <h2 className="text-2xl text-[#FAFAFA] font-bold ">{formatNumber(discountedPrice)}₮</h2>
  </div>
);

const EventName = ({ name, description }: { name: string; description: string }) => (
  <div className="">
    <div className="max-w-[250px] overflow-hidden  min-h-[28px]">
      <h1 className="text-xl text-[#FAFAFA] truncate w-full ">{name}</h1>
    </div>
    <h6 className="text-[16px] text-[#A1A1AA] w-fit">{description}</h6>
  </div>
);

const EventLocation = ({ eventDate }: { eventDate: string[] }) => {
  let formattedDate = 'No Date';

  if (eventDate.length === 2) {
    const start = eventDate[0].split('-').slice(1).join('.');
    const end = eventDate[1].split('-').slice(1).join('.');
    formattedDate = `${start}-${end}`;
  } else if (eventDate.length === 1) {
    formattedDate = eventDate[0].split('-').slice(1).join('.');
  }
  return (
    <div className="flex justify-between">
      <div className="flex gap-2 text-[#A1A1AA] items-center">
        <FiCalendar className="w-4 h-4" />
        <p>{formattedDate}</p>
      </div>
      <div className="flex gap-2 text-[#A1A1AA] items-center">
        <IoLocationOutline className="w-4 h-4" />
        <p>UG ARENA</p>
      </div>
    </div>
  );
};

export const EventCard = ({ _id, name, description, eventDate, images, venues, discount }: EventCardProps) => {
  const originalPrice = venues[2]?.price || 0;
  const discountedPrice = discount > 0 ? Math.floor(originalPrice * (1 - discount / 100)) : originalPrice;
  const router = useRouter();
  return (
    <div className="w-full  " data-testid="eventhaha">
      <div className="border border-[#18181B] rounded-[8px] cursor-pointer overflow-hidden" onClick={() => router.push(`/events/${_id}`)} data-testid="EventCardClickId">
        <div className="relative h-[250px] w-full">
          <Image src={images[0]} alt="Event image" fill className="object-cover" />
          {discount > 0 && <div className="absolute bg-[#EF4444] py-2 px-3 text-xl font-bold text-[#FAFAFA] rounded-[8px] -bottom-5 left-5">{discount}%</div>}
        </div>
        <div className="bg-[#131313] py-8 px-6 h-fit gap-6 grid">
          <EventName name={name} description={description} />
          {venues[2] ? <EventPrice originalPrice={originalPrice} discountedPrice={discountedPrice} discount={discount} /> : <h1 className="text-red-500">{`Don't have index 2 element :)`}</h1>}
          <EventLocation eventDate={eventDate} />
        </div>
      </div>
    </div>
  );
};
