import Image from 'next/image';
import Link from 'next/link';
import { StoryUser, mockStoryData } from './mock-story-data';

const MainPageStory = () => {
  // Function to truncate username
  const formatUsername = (username: string) => {
    if (username.length >= 10) {
      return `${username.slice(0, 9)}...`;
    }
    return username;
  };

  return (
    <div className="flex gap-4 w-[630px]">
      {mockStoryData.map((user: StoryUser) => (
        <Link href="/story" key={user.id}>
          <div className="flex flex-col gap-2 mt-[25px] w-fit">
            <div className="rounded-full w-fit bg-[linear-gradient(to_top_right,#f9ce34_10%,#ee2a7b_60%)] p-[2px]">
              <div className="rounded-full bg-white w-[60px] h-[60px] flex items-center justify-center">
                <div className="w-14 h-14 rounded-full overflow-hidden relative">
                  <Image src={user.profileImage} alt={`${user.username}'s profile`} fill className="object-cover" />
                </div>
              </div>
            </div>
            <span className="text-xs font-normal text-[#262626] text-center" title={user.username}>
              {formatUsername(user.username)}
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default MainPageStory;
