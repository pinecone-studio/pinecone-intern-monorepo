'use client';

import { Footer, Header } from '@/components/admin/main';
import Link from 'next/link';
import { LeftArrow } from '@/components/admin/svg';
import { Sidebar } from './main/Sidebar';
import { GeneralInfo, Images, RoomServices, UpcomingBooking } from '@/components/admin/add-room';
import { useState } from 'react';
import { useEditRoomGeneralInfoMutation } from '@/generated';
import { useSearchParams } from 'next/navigation';

const PageHeader = ({ name }: { name: string }) => (
  <div className="flex items-center gap-4">
    <Link
      href="/admin/add-hotel"
      className="w-8 h-8 flex items-center justify-center rounded-[10px] border border-[#E4E4E7] bg-white shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] hover:bg-[#F4F4F5] duration-200"
    >
      <LeftArrow />
    </Link>
    <p className="font-Inter text-[#020617] text-lg font-semibold">{name || 'Room Name'}</p>
  </div>
);

const MainContent = ({
  roomData,
  setters,
  handleEditGeneralInfo,
}: {
  roomData: {
    tax: string;
    bed: string;
    name: string;
    type: string;
    price: string;
    roomInfo: string[];
    roomNumber: string;
  };
  setters: {
    setTax: (_value: string) => void;
    setBed: (_value: string) => void;
    setName: (_value: string) => void;
    setType: (_value: string) => void;
    setPrice: (_value: string) => void;
    setRoomInfo: (_value: string[]) => void;
    setRoomNumber: (_value: string) => void;
  };
  handleEditGeneralInfo: () => Promise<void>;
}) => (
  <div className="flex gap-4">
    <div className="max-w-[784px] w-full flex flex-col gap-4">
      <GeneralInfo {...roomData} {...setters} handleEditGeneralInfo={handleEditGeneralInfo} />
      <UpcomingBooking />
      <RoomServices />
    </div>
    <div className="max-w-[400px] w-full flex flex-col gap-4">
      <Images />
    </div>
  </div>
);

export const useRoomState = () => {
  const [bed, setBed] = useState<string>('');
  const [tax, setTax] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [type, setType] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [roomNumber, setRoomNumber] = useState<string>('');
  const [roomInfo, setRoomInfo] = useState<string[]>([]);

  return {
    roomData: { bed, tax, name, type, price, roomNumber, roomInfo },
    setters: { setBed, setTax, setName, setType, setPrice, setRoomNumber, setRoomInfo },
  };
};

// Main component
export const AddRoomPage = () => {
  const searchParams = useSearchParams();
  const roomId = searchParams.get('id');

  const [editRoomGeneralInfo] = useEditRoomGeneralInfoMutation();
  const { roomData, setters } = useRoomState();

  const handleEditGeneralInfo = async () => {
    if (!roomId) {
      console.error('Room ID is missing');
      return;
    }

    const { name, type, roomInfo, price } = roomData;

    try {
      const variables = {
        input: {
          id: roomId,
          name,
          type,
          roomInfo,
          price: price ? parseFloat(price) : null,
        },
      };

      await editRoomGeneralInfo({ variables });
    } catch (error) {
      console.error('Error creating room:', error);
    }
  };

  return (
    <div className="flex">
      <Sidebar hotels="active" guests="" />
      <div className="flex flex-col w-full min-h-screen">
        <Header />
        <div className="w-full h-full flex justify-center bg-[#F4F4F5]">
          <div className="py-4 flex flex-col gap-4 max-w-[1200px] w-full">
            <PageHeader name={roomData.name} />
            <MainContent roomData={roomData} setters={setters} handleEditGeneralInfo={handleEditGeneralInfo} />
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};
