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
    <TinderCardLib
      data-testid="tinder-card"
      className="absolute w-fit h-fit flex justify-center items-center"
      preventSwipe={['up', 'down']} // Allow left and right swipes only
      swipeRequirementType="position" // Use position-based swipe detection
      swipeThreshold={100} // Require 100px swipe distance to trigger
      onSwipe={(dir) => {
        if (dir === 'right') {
          onLike(profile.id);
        } else if (dir === 'left') {
          onDislike(profile.id);
        }
      }}
      // Disable mouse dragging by overriding pointer events
      style={{ pointerEvents: 'none' }} // Prevents mouse interaction
      // Re-enable pointer events for touch to allow swipe
      onTouchStart={(e: any) => {
        e.currentTarget.style.pointerEvents = 'auto';
      }}
      onTouchEnd={(e: any) => {
        e.currentTarget.style.pointerEvents = 'none';
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
        handleLike={() => onLike(profile.id)} // for button tap
        handleDislike={() => onDislike(profile.id)} // for button tap
        direction={null} // not used anymore
      />
    </TinderCardLib>
  );
};

export default TinderCard;
