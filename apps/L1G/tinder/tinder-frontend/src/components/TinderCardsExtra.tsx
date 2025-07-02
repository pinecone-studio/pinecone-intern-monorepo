// Extracted from TinderCards.tsx to comply with max-lines lint rule.
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, X, Heart } from "lucide-react";
import React from "react";

export function TinderCardsExtra(props: {
  currentProfile: any;
  dragOffset: { x: number; y: number };
  isDragging: boolean;
  isAnimating: boolean;
  cardRef: React.RefObject<HTMLDivElement | null>;
  profiles: any[];
  currentIndex: number;
  handlePrevious: () => void;
  handleNext: () => void;
  handleMouseDown: (e: React.MouseEvent) => void;
  handleMouseMove: (e: React.MouseEvent) => void;
  handleMouseUp: () => void;
  handleTouchStart: (e: React.TouchEvent) => void;
  handleTouchMove: (e: React.TouchEvent) => void;
  handleTouchEnd: () => void;
  handlePass: () => void;
  handleLike: () => void;
}) {
  const {
    currentProfile,
    dragOffset,
    isDragging,
    isAnimating,
    cardRef,
    profiles,
    currentIndex,
    handlePrevious,
    handleNext,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    handlePass,
    handleLike,
  } = props;

  if (!currentProfile) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">No more profiles!</h2>
          <p className="text-gray-600">Check back later for more matches.</p>
        </div>
      </div>
    );
  }

  const rotation = dragOffset.x * 0.1;
  const opacity = Math.max(0.7, 1 - Math.abs(dragOffset.x) / 200);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="relative w-full max-w-sm">
        {/* Card Stack */}
        <div className="relative h-[600px]">
          {/* Background cards for depth */}
          {profiles.slice(currentIndex + 1, currentIndex + 3).map((profile, index) => (
            <div
              key={profile.id}
              className="absolute inset-0 bg-white rounded-2xl shadow-lg"
              style={{
                transform: `scale(${0.95 - index * 0.02}) translateY(${index * 4}px)`,
                zIndex: -index - 1,
              }}
            />
          ))}

          {/* Main card */}
          <div
            ref={cardRef}
            className="absolute inset-0 bg-white rounded-2xl shadow-xl cursor-grab active:cursor-grabbing select-none overflow-hidden"
            style={{
              transform: `translateX(${dragOffset.x}px) translateY(${dragOffset.y}px) rotate(${rotation}deg)`,
              opacity,
              transition: isDragging ? "none" : "all 0.3s ease-out",
              zIndex: 10,
            }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Navigation arrows */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white shadow-md"
              onClick={handlePrevious}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white shadow-md"
              onClick={handleNext}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>

            {/* Card content */}
            <div className="relative h-full">
              <img
                src={currentProfile.image || "/placeholder.svg"}
                alt={currentProfile.name}
                className="w-full h-full object-cover"
                draggable={false}
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              {/* Profile info */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h2 className="text-2xl font-bold mb-1">
                  {currentProfile.name}, {currentProfile.age}
                </h2>
                <p className="text-lg opacity-90">
                  {currentProfile.occupation} {currentProfile.company}
                </p>
              </div>

              {/* Swipe indicators */}
              {dragOffset.x > 50 && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform rotate-12">
                  <div className="bg-green-500 text-white px-4 py-2 rounded-lg font-bold text-xl border-4 border-green-500">
                    LIKE
                  </div>
                </div>
              )}

              {dragOffset.x < -50 && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform -rotate-12">
                  <div className="bg-red-500 text-white px-4 py-2 rounded-lg font-bold text-xl border-4 border-red-500">
                    NOPE
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex justify-center gap-6 mt-8">
          <Button
            variant="outline"
            size="lg"
            className="w-16 h-16 rounded-full border-2 border-red-200 hover:border-red-300 hover:bg-red-50 transition-colors bg-transparent"
            onClick={handlePass}
            disabled={isAnimating}
          >
            <X className="h-6 w-6 text-red-500" />
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="w-16 h-16 rounded-full border-2 border-green-200 hover:border-green-300 hover:bg-green-50 transition-colors bg-transparent"
            onClick={handleLike}
            disabled={isAnimating}
          >
            <Heart className="h-6 w-6 text-green-500" />
          </Button>
        </div>

        {/* Profile counter */}
        <div className="text-center mt-4 text-gray-500">
          {currentIndex + 1} of {profiles.length}
        </div>
      </div>
    </div>
  );
} 