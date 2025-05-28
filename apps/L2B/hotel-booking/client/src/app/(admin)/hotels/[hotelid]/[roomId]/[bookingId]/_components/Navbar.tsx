import { Booking } from '@/generated';
import { PanelLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';

export const Navbar = ({ data }: { data: Booking | undefined | null }) => {
  const router = useRouter();
  const hotelId = data?.hotelId?._id ?? 'undefined';
  const roomId = data?.roomId?._id ?? 'undefined';

  return (
    <div>
      <nav aria-label="Breadcrumb navigation" className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <PanelLeft aria-hidden="true" />
        <Link href="/hotels" className="hover:text-blue-600 text-md">
          Hotels
        </Link>
        <span aria-hidden="true">&gt;</span>
        <button onClick={() => router.push(`/hotels/${hotelId}`)} className="hover:text-blue-600 text-md bg-transparent border-none p-0 cursor-pointer">
          Hotel Detail
        </button>
        <span aria-hidden="true">&gt;</span>
        <button onClick={() => router.push(`/hotels/${hotelId}/${roomId}`)} className="hover:text-blue-600 text-md bg-transparent border-none p-0 cursor-pointer">
          Room Detail
        </button>
        <span aria-hidden="true">&gt;</span>
        <span className="text-black">Guest Info</span>
      </nav>
    </div>
  );
};
