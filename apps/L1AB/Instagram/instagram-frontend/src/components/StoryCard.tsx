import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

type PropsType = {
  username: string;
  profilePicture: string;
  userId: string;
  index: number;
};

const StoryCard = ({ username, profilePicture, userId, index }: PropsType) => {
  const [isHidden, setIsHidden] = useState(false);

  return (
    <div className="py-4" data-testid={`StoryCard-${index}`}>
      <div className="w-[64px]  flex flex-col items-center">
        <Link href={`/story?userId=${userId}`}>
          <div className={`w-full h-[64px] rounded-full overflow-hidden flex justify-center items-center border-2 border-orange-600 ${isHidden ? 'border-gray-500' : ''}`}>
            <div className="rounded-full overflow-hidden relative h-[58px] w-[58px]">
              <Image alt="userProfile" src={profilePicture} fill onClick={() => setIsHidden(!isHidden)} />
            </div>
            <div className={`${isHidden ? 'flex' : 'hidden'}`}></div>
          </div>
        </Link>
        <div className="text-[12px] text-[#09090B]">{username}</div>
      </div>
    </div>
  );
};
export default StoryCard;
