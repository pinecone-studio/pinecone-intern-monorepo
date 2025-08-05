'use client';

import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, X, Heart } from 'lucide-react';
import { UserProfile } from '@/app/page';

export const ImageNavigation = ({ onPrev, onNext, images, currentIndex }: { onPrev: () => void; onNext: () => void; images: string[]; currentIndex: number }) => (
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

export const LikeDislikeButtons = ({ onLike, onDislike }: { onLike: () => void; onDislike: () => void }) => (
  <div className="flex w-full justify-center gap-6">
    <Button
      data-testid="dislike"
      variant="outline"
      size="icon"
      className="w-14 h-14 rounded-full border-2 border-red-200 hover:border-red-300 hover:bg-red-50 group bg-transparent"
      onClick={onDislike}
    >
      <X className="w-6 h-6 text-red-500 group-hover:text-red-600" />
    </Button>
    <Button
      data-testid="like"
      variant="outline"
      size="icon"
      className="w-14 h-14 rounded-full border-2 border-green-200 hover:border-green-300 hover:bg-green-50 group bg-transparent"
      onClick={onLike}
    >
      <Heart className="w-6 h-6 text-green-500 group-hover:text-green-600 fill-current" />
    </Button>
  </div>
);
const ProfileImageDisplay = ({ imageError, imageSrc, alt, handleImageError }: { imageError: boolean; imageSrc: string; alt: string; handleImageError: () => void }) => (
  <Image width={400} height={600} src={imageError || !imageSrc ? '/gray.jpeg' : imageSrc} alt={alt} className="w-full h-full object-cover" unoptimized onError={handleImageError} />
);
export const CardWithImageAndInfo = ({
  profile,
  images,
  currentImageIndex,
  imageError,
  handleImageError,
  nextImage,
  prevImage,
}: {
  profile: UserProfile;
  images: string[];
  currentImageIndex: number;
  imageError: boolean;
  handleImageError: () => void;
  nextImage: () => void;
  prevImage: () => void;
}) => (
  <Card className="relative w-[400px] h-[600px] max-w-sm aspect-[3/4] overflow-hidden border-0 shadow-2xl">
    <div className="relative w-full h-full">
      <ProfileImageDisplay imageError={imageError} imageSrc={images[currentImageIndex]} alt={`${profile.name} - Photo ${currentImageIndex + 1}`} handleImageError={handleImageError} />

      {images.length > 1 && <ImageNavigation onPrev={prevImage} onNext={nextImage} images={images} currentIndex={currentImageIndex} />}

      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 text-white">
        <h2 className="text-2xl font-bold mb-1">
          {profile.name || 'Unknown'}, {profile.age || ''}{' '}
        </h2>
      </div>
    </div>
  </Card>
);
