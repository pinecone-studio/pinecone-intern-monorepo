'use client';
import ConcertCard from '@/app/_components/ConcertCard';
import LoadingAnimation from '@/app/_components/LoadingAnimation';
import { Concert, useConcertsQuery } from '@/generated';

const RecommendConcert = () => {
  const { data, loading } = useConcertsQuery();
  const concerts = data?.concerts?.filter((c): c is Concert => c !== null) ?? [];

  return (
    <div className="bg-black text-white min-h-screen flex flex-col" data-testid="dashboard">
      {loading ? (
        <div className=" flex justify-center w-full min-h-screen">
          <LoadingAnimation />
        </div>
      ) : data?.concerts ? (
        data.concerts.length > 0 ? (
          <>
            <p className="ml-[10%]">Холбоотой эвент болон тоглолтууд</p>
            <main className="flex flex-wrap gap-[32px] justify-center m-8 ml-[117px] mr-[117px] rounded-lg">
              {concerts.splice(0, 6).map((concert) => (
                <ConcertCard key={concert.id} concert={concert} />
              ))}
            </main>
          </>
        ) : (
          <div>Концерт алга</div>
        )
      ) : (
        <div>Алдаа</div>
      )}
    </div>
  );
};

export default RecommendConcert;
