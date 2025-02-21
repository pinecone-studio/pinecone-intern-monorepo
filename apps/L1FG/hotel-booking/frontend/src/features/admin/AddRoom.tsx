'use client';

import { Footer, Header } from '@/components/admin/main';
import Link from 'next/link';
import { LeftArrow } from '@/components/admin/svg';
import { Sidebar } from './main/Sidebar';
import { GeneralInfo, Images, RoomServices, UpcomingBooking } from '@/components/admin/add-room';
import { useEditRoomGeneralInfoMutation, useEditRoomImagesMutation, useEditRoomServicesMutation } from '@/generated';
import { useSearchParams } from 'next/navigation';
import { useRoomImages, useRoomServices, useRoomState } from '@/components/admin/add-room/States';

export const AddRoomPage = () => {
  const searchParams = useSearchParams();
  const roomId = searchParams.get('id');

  const [editRoomGeneralInfo] = useEditRoomGeneralInfoMutation();
  const [editRoomServices] = useEditRoomServicesMutation();
  const [editRoomImages] = useEditRoomImagesMutation();
  const { roomServices, setterServices } = useRoomServices();
  const { roomGeneralInfo, setterGeneralInfo } = useRoomState();
  const { roomImages, setterImages } = useRoomImages();

  // Helper function to handle the async mutation with common checks
  const handleEdit = async (mutationFn: any, variables: any) => {
    if (!roomId) {
      console.error('Room ID is missing');
      return;
    }
    try {
      await mutationFn({ variables });
    } catch (error) {
      console.error('Error updating room:', error);
    }
  };

  // Create variables for editing room services
  const createRoomServicesVariables = () => {
    const { accessibility, bathroom, bedroom, foodAndDrink, internet, other } = roomServices;
    return {
      input: {
        id: roomId,
        accessibility,
        bathroom,
        bedroom,
        foodAndDrink,
        internet,
        other,
      },
    };
  };

  // Create variables for editing room general info
  const createRoomGeneralInfoVariables = () => {
    const { name, type, tax, roomInfo, price, bed, roomNumber } = roomGeneralInfo;
    return {
      input: {
        id: roomId,
        name,
        type,
        roomInfo,
        tax: tax ? parseFloat(tax) : null,
        bed: bed ? parseFloat(bed) : null,
        price: price ? parseFloat(price) : null,
        roomNumber: roomNumber ? parseFloat(roomNumber) : null,
      },
    };
  };

  // Create variables for editing room images
  const createRoomImagesVariables = () => {
    const { images } = roomImages;
    return {
      input: {
        id: roomId,
        images: images,
      },
    };
  };

  return (
    <div className="flex">
      <Sidebar hotels="active" guests="" />
      <div className="flex flex-col w-full min-h-screen">
        <Header />
        <div className="w-full h-full flex justify-center bg-[#F4F4F5]">
          <div className="py-4 flex flex-col gap-4 max-w-[1200px] w-full">
            <div className="flex items-center gap-4">
              <Link
                href="/admin/add-hotel"
                className="w-8 h-8 flex items-center justify-center rounded-[10px] border border-[#E4E4E7] bg-white shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] hover:bg-[#F4F4F5] duration-200"
              >
                <LeftArrow />
              </Link>
              <p className="font-Inter text-[#020617] text-lg font-semibold">{roomGeneralInfo?.name || 'Room Name'}</p>
            </div>
            <div className="flex gap-4">
              <div className="max-w-[784px] w-full flex flex-col gap-4">
                <GeneralInfo {...roomGeneralInfo} {...setterGeneralInfo} handleEditGeneralInfo={() => handleEdit(editRoomGeneralInfo, createRoomGeneralInfoVariables())} />
                <UpcomingBooking />
                <RoomServices {...roomServices} {...setterServices} handleEditRoomServices={() => handleEdit(editRoomServices, createRoomServicesVariables())} />
              </div>
              <div className="max-w-[400px] w-full flex flex-col gap-4">
                <Images {...roomImages} {...setterImages} handleEditHotelImages={() => handleEdit(editRoomImages, createRoomImagesVariables())} />
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};
