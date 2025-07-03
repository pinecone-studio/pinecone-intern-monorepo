'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Image from 'next/image';
import { UserProfile } from '@/app/page';

interface TinderCardProps {
  profile: UserProfile;
}

const ImageNavigation = ({ onPrev, onNext, images, currentIndex }: { onPrev: () => void; onNext: () => void; images: string[]; currentIndex: number }) => (
  <>
    <Button data-testid="left-arrow" variant="ghost" size="icon" className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white/90 rounded-full w-10 h-10" onClick={onPrev}>
      <ChevronLeft className="w-5 h-5" />
    </Button>
    <Button data-testid="right-arrow" variant="ghost" size="icon" className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white/90 rounded-full w-10 h-10" onClick={onNext}>
      <ChevronRight className="w-5 h-5" />
    </Button>
    <div className="absolute top-4 left-1/2 -translate-x-1/2 flex gap-1">
      {images.map((_, index) => (
        <div key={index} className={`w-2 h-2 rounded-full transition-all ${index === currentIndex ? 'bg-white' : 'bg-white/50'}`} />
      ))}
    </div>
  </>
);

// eslint-disable-next-line complexity
const TinderCard = ({ profile, onLike, onDislike }: TinderCardProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [direction, setDirection] = useState<'left' | 'right' | null>(null);
  const [imageError, setImageError] = useState(false);

  const images = profile?.images?.length > 0 ? profile.images : ['/gray.jpeg'];

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
        className="absolute flex-col items-center gap-6 p-4"
      >
        <Card className="relative w-[400px] h-[600px] max-w-sm aspect-[3/4] overflow-hidden border-0 shadow-2xl">
          <div className="relative w-full h-full">
            <Image
              width={400}
              height={600}
              src={imageError || !images[currentImageIndex] ? '/gray.jpeg' : images[currentImageIndex]}
              alt={`${profile.name} - Photo ${currentImageIndex + 1}`}
              className="w-full h-full object-cover"
              unoptimized
              onError={handleImageError}
            />

            {images.length > 1 && <ImageNavigation onPrev={prevImage} onNext={nextImage} images={images} currentIndex={currentImageIndex} />}

            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 text-white">
              <h2 className="text-2xl font-bold mb-1">
                {profile.name || 'Unknown'}, {profile.age || ''}
              </h2>
            </div>
          </div>
        </Card>

        <div className="flex w-full justify-center gap-6">
          <Button
            data-testid="dislike"
            variant="outline"
            size="icon"
            className="w-14 h-14 rounded-full border-2 border-red-200 hover:border-red-300 hover:bg-red-50 group bg-transparent"
            onClick={handleDislike}
          >
            <X className="w-6 h-6 text-red-500 group-hover:text-red-600" />
          </Button>
          <Button
            data-testid="like"
            variant="outline"
            size="icon"
            className="w-14 h-14 rounded-full border-2 border-green-200 hover:border-green-300 hover:bg-green-50 group bg-transparent"
            onClick={handleLike}
          >
            <Heart className="w-6 h-6 text-green-500 group-hover:text-green-600 fill-current" />
          </Button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default TinderCard;
