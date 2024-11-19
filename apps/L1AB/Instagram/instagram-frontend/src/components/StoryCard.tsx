import Image from 'next/image';
import StoryDetail from './StoryDetail';
import { useState } from 'react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

type PropsType = {
  username: string;
  image: string;
  profilePicture: string;
  testId: number;
};

const StoryCard = ({ username, image, profilePicture, testId }: PropsType) => {
  const [isHidden, setIsHidden] = useState(false);
  return (
    <div className="py-4">
      <div className="w-[64px]  flex flex-col items-center">
        <div className="w-full h-[64px] border-2 rounded-full overflow-hidden  border-orange-600  flex justify-center items-center">
          <Dialog>
            <DialogTrigger>
              <div className="rounded-full overflow-hidden relative h-[58px] w-[58px]">
                <Image alt="userProfile" src={profilePicture} fill onClick={() => setIsHidden(!isHidden)} />
              </div>
            </DialogTrigger>
            <DialogContent className="absolute left-72 top-10">
              <StoryDetail />
            </DialogContent>
          </Dialog>
          <div className={`${isHidden ? 'flex' : 'hidden'}`}></div>
        </div>
        <div className="text-[12px] text-[#09090B]">{username}</div>
      </div>
    </div>
  );
};
export default StoryCard;
