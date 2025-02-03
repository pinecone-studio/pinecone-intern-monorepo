'use client';
import HeroComponent from '@/components/detail/HeroComponent';
import InfoContainer from '@/components/detail/InfoContainer';
import { Cards } from '@/components/ticketCard/Cards';
import { useGetConcertsQuery } from '@/generated';

const Page = ({ params }: { params: { ticketID: string } }) => {
  const ticketID = params.ticketID;
  const { data } = useGetConcertsQuery();
  return (
    <div>
      <div className="Container mx-auto w-[1400px] ">
        <div
          className="w-[1330px] h-[250px] pt-[70px] "
          style={{
            backgroundImage: `url("/carousel.svg")`,
          }}
        >
          <HeroComponent ticketID={ticketID} />
        </div>
      </div>
      <div className="w-[1200px] h-[831px] mx-auto">
        <InfoContainer ticketID={ticketID} />
      </div>
      <div className="mx-auto w-[1200px] mt-[100px]">
        <div className="border-b-2 mb-[60px] border-white w-[1200px]"></div>
        <p className="text-[#FFFFFF]">Холбоотой эвент болон тоглолтууд :</p>
        <Cards cards={data?.getConcerts} />
      </div>
    </div>
  );
};

export default Page;
