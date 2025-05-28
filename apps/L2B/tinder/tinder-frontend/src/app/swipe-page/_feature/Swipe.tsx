'use client';
import { Check, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useState } from 'react';
import { useFetchAllProfileQuery } from '@/generated';
import Loading from '@/app/_components/Loading';
import Image from 'next/image';

const SwipeFeature = () => {
  const { data } = useFetchAllProfileQuery();
  const profiles = data?.fetchAllProfile;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const currentProfile = profiles?.[currentIndex];

  if (!profiles) return <Loading />;

  const handleSwipe = (action: 'like' | 'dislike') => {
    const actionMessages: Record<'like' | 'dislike', string> = {
      like: 'Loved',
      dislike: 'User has been deleted',
    };

    alert(actionMessages[action]);

    setTimeout(() => {
      setCurrentImageIndex(0);
      setCurrentIndex((prev) => prev + 1);
    }, 200);
  };

  const handleNextImage = () => currentProfile && currentImageIndex < currentProfile.images.length - 1 && setCurrentImageIndex((prev) => prev + 1);

  const handlePrevImage = () => currentImageIndex > 0 && setCurrentImageIndex((prev) => prev - 1);

  if (currentIndex >= profiles.length) {
    return <div className="w-full h-[85%] flex items-center justify-center text-xl text-gray-500">🎉 No more profiles</div>;
  }

  return (
    <div className="w-full h-[85%] flex flex-col justify-start items-center px-4 pt-12 sm:px-12">
      <div className="relative w-[90%] max-w-[440px] h-[660px] text-center shadow-2xl rounded-xl overflow-hidden">
        {currentProfile && (
          <Image
            key={currentProfile._id + currentImageIndex}
            src={currentProfile.images[currentImageIndex]}
            alt="Profile"
            width={440}
            height={660}
            className="absolute inset-0 object-cover w-full z-10 h-[660px]"
          />
        )}

        <div
          data-testid="chevron-left"
          onClick={handlePrevImage}
          className="absolute z-20 top-1/2 left-4 -translate-y-1/2 h-10 w-10 flex items-center justify-center bg-white/80 hover:bg-white rounded-full shadow-md cursor-pointer transition-all"
        >
          <ChevronLeft width={20} height={20} color="gray" />
        </div>

        <div
          data-testid="chevron-right"
          onClick={handleNextImage}
          className="absolute z-20 top-1/2 right-4 -translate-y-1/2 h-10 w-10 flex items-center justify-center bg-white/80 hover:bg-white rounded-full shadow-md cursor-pointer transition-all"
        >
          <ChevronRight width={20} height={20} color="gray" />
        </div>

        <div className="absolute bottom-0 z-30 w-full bg-gradient-to-t from-black/70 via-black/40 to-transparent p-4 text-left">
          <p className="text-lg font-semibold text-white">
            {currentProfile?.profileInfo?.name}, {currentProfile?.age}
          </p>
          <p className="text-sm text-white mt-1">{currentProfile?.profileInfo?.bio}</p>
        </div>
      </div>

      <div className="flex mt-6 gap-10 items-center justify-center">
        <button
          onClick={() => handleSwipe('dislike')}
          className="w-16 h-16 bg-white hover:bg-red-100 border border-gray-200 rounded-full flex justify-center items-center cursor-pointer shadow-lg transition-all"
          aria-label="Dislike"
        >
          <X color="#E11D48" size={28} />
        </button>

        <button
          onClick={() => handleSwipe('like')}
          className="w-16 h-16 bg-white hover:bg-green-100 border border-gray-200 rounded-full flex justify-center items-center cursor-pointer shadow-lg transition-all"
          aria-label="Like"
        >
          <Check color="#44cd0a" size={28} />
        </button>
      </div>
    </div>
  );
};

export default SwipeFeature;
