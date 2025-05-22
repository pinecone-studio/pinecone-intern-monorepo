'use client';

import { useState } from 'react';
import { useHotelQuery, useUpdateHotelMutation } from '@/generated';
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

export const HotelLocation = () => {
  const hotelId = '682ac7df47df32a8a9907cb1';
  const { data, refetch } = useHotelQuery({
    variables: { hotelId },
  });

  const hotel = data?.hotel;
  const [location, setLocation] = useState(hotel?.location || '');
  const [updateHotel, { loading }] = useUpdateHotelMutation();

  const handleSave = async () => {
    try {
      await updateHotel({
        variables: {
          updateHotelId: hotelId,
          input: {
            location,
          },
        },
      });
      await refetch();
    } catch (err) {
      console.error('Failed to update location:', err);
    }
  };

  return (
    <div className="w-[23rem] h-36 bg-white rounded-[0.5rem] flex flex-col gap-4 pt-4 px-6 pb-6">
      <div className="flex w-full h-9 justify-between items-center">
        <h4 className="text-lg font-semibold tracking-wide">Location</h4>
        <AlertDialog>
          <AlertDialogTrigger className="py-2 flex items-center text-[#2563EB] text-sm font-medium">Edit</AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="font-semibold text-base">Location</AlertDialogTitle>
            </AlertDialogHeader>
            <Textarea value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Please fill in the hotel's location" />
            <div className="w-full flex justify-between">
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <Button onClick={handleSave} disabled={loading} className="px-4 py-2 bg-[#2563EB] hover:bg-[#2564ebeb]">
                {loading ? 'Saving...' : 'Save'}
              </Button>
            </div>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      <p className="text-base font-normal">{hotel?.location || 'Location loading...'}</p>
    </div>
  );
};
