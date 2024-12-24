'use client';

import { useGetAllEventsQuery, useGetEventByIdQuery } from '@/generated';
import { EventCard, EventCardProps } from './EventCard';
import { RelatedEventsSkeleton } from './Skeletons/RelatedEventsSkeleton';

interface RelatedEventsProps {
  id: string | string[];
}

const isValidDate = (date: string) => !isNaN(new Date(date).getTime());

const filterEventsByDate = (events: EventCardProps[], targetDate: string) => {
  if (!isValidDate(targetDate)) return [];

  const target = new Date(targetDate);

  return events
    .filter((event) => isValidDate(event.eventDate[0]))
    .sort((a, b) => {
      const dateA = new Date(a.eventDate[0]);
      const dateB = new Date(b.eventDate[0]);
      const diffA = Math.abs(dateA.getTime() - target.getTime());
      const diffB = Math.abs(dateB.getTime() - target.getTime());

      return diffA - diffB;
    });
};

export const RelatedEvents = ({ id }: RelatedEventsProps) => {
  const { data, loading } = useGetAllEventsQuery();
  const { data: eventById } = useGetEventByIdQuery({ variables: { id: id as string } });

  if (loading || !data || !eventById) {
    return <RelatedEventsSkeleton />;
  }

  const targetDate = eventById.getEventById.eventDate[0];
  const filteredEvents = filterEventsByDate(data.getAllEvents, targetDate);
  const filteredRelatedEvent = filteredEvents?.filter((event) => event.status === 'Regular' || event.status === 'Онцлох' || event.status === 'Demo');

  return (
    <div>
      <p className="dark:text-white text-black font-extralight text-xl px-28 max-sm:px-3  max-md:px-3 max-lg:px-3 max-xl:px-3   max-2xl:px-3 ">Холбоотой эвент болон тоглолтууд</p>
      <div
        className="grid grid-cols-4 gap-8 py-12 px-28 max-sm:px-3 max-sm:grid-cols-1 max-sm:py-4 max-md:px-3 max-md:grid-cols-2 max-md:py-4 max-lg:px-3 max-lg:grid-cols-2 max-lg:py-4 max-xl:grid-cols-3 max-xl:py-4 max-xl:px-3 max-2xl:grid-cols-3 max-2xl:py-4 max-2xl:px-3 "
        data-testid={`RelatedEvents-0`}
      >
        {filteredRelatedEvent.length > 0 ? filteredRelatedEvent.slice(0, 8).map((event) => <EventCard {...event} key={event._id} />) : <p>No related events found</p>}
      </div>
    </div>
  );
};
