import { useGetConcertQuery } from '@/generated';
import { format } from 'date-fns';

const HeroComponent = ({ ticketID }: { ticketID: string }) => {
  const { data } = useGetConcertQuery({ variables: { id: ticketID as string } });
  return (
    <div className=" ml-[120px] flex flex-col gap-2">
      <div data-testid="hero-artist-name" className="border-[1px] border-[#b6c1d4] text-white px-5 py-1 w-fit  rounded-2xl text-[14px] text-center">
        {data?.getConcert.artistName[0]}{' '}
      </div>
      <p data-testid="hero-concert-name" className="text-white font-semibold text-[42px]">
        {data?.getConcert.concertName}
      </p>
      <div className="flex">
        <img className="" src="/calendar.svg " />
        <p data-testid="hero-concert-day" className="text-white mx-3 font-bold text-lg">
          {data?.getConcert.concertDay ? format(data?.getConcert.concertDay, 'MM.dd') : ''}
        </p>
      </div>
    </div>
  );
};
export default HeroComponent;
