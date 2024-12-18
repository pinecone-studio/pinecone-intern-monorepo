'use client';

import { useGetAllEventsQuery } from '@/generated';
import { EventCard } from '../maincomponents/EventCard';
import { EventCardSkeleton } from '../maincomponents/Skeletons/EventCardSkeleton';

export const Event1 = () => {
  const { data, loading } = useGetAllEventsQuery();

  if (loading) {
    return <EventCardSkeleton />;
  }

  const filteredEvents = data?.getAllEvents?.filter((event) => event.status === 'Regular' || event.status === 'Онцлох');

  return (
    <div className="dark:text-white root:text-black" data-testid="event">
      <div className="grid grid-cols-3 gap-8 py-12 px-28 max-sm:grid-cols-1 max-sm:px-3 max-md:grid-cols-2 max-md:px-3 max-lg:grid-cols-2 max-lg:px-3 max-xl:px-3">
        {filteredEvents?.map((event) => (
          <EventCard key={event._id} {...event} />
        ))}
      </div>
    </div>
  );
};
