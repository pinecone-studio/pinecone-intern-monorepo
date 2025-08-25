'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogOverlay, DialogTrigger } from '@/components/ui/dialog';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type User = {
  id: number;
  name: string;
  age: number;
  job: string;
  avatar: string[];
};

interface ViewProfileProps {
  user: User;
}

const ViewProfile = ({ user }: ViewProfileProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!user || user.avatar.length === 0) return null;

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % user.avatar.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + user.avatar.length) % user.avatar.length);
  };

  return (
    <div className="flex gap-2">
      <Dialog>
        <DialogTrigger>
          <Button variant="outline" className="w-[112px] h-[40px] text-[14px] font-medium bg-white border hover:bg-gray-100">
            View Profile
          </Button>
        </DialogTrigger>

        <DialogOverlay className="bg-black/50 fixed inset-0" />

        <DialogContent className="p-0 bg-transparent border-none shadow-none max-w-[440px]">
          <div className="relative flex flex-col items-center">
            <Image src={user.avatar[currentIndex]} alt={`${user.name} profile ${currentIndex + 1}`} width={344} height={100} className="rounded-lg object-cover w-[440px] h-[660px]" />

            <div className="absolute bottom-4 left-1/3 -translate-x-1/2 bg-white/80 rounded-lg py-2 text-start backdrop-blur-sm">
              <p className="text-[16px] font-medium text-black">
                {user.name}, {user.age}
              </p>
              <p className="text-[14px] text-gray-600">{user.job}</p>
            </div>

            {user.avatar.length > 1 && (
              <div className="absolute px-1 flex justify-between items-center w-full h-full">
                <Button onClick={handlePrev} variant="outline">
                  <ChevronLeft />
                </Button>
                <Button onClick={handleNext} variant="outline">
                  <ChevronRight />
                </Button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ViewProfile;
