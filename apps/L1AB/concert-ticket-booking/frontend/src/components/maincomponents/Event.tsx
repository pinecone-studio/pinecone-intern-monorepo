'use client';

import { useGetAllEventsQuery } from '@/generated';
import { EventCard } from './EventCard';
import { EventCardSkeleton } from './EventCardSkeleton';
export const Event = () => {
  const { data, loading } = useGetAllEventsQuery();
  if (loading) {
    return <EventCardSkeleton />;
  }

  return (
    <div className="text-white" >
      <div className="grid grid-cols-3 gap-8 py-12" >
        {data?.getAllEvents?.map((event) => (
          <EventCard key={event._id} {...event}  />
        ))}
      </div>
    </div>
  );
};