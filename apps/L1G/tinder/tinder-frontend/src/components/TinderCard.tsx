'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { UserProfile } from '@/app/page';
import { TinderCardContent } from './TinderCardContent';

interface TinderCardProps {
  profile: UserProfile;
  onLike: (_profileId: string) => void;
  onDislike: (_profileId: string) => void;
}
const TinderCard = ({ profile, onLike, onDislike }: TinderCardProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [direction, setDirection] = useState<'left' | 'right' | null>(null);
  const [imageError, setImageError] = useState(false);

  const images = Array.isArray(profile?.images) && profile.images.length > 0 ? profile.images : ['/favicon.ico'];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleLike = () => {
    setDirection('right');
  };

  const handleDislike = () => {
    setDirection('left');
  };

  const handleImageError = () => {
    setImageError(true);
  };

  useEffect(() => {
    if (!direction || !profile) return;

    const timeout = setTimeout(() => {
      if (direction === 'right') {
        onLike(profile.id);
      } else {
        onDislike(profile.id);
      }
      setDirection(null);
      setCurrentImageIndex(0);
    }, 300);
    return () => clearTimeout(timeout);
  }, [direction, onLike, onDislike, profile]);

  if (!profile) return null;

  return (
    <AnimatePresence>
      <TinderCardContent
        profile={profile}
        images={images}
        currentImageIndex={currentImageIndex}
        imageError={imageError}
        handleImageError={handleImageError}
        nextImage={nextImage}
        prevImage={prevImage}
        handleLike={handleLike}
        handleDislike={handleDislike}
        direction={direction}
      />
    </AnimatePresence>
  );
};

export default TinderCard;
