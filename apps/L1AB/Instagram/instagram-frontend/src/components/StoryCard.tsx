import Image from 'next/image';
import Link from 'next/link';

type PropsType = {
  username: string;
  profilePicture: string;
  userId: string;
};

const StoryCard = ({ username, profilePicture, userId }: PropsType) => {
  return (
    <div className="py-4">
      <div className="w-[64px]  flex flex-col items-center">
        <Link href={`/story?userId=${userId}`}>
          <div className="w-[64px] h-[64px] rounded-full overflow-hidden flex justify-center items-center bg-gradient-to-tr from-[#FFDC80] via-[#fd1d1d] to-[#833ab4]">
            <div className="rounded-full overflow-hidden relative h-[60px] w-[60px] border-[2px] border-white">
              <Image alt="userProfile" src={profilePicture} fill objectFit="cover" />
            </div>
          </div>
        </Link>
        <div className="text-[12px] text-[#09090B]">{username}</div>
      </div>
    </div>
  );
};
export default StoryCard;
