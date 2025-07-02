// "use client"

// import type React from "react"

import React, { useState, useRef } from 'react';
// import { X, Heart, ChevronLeft, ChevronRight } from "lucide-react"
// import { Button } from "@/components/ui/button"

// Define Profile type if not already defined
interface Profile {
  id: number;
  name: string;
  age?: number;
  occupation?: string;
  company?: string;
  image?: string;
}

// This file was split for lint compliance. See TinderCardsExtra.tsx for extra logic.
import { TinderCardsExtra } from './TinderCardsExtra';

export default function TinderCards() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [dragOffset, setDragOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const startPos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const currentProfile = profiles[currentIndex];

  const handleStart = (clientX: number, clientY: number) => {
    if (isAnimating) return;
    setIsDragging(true);
    startPos.current = { x: clientX, y: clientY };
  };

  const handleMove = (clientX: number, clientY: number) => {
    if (!isDragging || isAnimating) return;

    const deltaX = clientX - startPos.current.x;
    const deltaY = clientY - startPos.current.y;

    setDragOffset({ x: deltaX, y: deltaY });
  };

  const handleEnd = () => {
    if (!isDragging || isAnimating) return;

    setIsDragging(false);

    const threshold = 100;
    const absX = Math.abs(dragOffset.x);

    if (absX > threshold) {
      // Swipe detected
      const direction = dragOffset.x > 0 ? "right" : "left";
      handleSwipe(direction);
    } else {
      // Snap back
      setDragOffset({ x: 0, y: 0 });
    }
  };

  const handleSwipe = (direction: "left" | "right") => {
    if (isAnimating) return;

    setIsAnimating(true);

    // Animate card off screen
    const exitX = direction === "right" ? 400 : -400;
    setDragOffset({ x: exitX, y: dragOffset.y });

    setTimeout(() => {
      setCurrentIndex((prev: number) => (prev + 1) % profiles.length);
      setDragOffset({ x: 0, y: 0 });
      setIsAnimating(false);
    }, 300);
  };

  const handleLike = () => handleSwipe("right");
  const handlePass = () => handleSwipe("left");

  const handlePrevious = () => {
    if (isAnimating) return;
    setCurrentIndex((prev: number) => (prev - 1 + profiles.length) % profiles.length);
  };

  const handleNext = () => {
    if (isAnimating) return;
    setCurrentIndex((prev: number) => (prev + 1) % profiles.length);
  };

  // Mouse events
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    handleStart(e.clientX, e.clientY);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    handleMove(e.clientX, e.clientY);
  };

  const handleMouseUp = () => {
    handleEnd();
  };

  // Touch events
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

  return (
    <TinderCardsExtra
      currentProfile={currentProfile}
      dragOffset={dragOffset}
      isDragging={isDragging}
      isAnimating={isAnimating}
      cardRef={cardRef}
      profiles={profiles}
      currentIndex={currentIndex}
      handlePrevious={handlePrevious}
      handleNext={handleNext}
      handleMouseDown={handleMouseDown}
      handleMouseMove={handleMouseMove}
      handleMouseUp={handleMouseUp}
      handleTouchStart={handleTouchStart}
      handleTouchMove={handleTouchMove}
      handleTouchEnd={handleTouchEnd}
      handlePass={handlePass}
      handleLike={handleLike}
    />
  );
}
