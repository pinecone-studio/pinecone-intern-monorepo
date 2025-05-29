'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useFetchAllProfileQuery } from '@/generated';
import Loading from '@/app/_components/Loading';
import ProfileCard from './ProfileCard';
import SwipeButtons from './SwipeButtons';

const SwipeFeature = () => {
  const { data } = useFetchAllProfileQuery();
  const profiles = data?.fetchAllProfile;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [direction, setDirection] = useState<'left' | 'right'>('right');
  const [swipeAction, setSwipeAction] = useState<'like' | 'dislike' | null>(null);

  const currentProfile = profiles?.[currentIndex];

  if (!profiles) return <Loading />;

  const handleSwipe = (action: 'like' | 'dislike') => {
    setSwipeAction(action);
    setDirection(action === 'like' ? 'right' : 'left');
    setTimeout(() => {
      setSwipeAction(null);
      setCurrentImageIndex(0);
      setCurrentIndex((prev) => prev + 1);
    }, 350);
  };

  const handleNextImage = () => {
    if (currentProfile && currentImageIndex < currentProfile.images.length - 1) {
      setCurrentImageIndex((prev) => prev + 1);
    }
  };

  const handlePrevImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex((prev) => prev - 1);
    }
  };

  if (currentIndex >= profiles.length) {
    return <div className="w-full h-[85%] flex items-center justify-center text-xl text-gray-500">🎉 No more profiles</div>;
  }

  const variants = {
    enter: { opacity: 0, scale: 0.95 },
    center: { opacity: 1, scale: 1, x: 0, rotate: 0, transition: { duration: 0.2 } },
    exit: (direction: 'left' | 'right') => ({
      x: direction === 'left' ? -700 : 700,
      opacity: 0,
      scale: 0.9,
      rotate: direction === 'left' ? -35 : 35,
      transition: { duration: 0.35 },
    }),
  };

  return (
    <AnimatePresence custom={direction} mode="popLayout">
      <motion.div
        key={currentProfile?._id}
        custom={direction}
        variants={variants}
        initial="enter"
        animate="center"
        exit="exit"
        className="w-full h-[85%] flex flex-col justify-start items-center px-4 pt-12 sm:px-12 overflow-hidden"
      >
        {currentProfile && <ProfileCard profile={currentProfile} currentImageIndex={currentImageIndex} swipeAction={swipeAction} onNextImage={handleNextImage} onPrevImage={handlePrevImage} />}
        <SwipeButtons onLike={() => handleSwipe('like')} onDislike={() => handleSwipe('dislike')} />
      </motion.div>
    </AnimatePresence>
  );
};

export default SwipeFeature;
