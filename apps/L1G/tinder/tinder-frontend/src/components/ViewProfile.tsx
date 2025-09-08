'use client';

import { useState } from 'react';
import { User } from 'lucide-react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import type { ChatUser } from 'types/chat';
import { CardWithImageAndInfo } from './TinderCardLayout';

interface ViewProfileProps {
  user: ChatUser;
}
const ViewProfile = ({ user }: ViewProfileProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageError, setImageError] = useState(false);

  if (!user || user.images.length === 0) return null;

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % user.images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + user.images.length) % user.images.length);
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="flex items-center gap-3 w-full px-4 py-3 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors">
          <User size={18} className="text-blue-500" />
          <span className="font-medium">View Picture</span>
        </button>
      </DialogTrigger>

      <DialogContent className="p-0 bg-transparent border-none shadow-none max-w-[440px]">
        <CardWithImageAndInfo
          profile={{
            ...user,
            interests: (user.interests || [])
              .filter((i) => i && i.interestName && i.interestName.trim() !== '')
              .map((i, index) => ({
                _id: i._id ?? String(index),
                interestName: i.interestName!,
              })),
          }}
          images={user.images}
          currentImageIndex={currentIndex}
          imageError={imageError}
          handleImageError={() => setImageError(true)}
          nextImage={handleNext}
          prevImage={handlePrev}
        />
      </DialogContent>
    </Dialog>
  );
};

export default ViewProfile;
