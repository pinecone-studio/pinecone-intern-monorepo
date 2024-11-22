'use client';

import { useGetEventByIdQuery } from '@/generated';
import Image from 'next/image';
import { EventDetailsSkeleton } from './Skeletons/EventDetailsSkeleton';
import { LuCalendar } from 'react-icons/lu';
import { IoLocationOutline } from 'react-icons/io5';
import { GoClock, GoDotFill } from 'react-icons/go';
import { tickets } from './BookTicket';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';
import { RelatedEvents } from './RelatedEvents';

interface EventDetailsProps {
  id: string | string[];
}
export const EventDetails = ({ id }: EventDetailsProps) => {
  const { data, loading } = useGetEventByIdQuery({ variables: { id: id as string } });
  const eventDetails = data?.getEventById;
  const router = useRouter();
  if (loading) {
    return <EventDetailsSkeleton data-testid="event-details-skeleton" />;
  }
  return (
    <div data-cy="event-details">
      <div className="relative h-[250px] w-full" data-cy="event-details">
        <Image src={eventDetails?.images[1] || '/image.png'} alt="hi" fill quality={100} priority className="object-cover" />
        <div className="absolute h-fit grid gap-3 top-12 left-24 backdrop-blur-sm px-4 py-2 ">
          <p className="border w-fit px-3 py-[6px] text-[16px] text-white border-[#FAFAFA33] rounded-full"> {eventDetails?.description}</p>
          <div className="grid h-fit gap-6 w-fit">
            <p className="text-5xl font-bold text-white">{eventDetails?.name}</p>
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

      <div className="flex px-[212px] py-12">
        <div className=" flex-1 grid gap-5 ">
          <div className="flex justify-between ">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <LuCalendar className="text-[#FAFAFA80]" />
                <div className="text-[#FAFAFA]  opacity-80 font-light flex gap-2">
                  {eventDetails?.eventDate?.map((date) => (
                    <div key={date}>{format(new Date(date), 'MM.dd')}</div>
                  ))}
                </div>
              </div>
              <div className="flex gap-2 items-center">
                <GoClock className="text-[#FAFAFA80] w-4 h-4" />
                <p className="text-[#FAFAFA]  opacity-80">{eventDetails?.eventTime}</p>
              </div>
            </div>
            <div className="flex gap-2 text-[#A1A1AA] items-center">
              <IoLocationOutline className="w-5 h-5" />
              <p className="w-full text-[#FAFAFA] text-[16px] underline underline-offset-2">UG ARENA</p>
            </div>
          </div>
          <div className="h-fit grid gap-2 ">
            <p className="text-[#FAFAFA] font-extralight">Special Artist</p>
            <div className="font-semibold text-[#FFFFFF] px-3 ">
              {eventDetails?.artistName?.map((artist, index) => (
                <li key={index} data-testid={`artist-${index}`}>
                  {artist}
                </li>
              ))}
            </div>
            <p className="text-[#FAFAFA] font-extralight">Тоглолтийн цагийн хуваарь:</p>
            <li className="font-semibold text-[#FFFFFF] px-3">Door open: 6pm</li>
            <li className="font-semibold text-[#FFFFFF] px-3">Music start: {eventDetails?.eventTime}pm</li>
          </div>
          <div className="grid gap-2 ">
            <p className="text-[#FAFAFA] font-light">Stage plan:</p>
            <div className="h-[600px] w-full relative">
              <Image src={`/Stage.png`} alt="hi" fill />
            </div>
          </div>
        </div>

        <div className="w-fit">
          <div className=" rounded-2xl px-6 ">
            <div className="grid h-fit gap-2">
              {tickets.map((ticket) => (
                <div key={ticket.id} className=" py-4 px-6  border-[2px] border-dashed border-[#27272A] rounded-[6px]">
                  <div className="flex items-center justify-between w-full">
                    <div className="flex gap-2 items-center">
                      <GoDotFill className="w-8 h-8 " style={{ color: ticket.color }} />
                      <p className="text-[12px] " style={{ color: ticket.color }}>
                        {ticket.name} ({ticket.count})
                      </p>
                    </div>
                    <p className="text-[16px] text-white">{ticket.price}₮</p>
                  </div>
                </div>
              ))}
            </div>
            <button
              className="bg-[#00B7F4] rounded-md text-black w-full py-2 px-4 my-6 hover:bg-[#6fcceb]"
              data-testid="book-ticket-btn"
              onClick={() => router.push(`/bookTicket/${eventDetails?._id}`)}
            >
              Тасалбар авах
            </button>
          </div>
        </div>
      </div>
      <RelatedEvents id={id} />
    </div>
  );
};
