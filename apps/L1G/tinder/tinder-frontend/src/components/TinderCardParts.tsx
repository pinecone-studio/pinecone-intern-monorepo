'use client';

import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, X, Check } from 'lucide-react';
import { UserProfile } from '@/app/page';
import { Interest } from './Interest';

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

/* eslint-disable complexity*/
export const LikeDislikeButtons = ({ onLike, onDislike }: { onLike: () => void; onDislike: () => void }) => (
  <div className="flex w-full justify-center gap-4">
    <Button
      data-testid="dislike"
      variant="outline"
      size="icon"
      className="w-11 h-11 rounded-full border-2 shadow-md border-[#E11D48E5] hover:border-red-300 hover:bg-red-50 group bg-white"
      onClick={onDislike}
    >
      <X size={20} className="w-6 h-6 text-[#E11D48] group-hover:text-red-600" />
    </Button>
    <Button
      data-testid="like"
      variant="outline"
      size="icon"
      className="w-11 h-11 rounded-full border-2 shadow-md border-[#18BA51] hover:border-green-300 hover:bg-green-50 group bg-white"
      onClick={onLike}
    >
      <Check size={20} className="w-6 h-6 text-[#18BA51] group-hover:text-green-600 " />
    </Button>
  </div>
);

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
