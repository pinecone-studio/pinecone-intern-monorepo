'use client';
import { HomeFooter, HomeHeader, HomeMain, HomePageBackground } from '@/components/HomePage';
import Loading from '@/components/Loading';
import { useGetusersQuery } from '@/generated';

export interface UserProfile {
  id: string;
  name: string | null | undefined;
  age?: number;
  images: string[] | null;
}

const Home: React.FC = () => {
  const { loading } = useGetusersQuery();

  if (loading)
    return (
      <div>
        <Loading />
      </div>
    );

  return (
    <div className="absolute flex items-center justify-center w-screen h-screen gap-4 overflow-hidden bg-black">
      <div className="fixed top-0 left-0 z-30 flex items-center justify-center w-full">
        <HomeHeader />
      </div>

      <div className="flex justify-center items-center rotate-[30deg] gap-4 relative z-0 opacity-30">
        {Array.from({ length: 7 }).map((_, idx) => {
          return <HomePageBackground key={idx} />;
        })}
      </div>

      <div className="absolute z-30 transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
        <HomeMain />
      </div>

      <div className="fixed bottom-0 z-30 flex items-center justify-center w-full l-0">
        <HomeFooter />
      </div>
    </div>
  );
};
export default Home;
