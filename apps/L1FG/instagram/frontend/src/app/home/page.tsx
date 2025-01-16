'use client';

// import { MenuButtons } from '@/components/Home/leftSideBar/MenuButtonsSideBar';
import MainPagePost from '@/components/Home/mainBar/MainPagePost';
import MainPageStory from '@/components/Home/mainBar/MainPageStory';
import HomePageProfile from '@/components/Home/rightBar/HomeProfile';

const HomePage = () => {
  return (
    <div className="flex mx-auto  mt-4 px-4">
      <div className="flex flex-col gap-14">
        <MainPageStory />
        <MainPagePost />
      </div>
      <HomePageProfile />
    </div>
  );
};

export default HomePage;
