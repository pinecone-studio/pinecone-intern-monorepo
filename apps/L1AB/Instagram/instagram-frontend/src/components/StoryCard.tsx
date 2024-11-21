import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

type PropsType = {
  username: string;
  profilePicture: string;
  userId: string;
};

const StoryCard = ({ username, profilePicture, userId }: PropsType) => {
  const [isHidden, setIsHidden] = useState(false);

  return (
    <div className="py-4">
      <div className="w-[64px]  flex flex-col items-center">
        <Link href={`/story?userId=${userId}`}>
          <div className={` w-full h-[64px] border-2 rounded-full overflow-hidden flex justify-center items-center  border-orange-600  `}>
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
