'use client';

import { useGetEventByIdQuery } from '@/generated';
import Image from 'next/image';
import { EventDetailsSkeleton } from './Skeletons/EventDetailsSkeleton';
import { LuCalendar } from 'react-icons/lu';
import { IoLocationOutline } from 'react-icons/io5';
import { GoClock, GoDotFill } from 'react-icons/go';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { tickets } from './BookTicket';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

interface EventDetailsProps {
  _id: string | string[];
}
export const EventDetails = ({ _id }: EventDetailsProps) => {
  const { data, loading } = useGetEventByIdQuery({ variables: { id: _id as string } });
  const eventDetails = data?.getEventById;
  const router = useRouter();
  if (loading) {
    return <EventDetailsSkeleton />;
  }
  let formattedDate = 'No Date';
  if (eventDetails?.eventDate.length === 2) {
    const start = eventDetails?.eventDate[0].split('-').slice(1).join('.');
    const end = eventDetails?.eventDate[1].split('-').slice(1).join('.');
    formattedDate = `${start} | ${end}`;
  } else if (eventDetails?.eventDate.length === 1) {
    formattedDate = eventDetails?.eventDate[0].split('-').slice(1).join('.');
  }

  return (
    <div>
      <div className="relative h-[250px] w-full">
        <Image src={eventDetails?.images[1] || '/'} alt="hi" fill quality={100} className="object-cover" />
        <div className="absolute h-fit grid gap-3 top-12 left-24 backdrop-blur-sm px-4 py-2 ">
          <p className="border w-fit px-3 py-[6px] text-[16px] text-white border-[#FAFAFA33] rounded-full"> {eventDetails?.artistName[0]}</p>
          <div className="grid h-fit gap-6 w-fit">
            <p className="text-5xl font-bold text-white">{eventDetails?.name}</p>
            <div className="flex items-center gap-2">
              <LuCalendar className="text-[#FAFAFA80]" />
              <p className="text-[#FAFAFA] font-bold opacity-80">{formattedDate}</p>
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
                <p className="text-[#FAFAFA]  opacity-80 font-light">{formattedDate}</p>
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
            <div className="font-semibold text-[#FFFFFF] px-3">
              {eventDetails?.artistName.map((artist, index) => (
                <li key={index}>{artist}</li>
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
            <div className="h-fit grid gap-2 py-6">
              <p className="opacity-50 text-white ">Тоглолт үзэх өдрөө сонгоно уу.</p>
              <Select>
                <SelectTrigger className="w-[345px] text-[#FAFAFA] bg-[#27272A] border-none">
                  <SelectValue placeholder="Өдөр сонгох" className="text-[#FAFAFA] outline-none" />
                </SelectTrigger>
                <SelectContent className="bg-[#27272A] text-[#FAFAFA]">
                  <SelectGroup>
                    <SelectItem value="apple" className="bg-[#27272A] text-[#FAFAFA] hover:bg-[#3A3A3D]">
                      Apple
                    </SelectItem>
                    <SelectItem value="banana" className="bg-[#27272A] text-[#FAFAFA] hover:bg-[#3A3A3D]">
                      Banana
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
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
                    <p className="text-[16px] text-white">{ticket.price}</p>
                  </div>
                </div>
              ))}
            </div>
            <Button className="bg-[#00B7F4] text-black w-full py-2 px-4 my-6 hover:bg-[#6fcceb]" data-testid="BookTicketTo" onClick={() => router.push(`/bookTicket/${eventDetails?._id}`)}>
              Тасалбар авах
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
