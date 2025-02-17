'use client';
import Carousel from '@/components/carousel/Carousel';
import { Cards } from '@/components/ticketCard/Cards';
import { useGetConcertsQuery } from '@/generated';
import { Loader2 } from 'lucide-react';

const slides = [
  { id: 1, title: 'MUSIC of the SPHERES', subtitle: 'Coldplay', dates: '10.31 - 11.01', image: 'https://wallpaperaccess.com/full/6133725.jpg' },
  { id: 2, title: 'HIGHER POWER', subtitle: 'World Tour', dates: '11.02 - 11.03', image: 'https://images.pexels.com/photos/2034851/pexels-photo-2034851.jpeg' },
];

const Page = () => {
  const { data, loading, error } = useGetConcertsQuery();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-zinc-900">
        <Loader2 className="animate-spin text-blue-500" size={64} />
      </div>
    );
  }

  if (error) {
    return <div>Error loading concerts</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <Carousel slides={slides} /> <Cards cards={data?.getConcerts} />
    </div>
  );
};
export default Page;
