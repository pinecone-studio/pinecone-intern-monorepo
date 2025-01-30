import { useGetConcertQuery } from '@/generated';
import { format } from 'date-fns';

const HeroComponent = ({ ticketID }: { ticketID: string }) => {
  const { data } = useGetConcertQuery({ variables: { id: ticketID as string } });
  return (
    <div className="w-[514px] h-[114px] ml-[120px]">
      <div data-testid="hero-artist-name" className="border-[1px] border-[#b6c1d4] text-white w-[89px] h-[25px] rounded-2xl text-[14px] text-center">
        {data?.getConcert.artistName[0]}{' '}
      </div>
      <p data-testid="hero-concert-name" className="text-white font-semibold text-[42px]">
        {data?.getConcert.concertName}
      </p>
      <div className="flex">
        <img className="" src="/calendar.svg " />
        <p data-testid="hero-concert-day" className="text-white mx-3">
          {data?.getConcert.concertDay ? format(data?.getConcert.concertDay, 'MM.dd') : ''}
        </p>
        <img src="/pipe.svg" />
        <p className="text-white mx-3">11.03</p>
        <img src="/pipe.svg" />
        <p className="text-white mx-3">11.04</p>
      </div>
    </div>
  );
};
export default HeroComponent;
