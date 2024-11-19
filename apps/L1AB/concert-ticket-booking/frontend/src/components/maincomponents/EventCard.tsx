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
interface EventCardProps {
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
    <h1 className="text-2xl text-[#FAFAFA] font-bold">{formatNumber(originalPrice)}₮</h1>
    {discount > 0 && <h2 className="text-[16px] text-[#FAFAFA] opacity-50 line-through">{formatNumber(discountedPrice)}₮</h2>}
  </div>
);

const EventName = ({ name, description }: { name: string; description: string }) => (
  <div>
    <h1 className="text-xl text-[#FAFAFA] w-fit">{name}</h1>
    <h6 className="text-[16px] text-[#A1A1AA] w-fit">{description}</h6>
  </div>
);

const EventLocation = ({ eventDate }: { eventDate: string[] }) => (
  <div className="flex justify-between">
    <div className="flex gap-2 text-[#A1A1AA] items-center">
      <FiCalendar className="w-4 h-4" />
      <p>{eventDate}</p>
    </div>
    <div className="flex gap-2 text-[#A1A1AA] items-center">
      <IoLocationOutline className="w-4 h-4" />
      <p>UG ARENA</p>
    </div>
  </div>
);

export const EventCard = ({ _id, name, description, eventDate, images, venues, discount }: EventCardProps) => {
  const originalPrice = venues[2]?.price || 0;
  const discountedPrice = discount > 0 ? Math.floor(originalPrice * (1 - discount / 100)) : originalPrice;
  const router = useRouter();
  const clickHandler = () => {
    router.push(`/events/${_id}`);
  };
  return (
    <div className="w-full ">
      <div className="border border-[#18181B] rounded-[8px] cursor-pointer" onClick={clickHandler} data-testid="EventCardClickId">
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