'use client';

import type React from 'react';

import { useState, useRef, useEffect, useCallback } from 'react';
import type { UserProfile } from '@/app/page';
import { TinderCardLayout } from './TinderCardLayout';
import { Heart, X } from 'lucide-react';

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

  const handleStart = (clientX: number, clientY: number) => {
    setIsDragging(true);
    setStartPos({ x: clientX, y: clientY });
  };

  const handleMove = useCallback(
    (clientX: number, clientY: number) => {
      if (!isDragging) return;

      const deltaX = clientX - startPos.x;
      const deltaY = clientY - startPos.y;

      setDragOffset({ x: deltaX, y: deltaY });

      if (cardRef.current) {
        const cardWidth = cardRef.current.offsetWidth;
        const threshold = cardWidth * 3;
        if (Math.abs(deltaX) > threshold) {
          setIsHidden(true);
        }
      }
    },
    [isDragging, startPos.x, startPos.y]
  );

  const handleEnd = useCallback(() => {
    if (!isDragging) return;

    setIsDragging(false);

    const threshold = 100;
    if (Math.abs(dragOffset.x) > threshold) {
      const direction = dragOffset.x > 0 ? 'right' : 'left';
      const finalX = direction === 'right' ? 1000 : -1000;

      setDragOffset({ x: finalX, y: dragOffset.y });
      setIsHidden(true);

      setTimeout(() => {
        if (direction === 'right') {
          handleLike();
        } else {
          handleDislike();
        }
      }, 200);
    } else {
      setIsHidden(false);
      setDragOffset({ x: 0, y: 0 });
    }
  }, [isDragging, dragOffset.x, dragOffset.y, handleLike, handleDislike]);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      handleMove(e.clientX, e.clientY);
    },
    [handleMove]
  );

  const handleMouseUp = useCallback(() => {
    handleEnd();
  }, [handleEnd]);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);

      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    handleStart(e.clientX, e.clientY);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    handleStart(touch.clientX, touch.clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    handleMove(touch.clientX, touch.clientY);
  };

  const handleTouchEnd = () => {
    handleEnd();
  };

  // Dynamic visual effects
  const rotation = dragOffset.x * 0.1; // Only X rotation
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
