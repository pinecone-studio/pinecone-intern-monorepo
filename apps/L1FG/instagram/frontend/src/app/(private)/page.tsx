import MainPagePost from '@/components/home/main/MainPagePost';
import MainPageStory from '@/components/home/main/MainPageStory';
import HomePageProfile from '@/components/home/right/HomeProfile';

const HomePage = () => {
  return (
    <div className=" w-screen">
      <div className="flex justify-center gap-[72px] w-full">
        <div className="flex flex-col gap-14  w-[630px] ml-[350px]">
          <div>
            <MainPageStory />
          </div>

          <div className="w-[468px] ml-[90px]">
            <MainPagePost />
          </div>
        </div>
        <div className=" w-[326px]">
          <HomePageProfile />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
