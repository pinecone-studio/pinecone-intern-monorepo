'use client';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import LoadingText from '../_components/LoadingText';
import { Concert, useSearchEventsMutation } from '@/generated';
import ConcertCard from '../_components/ConcertCard';

const SearchPage = () => {
  const name = useSearchParams().get('name');
  const [loading, setLoading] = useState(true);
  const [searchEvents, { error }] = useSearchEventsMutation();
  const [events, setEvents] = useState<Concert[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await searchEvents({ variables: { name } });
        if (response.data?.searchEvents) {
          setEvents(response.data.searchEvents);
        }
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [name, searchEvents]);

  if (loading) {
    return (
      <div className=" flex  justify-center">
        <LoadingText />
      </div>
    );
  }

  if (error) {
    return <div className=" flex justify-center">{error.message}</div>;
  }
  return (
    <div className="flex flex-wrap gap-[32px] justify-center m-8 ml-[117px] mr-[117px] rounded-lg">
      {events.length > 0 ? events.map((event) => <ConcertCard key={event.id} concert={event} />) : <div>Илэрц олдсонгүй!</div>}
    </div>
  );
};

export default SearchPage;
