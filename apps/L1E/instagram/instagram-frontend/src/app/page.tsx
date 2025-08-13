"use client"
// import Profile from '@/components/Profile';
import Follow from '@/components/FollowSection';
import Post from '@/components/Post';
import Story from '@/components/Story';


const Home = () => {
  return (
    <div> 
      <div className='w-[1028px] h-[3114px] bg-red-200 m-[80px_0px_0px_536px] inline-flex items-start gap-[72px]'>
        <div className='w-[630px] h-[3114px] gap-4 mt-[12px flex flex-col items-center bg-green-200'>
        <Story />
        <Post />
        </div>
        <Follow />
      </div>
      {/* <Profile bio={"bio"} userName={"usernaem"} postsNumber={12} followersNumber={12} followingNumber={12} isMine={true} isPrivate={true} ></Profile> */}
    </div>
  );
};

export default Home;
