/* eslint-disable max-lines */
'use client';

import type React from 'react';

import { useState, useRef, useEffect, useCallback } from 'react';
import type { UserProfile } from '@/app/page';
import { TinderCardLayout } from './TinderCardLayout';
import { Heart, X } from 'lucide-react';
import { handleEnd, handleMouseMove, handleMouseUp, handleMove, handleStart } from 'utils/tinder-card-handlers';

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
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [isHidden, setIsHidden] = useState(false);

  const cardRef = useRef<HTMLDivElement>(null);

  const memoizedHandleMove = useCallback(
    (clientX: number, clientY: number) => {
      handleMove(clientX, clientY, isDragging, startPos, setDragOffset, cardRef, setIsHidden);
    },
    [isDragging, startPos]
  );

  const memoizedHandleEnd = useCallback(() => {
    handleEnd(isDragging, dragOffset, setIsDragging, setDragOffset, setIsHidden, handleLike, handleDislike);
  }, [isDragging, dragOffset, handleLike, handleDislike]);

  const onMouseMove = useCallback(
    (e: MouseEvent) => {
      handleMouseMove(e, memoizedHandleMove);
    },
    [memoizedHandleMove]
  );

  const onMouseUp = useCallback(() => {
    handleMouseUp(memoizedHandleEnd);
  }, [memoizedHandleEnd]);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);

      return () => {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };
    }
  }, [isDragging, onMouseMove, onMouseUp]);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    handleStart(e.clientX, e.clientY, setIsDragging, setStartPos);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    handleStart(touch.clientX, touch.clientY, setIsDragging, setStartPos);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    memoizedHandleMove(touch.clientX, touch.clientY);
  };

  const handleTouchEnd = () => {
    memoizedHandleEnd();
  };

  const rotation = dragOffset.x * 0.1;
  const opacity = Math.max(0.5, 1 - Math.abs(dragOffset.x) / 300);

  const showLike = dragOffset.x > 30;
  const showPass = dragOffset.x < -30;

  if (isHidden) {
    return null;
  }

  return (
    <div
      data-testid="tinder-card-content"
      ref={cardRef}
      className="absolute w-full h-full touch-none select-none cursor-grab active:cursor-grabbing"
      style={{
        transform: `
          translateX(${dragOffset.x}px)
          translateY(${dragOffset.y}px)
          rotate(${rotation}deg)
        `,
        opacity,
        transformOrigin: 'top center',
        transition: isDragging ? 'none' : 'all 0.3s ease-in-out',
      }}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="relative w-full h-full">
        {/* Overlay: Like */}
        {showLike && (
          <Heart
            data-testid="heart-overlay"
            size={200}
            className={`absolute top-8 left-[13%] transform rotate-1 z-10
            transition-all duration-300 ease-in-out
          w-20 h-20 text-green-400 fill-current
          `}
          />
        )}

        {/* Overlay: Pass */}
        {showPass && (
          <X
            data-testid="x-overlay"
            size={200}
            strokeWidth={4}
            className={`absolute top-8 right-[13%] transform rotate-4 z-10
            transition-all duration-300 ease-in-out
          w-20 h-20 text-pink-400 fill-current
          `}
          />
        )}

        {/* Actual Card Content */}
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
          showLikeAnimation={showLike}
          showDislikeAnimation={showPass}
        />
      </div>
    </div>
  );
};
