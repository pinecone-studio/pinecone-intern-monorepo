'use client';

import type React from 'react';
import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { ChevronLeft, ChevronRight, User } from 'lucide-react';
import type { ChatUser } from 'types/chat';

interface ViewProfileProps {
  user: ChatUser;
}

const ViewProfile = ({ user }: ViewProfileProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!user || user.images.length === 0) return null;

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % user.images.length);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + user.images.length) % user.images.length);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="flex items-center gap-3 w-full px-4 py-3 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors">
          <User size={18} className="text-blue-500" />
          <span className="font-medium">View Profile</span>
        </button>
      </DialogTrigger>

      <DialogContent className="p-0 bg-transparent border-none shadow-none max-w-[440px]">
        <div className="relative flex flex-col items-start">
          <Image src={user.images[currentIndex]} alt={`${user.name || 'User'} - profile image ${currentIndex + 1}`} width={440} height={660} className="rounded-lg object-cover w-[440px] h-[660px]" />

          <div className="absolute px-4 py-2 -translate-x-1/2 rounded-lg bottom-4 left-1/3 bg-white/80 text-start backdrop-blur-sm">
            <p className="text-base font-medium text-black">
              {user.name}, {user.age}
            </p>
            <p className="text-sm text-gray-600">{user.profession}</p>
          </div>

          {user.images.length > 1 && (
            <div className="absolute inset-0 flex items-center justify-between px-2">
              <Button onClick={handlePrev} variant="outline" size="icon">
                <ChevronLeft />
              </Button>
              <Button onClick={handleNext} variant="outline" size="icon">
                <ChevronRight />
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewProfile;
