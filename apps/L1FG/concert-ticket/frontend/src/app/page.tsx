'use client';
import Carousel from '@/components/carousel/Carousel';
import { Cards } from '@/components/ticketCard/Cards';
import { useGetConcertsQuery } from '@/generated';

const slides = [
  { id: 1, title: 'MUSIC of the SPHERES', subtitle: 'Coldplay', dates: '10.31 - 11.01', image: 'https://wallpaperaccess.com/full/6133725.jpg' },
  { id: 2, title: 'HIGHER POWER', subtitle: 'World Tour', dates: '11.02 - 11.03', image: 'https://images.pexels.com/photos/2034851/pexels-photo-2034851.jpeg' },
];

const Page = () => {
  const { data, loading, error } = useGetConcertsQuery();

  if (loading) {
    return (
      <div className="w-full h-screen flex justify-center mt-[40vh] bg-black bg-opacity-50 z-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
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
