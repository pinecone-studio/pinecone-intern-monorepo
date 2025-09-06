'use client';

import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, X, Heart } from 'lucide-react';
import type { UserProfile } from '@/app/page';
import { Interest } from './Interest';
import { useState } from 'react';

export const ImageNavigation = ({ onPrev, onNext, images, currentIndex }: { onPrev: () => void; onNext: () => void; images: string[]; currentIndex: number }) => (
  <>
    <Button data-testid="left-arrow" variant="ghost" size="icon" className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white/90 rounded-full w-10 h-10" onClick={onPrev}>
      <ChevronLeft className="w-5 h-5" />
    </Button>
    <Button data-testid="right-arrow" variant="ghost" size="icon" className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white/90 rounded-full w-10 h-10" onClick={onNext}>
      <ChevronRight className="w-5 h-5" />
    </Button>
    <div className="absolute top-4 left-1/2 -translate-x-1/2 flex gap-1">
      {images.map((_, index) => (
        <div key={index} className={`w-2 h-2 rounded-full transition-all ${index === currentIndex ? 'bg-white' : 'bg-white/50'}`} />
      ))}
    </div>
  </>
);

export const LikeDislikeButtons = ({
  onLike,
  onDislike,
  showLikeAnimation = false,
  showDislikeAnimation = false,
}: {
  onLike: () => void;
  onDislike: () => void;
  showLikeAnimation?: boolean;
  showDislikeAnimation?: boolean;
}) => {
  const [isLikeClicked, setIsLikeClicked] = useState(false);
  const [isDislikeClicked, setIsDislikeClicked] = useState(false);

  const handleDislike = () => {
    setIsDislikeClicked(true);
    setTimeout(() => {
      setIsDislikeClicked(false);
    }, 200);
    onDislike();
  };

  const handleLike = () => {
    setIsLikeClicked(true);
    setTimeout(() => {
      setIsLikeClicked(false);
    }, 200);
    onLike();
  };

  const shouldShowLikeAnimation = isLikeClicked || showLikeAnimation;
  const shouldShowDislikeAnimation = isDislikeClicked || showDislikeAnimation;

  return (
    <div className="flex w-full justify-center gap-4">
      <Button
        data-testid="dislike"
        variant="outline"
        size="icon"
        className={`
          w-20 h-20 rounded-full shadow-md group border-none transition-all duration-300 ease-in-out
          ${shouldShowDislikeAnimation ? 'bg-gradient-to-br from-pink-400 to-pink-600 hover:from-pink-300 hover:to-pink-500 scale-110' : 'border-[1px] border-gray-200 bg-white hover:bg-gray-50'}
        `}
        onClick={handleDislike}
      >
        <X
          size={shouldShowDislikeAnimation ? 40 : 20}
          strokeWidth={shouldShowDislikeAnimation ? 3 : 2}
          className={`
            transition-all duration-300 ease-in-out
            ${shouldShowDislikeAnimation ? 'text-white group-hover:opacity-90' : 'w-10 h-10 text-pink-400 group-hover:text-pink-300'}
          `}
        />
      </Button>
      <Button
        data-testid="like"
        variant="outline"
        size="icon"
        className={`
          w-20 h-20 rounded-full shadow-md group border-none transition-all duration-300 ease-in-out
          ${shouldShowLikeAnimation ? 'bg-gradient-to-br from-green-400 to-green-600 hover:from-green-300 hover:to-green-500 scale-110' : 'border-[1px] border-gray-200 bg-white hover:bg-gray-50'}
        `}
        onClick={handleLike}
      >
        <Heart
          size={shouldShowLikeAnimation ? 40 : 20}
          className={`
            transition-all duration-300 ease-in-out
            ${shouldShowLikeAnimation ? 'text-white fill-white group-hover:opacity-90' : 'w-10 h-10 text-green-400 group-hover:text-green-300 fill-current'}
          `}
        />
      </Button>
    </div>
  );
};

const ProfileImageDisplay = ({ imageSrc, alt, handleImageError }: { imageError: boolean; imageSrc: string; alt: string; handleImageError: () => void }) => (
  <Image width={400} height={600} src={!imageSrc ? '/profile.jpg' : imageSrc} alt={alt} className="w-full h-full object-cover" unoptimized onError={handleImageError} />
);

const ProfileInfo = ({ profile, images, currentImageIndex }: { profile: UserProfile; images: string[]; currentImageIndex: number }) => {
  const hasOneImage = images.length === 1;
  const isFirstImage = currentImageIndex === 0;
  const showBio = !hasOneImage && isFirstImage;
  const showInterests = hasOneImage || (!hasOneImage && !isFirstImage);

  return (
    <div>
      <p className="text-[18px] font-semibold text-white">
        {profile.name || 'Unknown'}, {profile.age || ''}
      </p>

      {showBio && <p className="text-[14px] font-regular text-white">{profile.bio}</p>}

      {showInterests && (
        <div className="flex flex-wrap gap-1">
          {(profile.interests ?? []).map((interest, id) => (
            <Interest key={id} interestName={interest.interestName} />
          ))}
        </div>
      )}
    </div>
  );
};

export const CardWithImageAndInfo = ({
  profile,
  images,
  currentImageIndex,
  imageError,
  handleImageError,
  nextImage,
  prevImage,
}: {
  profile: UserProfile;
  images: string[];
  currentImageIndex: number;
  imageError: boolean;
  handleImageError: () => void;
  nextImage: () => void;
  prevImage: () => void;
}) => {
  return (
    <Card className="relative w-[330px] h-[480px] max-w-sm aspect-[3/4] overflow-hidden border-0 shadow-2xl">
      <div className="relative w-full h-full">
        <ProfileImageDisplay imageError={imageError} imageSrc={images[currentImageIndex]} alt={`${profile.name} - Photo ${currentImageIndex + 1}`} handleImageError={handleImageError} />

        {images.length > 1 && <ImageNavigation onPrev={prevImage} onNext={nextImage} images={images} currentIndex={currentImageIndex} />}

        <div className="absolute h-[140px] flex flex-col justify-end items-start bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 gap-2 text-white">
          <ProfileInfo profile={profile} images={images} currentImageIndex={currentImageIndex} />
        </div>
      </div>
    </Card>
  );
};

export const TinderCardLayout = ({
  profile,
  images,
  currentImageIndex,
  imageError,
  handleImageError,
  nextImage,
  prevImage,
  handleLike,
  handleDislike,
  showLikeAnimation = false,
  showDislikeAnimation = false,
}: {
  profile: UserProfile;
  images: string[];
  currentImageIndex: number;
  imageError: boolean;
  handleImageError: () => void;
  nextImage: () => void;
  prevImage: () => void;
  handleLike: () => void;
  handleDislike: () => void;
  showLikeAnimation?: boolean;
  showDislikeAnimation?: boolean;
}) => {
  return (
    <div className="flex flex-col items-center gap-6">
      <CardWithImageAndInfo
        profile={profile}
        images={images}
        currentImageIndex={currentImageIndex}
        imageError={imageError}
        handleImageError={handleImageError}
        nextImage={nextImage}
        prevImage={prevImage}
      />
      <LikeDislikeButtons onLike={handleLike} onDislike={handleDislike} showLikeAnimation={showLikeAnimation} showDislikeAnimation={showDislikeAnimation} />
    </div>
  );
};
