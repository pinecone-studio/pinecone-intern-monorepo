'use client';

import { useEffect, useState } from 'react';
import type { UserProfile } from '@/app/page';
import { TinderCardContent } from './TinderCardContent';

interface TinderCardProps {
  profile: UserProfile;
  onLike: (_profileId: string) => void;
  onDislike: (_profileId: string) => void;
}

const TinderCard = ({ profile, onLike, onDislike }: TinderCardProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageError, setImageError] = useState(false);

  const images = Array.isArray(profile?.images) && profile.images.length > 0 ? profile.images : ['/profile.jpg'];

  useEffect(() => {
    setCurrentImageIndex(0);
    setImageError(false);
  }, [profile.id]);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div data-testid="tinder-card-wrapper" className="absolute w-screen h-full flex justify-center items-center">
      <div className="relative w-[90%] max-w-md h-[70%]">
        <TinderCardContent
          profile={profile}
          images={images}
          currentImageIndex={currentImageIndex}
          imageError={imageError}
          handleImageError={handleImageError}
          nextImage={nextImage}
          prevImage={prevImage}
          handleLike={() => onLike(profile.id)}
          handleDislike={() => onDislike(profile.id)}
        />
      </div>
    </div>
  );
};

export default TinderCard;
