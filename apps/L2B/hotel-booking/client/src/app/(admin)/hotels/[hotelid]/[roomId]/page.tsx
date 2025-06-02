'use client';
import { useParams } from 'next/navigation';
import { useRoomQuery } from '@/generated';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { RoomGeneralInfo } from './_features/RoomGeneralInfo';
import { RoomServices } from './_features/RoomServices';
import { RoomImages } from './_features/RoomImages';

const Breadcrumbs = ({ hotelId, hotelName }: { hotelId?: string | null; hotelName?: string | null }) => (
  <div className="flex items-center gap-2 text-sm text-gray-500 mb-6" data-cy="breadcrumbs">
    <Link href="/hotels" className="hover:text-blue-600" data-cy="breadcrumb-hotels">
      Hotels
    </Link>
    <ChevronRight className="h-4 w-4" />
    <Link href={`/hotels/${hotelId}`} className="hover:text-blue-600" data-cy="breadcrumb-hotel">
      {hotelName || 'Hotel Detail'}
    </Link>
    <ChevronRight className="h-4 w-4" />
    <span data-cy="breadcrumb-room">Room Detail</span>
  </div>
);

const getRoomData = (room: any) => ({
  ...room,
  type: room.type ?? undefined,
  information: room.information?.filter((info: string | null): info is string => info !== null) ?? null,
  images: room.images?.filter((img: string | null): img is string => img !== null) ?? null,
  services: room.services
    ? Object.fromEntries(
        Object.entries(room.services)
          .filter(([_, v]) => Array.isArray(v))
          .map(([k, v]) => [k, (v as (string | null)[]).filter((x): x is string => x !== null)])
      )
    : undefined,
});

const RoomDetailPage = () => {
  const params = useParams();
  const roomId = params.roomId as string;
  const { data, loading } = useRoomQuery({ variables: { roomId } });

  if (loading)
    return (
      <div className="h-screen w-full flex items-center justify-center" data-cy="loading-state">
        Loading...
      </div>
    );
  const roomData = getRoomData(data?.room);

  return (
    <div className="min-h-screen w-full bg-gray-50 p-6" data-cy="room-detail-page">
      <div className="max-w-7xl mx-auto">
        <Breadcrumbs hotelId={data?.room?.hotelId?._id} hotelName={data?.room?.hotelId?.name} />
        <div className="flex gap-6">
          <div className="flex-1 space-y-6">
            <RoomGeneralInfo roomId={roomId} room={roomData} />
            <RoomServices roomId={roomId} room={roomData} />
          </div>
          <div className="w-96">
            <RoomImages roomId={roomId} room={roomData} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default RoomDetailPage;
