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

  return (
    <div>
      <p className="text-white font-extralight text-xl px-28">Холбоотой эвент болон тоглолтууд</p>
      <div className="grid grid-cols-4 gap-8 py-12 px-28" data-testid={`RelatedEvents-0`}>
        {filteredEvents.length > 0 ? filteredEvents.map((event) => <EventCard {...event} key={event._id} />) : <p>No related events found</p>}
      </div>
    </div>
  );
};
