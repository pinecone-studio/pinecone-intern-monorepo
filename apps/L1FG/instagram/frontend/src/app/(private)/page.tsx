import MainPagePost from '@/features/home-post/MainPagePost';
import HomePageProfile from '@/features/right/HomeProfile';
import MainPageStory from '@/features/story/MainPageStory';
import { authenticate } from '@/features/utils/authenticate';

const HomePage = async () => {
  await authenticate();
  return (
    <div className=" w-screen">
      <div className="flex justify-center gap-[72px] w-full">
        <div className="flex flex-col gap-14  w-[630px] xl:ml-[350px]">
          <div>
            <MainPageStory />
          </div>

          <div className="w-[468px] ml-[90px]">
            <MainPagePost />
          </div>
        </div>
        <div className="xl:block hidden xl:w-[326px]">
          <HomePageProfile />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
