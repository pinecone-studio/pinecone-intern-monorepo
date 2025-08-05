import { HomeFooter, HomeHeader, HomeMain, HomePageBackground } from '@/components/HomePage';

const Home = () => {
  return (
    <div className="flex justify-center items-center w-screen h-screen overflow-hidden gap-4 bg-black absolute">
      <div className="w-full flex justify-center items-center fixed top-0 left-0 z-30">
        <HomeHeader />
      </div>

      <div className="flex justify-center items-center rotate-[30deg] gap-4 relative z-0 opacity-30">
        {Array.from({ length: 7 }).map((_, idx) => {
          return <HomePageBackground />;
        })}
      </div>

      <div className="absolute z-30 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <HomeMain />
      </div>

      <div className="w-full flex justify-center items-center fixed bottom-0 left-0 z-30">
        <HomeFooter />
      </div>
    </div>
  );
};

export default Home;
