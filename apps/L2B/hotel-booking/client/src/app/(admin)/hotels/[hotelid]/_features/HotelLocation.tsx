'use client';
import { useEffect, useState } from 'react';
import { useHotelQuery, useUpdateHotelMutation } from '@/generated';
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

export const HotelLocation = ({ hotelId }: { hotelId: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  const { data: { hotel } = {}, refetch } = useHotelQuery({
    variables: { hotelId: hotelId as string },
    skip: !hotelId,
  });

  const [location, setLocation] = useState(hotel?.location || '');
  const [updateHotel, { loading: mutationLoading }] = useUpdateHotelMutation();

  useEffect(() => {
    if (hotel?.location) {
      setLocation(hotel.location);
    }
  }, [hotel?.location]);

  const handleSave = async () => {
    if (!hotelId) return;

    try {
      await updateHotel({
        variables: {
          updateHotelId: hotelId,
          input: { location },
        },
      });
      await refetch();
      setIsOpen(false);
    } catch (err) {
      console.error('Failed to update location:', err);
    }
  };

  return (
    <div className="w-[23rem] h-36 bg-white rounded-[0.5rem] border flex flex-col gap-4 pt-4 px-6 pb-6">
      <div className="flex w-full h-9 justify-between items-center">
        <h4 className="text-lg font-semibold tracking-wide">Location</h4>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger data-testid="edit-location" className="py-2 flex items-center text-[#2563EB] text-sm font-medium">
            Edit
          </DialogTrigger>
          <DialogContent className="sm:min-w-[30rem]">
            <DialogHeader>
              <DialogTitle className="font-semibold text-base">Location</DialogTitle>
            </DialogHeader>
            <Textarea value={location} className="h-24 w-full" onChange={(e) => setLocation(e.target.value)} />
            <div className="w-full flex justify-between">
              <DialogClose asChild>
                <Button type="button" variant={'ghost'} onClick={() => setIsOpen(false)}>
                  Close
                </Button>
              </DialogClose>
              <Button onClick={handleSave} disabled={mutationLoading} className="px-4 py-2 bg-[#2563EB] hover:bg-[#2564ebeb]">
                {mutationLoading ? 'Saving...' : 'Save'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <p className="text-base font-normal">{hotel?.location || 'Location not available'}</p>
    </div>
  );
};
