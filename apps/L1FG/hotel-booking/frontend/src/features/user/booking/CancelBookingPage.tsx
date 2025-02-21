'use client';

import React from 'react';
import { CancelBookingContent, FooterSmall } from '@/components/user/booking-page';
import Image from 'next/image';
import { NavigationWhiteDown } from '../main/NavigationWhiteDown';
import { useRouter } from 'next/navigation';

interface CancelBookingPageProps {
  idParams?: string;
}

const CancelBookingPage = ({ idParams }: CancelBookingPageProps) => {
  const router = useRouter();
  return (
    <main className="min-h-screen flex flex-col justify-between">
      <div className="bg-[#FFFFFF] h-[64px]">
        <div className="container mx-auto h-full flex items-center justify-between">
          <button
            onClick={() => {
              router.push('/');
            }}
          >
            <Image src="/LogoWhite.png" alt="Logo" width={86} height={20} />
          </button>

          <div className="flex gap-4">
            <button
              onClick={() => {
                router.push('/booking');
              }}
              className="py-2 px-4"
            >
              <p className="font-normal font-Inter text-sm text-[#09090B]">My Booking</p>
            </button>
            <NavigationWhiteDown />
          </div>
        </div>
      </div>
      <CancelBookingContent idParams={idParams} />
      <FooterSmall />
    </main>
  );
};

export default CancelBookingPage;
