'use client';

import { Header } from '@/components/admin/main/Header';
import { Sidebar } from '@/features/admin/main/Sidebar';
import { Plus } from '@/components/admin/svg';
import { HotelDataTable, SelectLocation, SelectRoom, SelectStarRating, SelectUserRating } from '@/components/admin/ui';
import { useCreateHotelMutation, useGetHotelsQuery } from '@/generated';
import { useRouter } from 'next/navigation';

export const HomePage = () => {
  const { data } = useGetHotelsQuery();
  const [createHotel] = useCreateHotelMutation();
  const router = useRouter();

  const hotels = data?.getHotels || [];

  const handleCreateHotel = async () => {
    try {
      const variables = {
        input: {
          name: '-/-',
          phoneNumber: '-/-',
          rating: 0,
          starRating: 0,
          description: '-/-',
          images: ['-/-'],
          rooms: [],
          faqs: [{ key: '-/-', value: '-/-' }],
          policies: [{ key: '-/-', value: '-/-' }],
          about: [{ key: '-/-', value: '-/-' }],
          location: {
            type: 'Point',
            coordinates: [0],
          },
          locationName: '-/-',
          amenities: ['-/-'],
        },
      };

      const response = await createHotel({ variables });
      const hotelId = response?.data?.createHotel?.hotel?.id;

      router.push(`/admin/add-hotel/add-hotel?id=${hotelId}`);
    } catch (error) {
      console.error('Error creating hotel:', error);
    }
  };

  return (
    <div className="flex">
      <Sidebar hotels="active" guests="" />
      <div className="flex flex-col w-full min-h-screen">
        <Header />
        <div className="w-full h-full bg-[#F4F4F5] flex justify-center">
          <div className="max-w-[1654px] w-full h-full p-4 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <p className="font-Inter text-2xl font-semibold -tracking-[0.6px] text-[#020617]">Hotels</p>
              <button
                data-cy="Admin-Add-Hotel-Button"
                className="px-8 py-2 flex items-center gap-2 bg-[#2563EB] hover:bg-[#256eeb] duration-200 rounded-[6px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] h-10"
                onClick={handleCreateHotel}
              >
                <Plus />
                <p className="text-[#FAFAFA] font-Inter text-sm font-medium">Add Hotel</p>
              </button>
            </div>
            <div className="flex gap-2">
              <input type="text" className="px-3 py-2 w-full outline-none border border-[#E4E4E7] rounded-[6px] text-[#09090B] font-Inter text-sm font-normal h-10" placeholder="Search" />
              <SelectLocation />
              <SelectRoom />
              <SelectStarRating />
              <SelectUserRating />
            </div>
            <HotelDataTable data={hotels} />
          </div>
        </div>
      </div>
    </div>
  );
};
