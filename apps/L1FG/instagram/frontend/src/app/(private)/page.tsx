import MainPagePost from '@/components/Home/mainBar/MainPagePost';
import MainPageStory from '@/components/Home/mainBar/MainPageStory';
import HomePageProfile from '@/components/Home/rightBar/HomeProfile';

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
