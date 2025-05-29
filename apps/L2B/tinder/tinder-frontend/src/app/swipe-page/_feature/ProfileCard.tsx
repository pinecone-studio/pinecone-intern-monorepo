'use client';

import { Profile } from '@/generated';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

type Props = {
  profile: Profile;
  currentImageIndex: number;
  swipeAction: 'like' | 'dislike' | null;
  onNextImage: () => void;
  onPrevImage: () => void;
};

const ProfileCard = ({ profile, currentImageIndex, swipeAction, onNextImage, onPrevImage }: Props) => {
  return (
    <div className="relative w-[90%] max-w-[340px] h-[760px] text-center shadow-2xl rounded-xl overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute w-[100%] mt-3 left-1/2 -translate-x-1/2 px-2 flex gap-3 z-40">
          {profile.images.map((_: string, index: number) => (
            <div key={index} className={`h-[4px] rounded-full  transition-all duration-300 ${index === currentImageIndex ? 'w-[50%] bg-white' : 'w-[50%] bg-gray-500'}`} />
          ))}
        </div>
        {swipeAction === 'like' && (
          <div className="absolute top-6 right-6 z-30">
            <motion.div
              initial={{ opacity: 0, rotate: 20 }}
              animate={{ opacity: 1, rotate: 20 }}
              exit={{ opacity: 0 }}
              className="text-green-500 font-bold text-5xl border-4 border-green-500 px-4 py-1 rounded-md"
            >
              LIKE
            </motion.div>
          </div>
        )}

        {swipeAction === 'dislike' && (
          <div className="absolute top-6 left-6 z-30">
            <motion.div
              initial={{ opacity: 0, rotate: -20 }}
              animate={{ opacity: 1, rotate: -20 }}
              exit={{ opacity: 0 }}
              className="text-red-500 font-bold text-5xl border-4 border-red-500 px-4 py-1 rounded-md"
            >
              NOPE
            </motion.div>
          </div>
        )}

        <Image src={profile.images[currentImageIndex]} alt="Profile" width={440} height={660} className="object-cover w-full h-full rounded-xl" />

        <div onClick={onPrevImage} data-testid="chevron-left" className="absolute left-2 top-1/2 transform -translate-y-1/2 cursor-pointer z-10">
          <ChevronLeft className="w-8 h-8 text-white" />
        </div>
        <div onClick={onNextImage} data-testid="chevron-right" className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer z-10">
          <ChevronRight className="w-8 h-8 text-white" />
        </div>

        <div className="absolute bottom-0 z-30 w-full bg-gradient-to-t from-black/70 via-black/40 to-transparent p-4 text-left">
          <p className="text-lg font-semibold text-white">
            {profile?.profileInfo?.name}, {profile?.age}
          </p>
          <p className="text-sm text-white mt-1">{profile?.profileInfo?.bio}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
