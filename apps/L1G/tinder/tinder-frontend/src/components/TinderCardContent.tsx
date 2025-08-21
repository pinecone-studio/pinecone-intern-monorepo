'use client';

import { motion } from 'framer-motion';
import { UserProfile } from '@/app/page';
import { TinderCardLayout } from './TinderCardLayout';

export const TinderCardContent = ({
  profile,
  images,
  currentImageIndex,
  imageError,
  handleImageError,
  nextImage,
  prevImage,
  handleLike,
  handleDislike,
  direction,
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
  direction: 'left' | 'right' | null;
}) => (
  <motion.div
    key={profile.id}
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{
      x: direction === 'left' ? -500 : 500,
      opacity: 0,
      rotate: direction === 'left' ? -15 : 15,
      transition: { duration: 0.3 },
    }}
    className="absolute flex flex-col items-center gap-6 p-4"
  >
    <TinderCardLayout
      profile={profile}
      images={images}
      currentImageIndex={currentImageIndex}
      imageError={imageError}
      handleImageError={handleImageError}
      nextImage={nextImage}
      prevImage={prevImage}
      handleLike={handleLike}
      handleDislike={handleDislike}
    />
  </motion.div>
);
