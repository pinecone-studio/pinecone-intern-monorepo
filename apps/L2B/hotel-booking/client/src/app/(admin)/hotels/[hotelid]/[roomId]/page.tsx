'use client';

import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { GeneralInfo } from './_features/GeneralInfo';
import { PanelLeft } from 'lucide-react';
import Link from 'next/link';
import { Room, useRoomQuery } from '@/generated';

const RoomDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const roomId = params?.roomId as string;
  const [room, setRoom] = useState<Room | undefined | null>();
  const { data } = useRoomQuery({
    variables: {
      roomId,
    },
  });

  useEffect(() => {
    setRoom(data?.room);
  }, [data]);

  console.log('room query:', room);

  return (
    <div className="p-6 w-full min-h-full bg-[#e4e4e768] ">
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <PanelLeft />
        <Link href="/hotels" className="hover:text-blue-600 text-md">
          Hotels
        </Link>
        <span>&gt;</span>
        <div onClick={() => router.push(`/hotels/${room?.hotelId?._id}`)} className="hover:text-blue-600 text-md">
          Hotel Detail
        </div>
        <span>&gt;</span>
        <div className="hover:text-blue-600 hover:cursor-default text-black">Room Detail</div>
      </div>
      <main className="flex gap-5">
        <GeneralInfo roomId={roomId} />
      </main>
    </div>
  );
};

export default RoomDetailPage;
