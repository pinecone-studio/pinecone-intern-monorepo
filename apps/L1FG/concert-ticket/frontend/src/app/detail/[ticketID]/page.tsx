'use client';
import HeroComponent from '@/components/detail/HeroComponent';
import InfoContainer from '@/components/detail/InfoContainer';

import { Cards } from '@/components/ticketCard/Cards';
import { useGetSameConcertsQuery } from '@/generated';

const Page = ({ params }: { params: { ticketID: string } }) => {
  const ticketID = params.ticketID;
  const { data } = useGetSameConcertsQuery({ variables: { concertId: ticketID } });
  return (
    <div>
      <div className="Container mx-auto w-[1400px] ">
        <div>
          <div
            className="h-[250px] pt-[70px] "
            style={{
              backgroundImage: `url("/carousel.svg")`,
            }}
          >
            <HeroComponent ticketID={ticketID} />
          </div>
        </div>
        <InfoContainer ticketID={ticketID} />
        <div className="border-b  border-zinc-600 w-[1400px]"></div>
        <p className="text-[#FFFFFF] font-thin text-lg mt-10">Холбоотой эвент болон тоглолтууд :</p>
        <Cards cards={data?.getSameConcerts || undefined} />
      </div>
    </div>
  );
};

export default Page;
