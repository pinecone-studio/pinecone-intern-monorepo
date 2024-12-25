'use client';

import { useGetEventByIdQuery} from '@/generated';
import Image from 'next/image';
import { EventDetailsSkeleton } from './Skeletons/EventDetailsSkeleton';
import { LuCalendar } from 'react-icons/lu';
import { IoLocationOutline } from 'react-icons/io5';
import { GoClock, GoDotFill } from 'react-icons/go';
import { usePathname, useRouter } from 'next/navigation';
import { format } from 'date-fns';
import { RelatedEvents } from './RelatedEvents';
import { toast } from 'react-toastify';
import Link from 'next/link';

interface EventDetailsProps {
  id: string | string[];
  
}
// eslint-disable-next-line no-secrets/no-secrets
const url = "https://www.google.com/maps/place/Pinecone+Academy/@47.9144636,106.9167269,910m/data=!3m1!1e3!4m6!3m5!1s0x5d969368889d5da1:0x90f77786fc5b1aa2!8m2!3d47.9142841!4d106.9165468!16s%2Fg%2F11g_zk5x0b?entry=ttu&g_ep=EgoyMDI0MTIxMS4wIKXMDSoASAFQAw%3D%3D"
export const EventDetails = ({ id  }: EventDetailsProps) => {
  const { data, loading } = useGetEventByIdQuery({ variables: { id: id as string } });
  const eventDetails = data?.getEventById;
  const router = useRouter();
  const path = usePathname();
  const demoEventDetails = ['/events/6765104197fab04d24c9ed5b', '/events/676a81d280d57f973f0f4f6f', '/events/676a859880d57f973f0f51ff'].some((eventPath) => path?.startsWith(eventPath));
  
  if (loading) {
    return <EventDetailsSkeleton data-testid="event-details-skeleton" />;
  }
  const token = localStorage.getItem('token');
  const checkUser = () => {
    if (token) {
      router.push(`/bookTicket/${eventDetails?._id}`);
    } else {
      toast.error('Please sign in', { autoClose: 2000 });
      router.push(`/signin`);
    }
  };
const discountedPrice=(price:number,discount:number)=>{
  const disPrice = discount > 0 ? Math.floor(price * (1-discount / 100)) : price
  return disPrice;
}
  return (
    <div data-cy="event-details">
      <div className="relative h-[250px] w-full" data-cy="event-details">
        <Image src={eventDetails?.images[1] || '/image.png'} alt="hi" fill quality={100} priority className="object-cover" />
        <div className="absolute h-fit grid gap-3 top-12 left-24 backdrop-blur-sm px-4 py-2 ">
          <p className="border w-fit h-fit px-3 py-[6px] text-[16px] max-sm:text-sm max-sm:px-2  max-sm:py-1 max-md:text-md max-md:px-2  max-md:py-1 text-white border-[#FAFAFA33] rounded-full">
            {eventDetails?.artistName[0]}
          </p>
          <div className="grid h-fit gap-6 w-fit">
            <p className="text-5xl font-bold text-white max-sm:text-xl max-lg:text-xl h-fit">{eventDetails?.name}</p>
            <div className="flex items-center gap-2">
              <LuCalendar className="text-[#FAFAFA80]" />
              <div className="text-[#FAFAFA]  opacity-80 font-bold flex gap-2">
                {eventDetails?.eventDate?.map((date) => (
                  <div key={date}>{format(new Date(date), 'MM.dd')}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex px-[212px] py-12 max-sm:grid max-sm:px-3 max-sm:gap-3 max-md:grid max-md:px-3 max-md:gap-3 max-lg:grid max-lg:px-3 max-lg:gap-3  max-xl:grid max-xl:px-3 max-xl:gap-3  max-2xl:grid max-2xl:px-3 max-2xl:gap-3">
        <div className=" flex-1 grid gap-5 ">
          <div className="flex justify-between ">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <LuCalendar className="dark:text-[#FAFAFA80]" />
                <div className="root:text-black opacity-80 font-light flex gap-2 dark:text-white">
                  {eventDetails?.eventDate?.map((date) => (
                    <div key={date}>{format(new Date(date), 'MM.dd')}</div>
                  ))}
                </div>
              </div>
              <div className="flex gap-2 items-center ">
                <GoClock className="dark:text-[#FAFAFA80]  w-4 h-4" />
                <p className="root:text-black dark:text-white opacity-80">{eventDetails?.eventTime}</p>
              </div>
            </div>
            <Link target="_blank" rel="noopener noreferrer" href={url} className='cursor-pointer'>
              <div className="flex gap-2 dark:text-[#A1A1AA] items-center">
                 <IoLocationOutline className="w-5 h-5" />
                 <p className="w-full dark:text-[#FAFAFA] text-[16px] underline underline-offset-2">
                   {eventDetails?.location}
                 </p>
              </div>
            </Link>
          </div>
          <div className="h-fit grid gap-2 ">
            <p className="dark:text-[#FAFAFA] root:text-black font-extralight">Special Artist</p>
            <div className="font-semibold dark:text-[#FFFFFF] root:text-black px-3 ">
              {eventDetails?.artistName?.map((artist, index) => (
                <li key={index} data-testid={`artist-${index}`}>
                  {artist}
                </li>
              ))}
            </div>
            <p className="dark:text-[#FAFAFA] root:text-black font-extralight">Тоглолтийн цагийн хуваарь:</p>
            <li className="font-semibold dark:text-[#FFFFFF] px-3 root:text-black">Door open: 10am</li>
            <li className="font-semibold dark:text-[#FFFFFF] px-3 root:text-black">Event start: {eventDetails?.eventTime}pm</li>
          </div>
          <div className="grid gap-2 ">
            <p className="dark:text-[#FAFAFA] font-light root:text-black">Stage plan:</p>
            {demoEventDetails ? (
              <>
                <div className="h-[500px] w-[550px] relative max-xl:h-[640px] max-xl:m-auto max-xl:w-[740px] max-2xl:m-auto  max-md:block max-md:h-[340px] max-md:w-[440px] max-sm:hidden max-sm:w-full">
                  <Image src={`/DemoEventSeat.png`} alt="hi" priority fill />
                </div>
              </> 
            ) : (
              <div className="h-[500px] w-[600px] m-auto relative max-sm:h-[300px] max-sm:w-full max-xl:w-[400px] max-xl:m-auto  ">
                <Image src={`/Concert hall plan.png`} alt="hi" fill priority />
              </div>
             )} 
          </div>
        </div>

        <div className="w-fit max-md:px-36 max-sm:px-0 max-lg:px-44  max-xl:w-full max-2xl:px-72 max-2xl:w-full">
          <div className=" rounded-2xl px-6 ">
            <div className="grid h-fit gap-2">
              {eventDetails?.venues.map((item, index) => {
                const colors = ['#D7D7F8', '#C772C4', '#4651C9'];
                const color = colors[index % colors.length];

                return (
                  <div key={index} className="py-4 px-6 border-[2px] border-dashed dark:border-[#27272A] rounded-[6px] bg-slate-800 dark:bg-black">
                    <div className="flex items-center justify-between w-full gap-5 ">
                      <div className="flex gap-2 items-center">
                        <GoDotFill className="w-8 h-8" style={{ color }} />
                        <p className="text-[12px] " style={{ color }}>
                          {item.name} тасалбар ({item.quantity})
                        </p>
                      </div>
                      <p className="text-[16px] text-white">
                        {discountedPrice(item.price, eventDetails?.discount)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
            <button className="bg-[#00B7F4] rounded-md text-black w-full py-2 px-4 my-6 hover:bg-[#6fcceb]" data-testid="book-ticket-btn" onClick={checkUser}>
              Тасалбар авах
            </button>
          </div>
        </div>
      </div>
      <RelatedEvents id={id} />
    </div>
  );
};
