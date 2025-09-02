'use client';

import { useState } from 'react';
import TinderCardLib from 'react-tinder-card';
import { UserProfile } from '@/app/page';
import { TinderCardContent } from './TinderCardContent';

interface TinderCardProps {
  profile: UserProfile;
  onLike: (_profileId: string) => void;
  onDislike: (_profileId: string) => void;
}

const TinderCard = ({ profile, onLike, onDislike }: TinderCardProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageError, setImageError] = useState(false);

  const images = Array.isArray(profile?.images) && profile.images.length > 0 ? profile.images : ['/favicon.ico'];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleImageError = () => {
    setImageError(true);
  };

  if (!profile) return null;

  return (
    <div
      data-testid="tinder-card-wrapper"
      style={{ pointerEvents: 'none' }}
      onTouchStart={(e) => {
        e.currentTarget.style.pointerEvents = 'auto';
      }}
      onTouchEnd={(e) => {
        e.currentTarget.style.pointerEvents = 'none';
      }}
    >
      <TinderCardLib
        data-testid="tinder-card"
        className="absolute w-fit h-fit flex justify-center items-center"
        preventSwipe={['up', 'down']}
        swipeRequirementType="position"
        swipeThreshold={100}
        onSwipe={(dir) => {
          if (dir === 'right') {
            onLike(profile.id);
          } else if (dir === 'left') {
            onDislike(profile.id);
          }
        }}
      >
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
          direction={null}
        />
      </TinderCardLib>
    </div>
  );
};

export default TinderCard;
