'use client';
import Carousel from '@/components/carousel/Carousel';
import { Cards } from '@/components/ticketCard/Cards';
import { useGetConcertsQuery } from '@/generated';

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

  const slides = (data?.getConcerts || []).slice(0, 4).map((concert: any, index: number) => ({
    id: concert._id || index,
    title: concert.concertName,
    subtitle: concert.artistName?.join(', ') || 'Unknown Artist',
    dates: concert.concertDay || 'TBA',
    image: concert.image || 'default-image-url',
  }));

  return (
    <div className="flex flex-col items-center justify-center">
      <Carousel slides={slides} />
      <Cards cards={data?.getConcerts} />
    </div>
  );
};

export default Page;
