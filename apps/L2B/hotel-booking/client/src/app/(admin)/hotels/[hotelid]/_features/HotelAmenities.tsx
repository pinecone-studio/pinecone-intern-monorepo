'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useHotelQuery, useUpdateHotelMutation } from '@/generated';
import { useState, useEffect, useRef } from 'react';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { X } from 'lucide-react';

export const HotelAmenities = ({ hotelId }: { hotelId: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [originalAmenities, setOriginalAmenities] = useState<string[]>([]);
  const [editingAmenities, setEditingAmenities] = useState<string[]>([]);
  const [updateHotel, { loading: mutationLoading }] = useUpdateHotelMutation();
  const inputRef = useRef<HTMLInputElement>(null);

  const { data, refetch } = useHotelQuery({
    variables: { hotelId: hotelId as string },
    skip: !hotelId,
    onError: (error) => [console.log('error', error)],
  });
  const hotel = data?.hotel;

  console.log(hotelId, hotel);

  useEffect(() => {
    if (hotel?.amenities) {
      const safeAmenities = hotel.amenities.filter((item): item is string => item != null);
      setOriginalAmenities(safeAmenities);
      setEditingAmenities(safeAmenities);
    }
  }, [hotel?.amenities]);

  const handleAddAmenity = () => {
    const value = inputValue.trim();
    if (value && !editingAmenities.includes(value)) {
      setEditingAmenities([...editingAmenities, value]);
      setInputValue('');
    }
  };

  const handleRemoveAmenity = (amenityToRemove: string) => {
    setEditingAmenities(editingAmenities.filter((amenity) => amenity !== amenityToRemove));
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddAmenity();
    } else if (e.key === 'Backspace' && inputValue === '' && editingAmenities.length > 0) {
      handleRemoveAmenity(editingAmenities[editingAmenities.length - 1]);
    }
  };

  const handleSave = async () => {
    if (!hotelId) return;

    await updateHotel({
      variables: {
        updateHotelId: hotelId,
        input: {
          amenities: editingAmenities,
        },
      },
    });

    refetch();
    setIsOpen(false);
    setOriginalAmenities(editingAmenities);
  };

  const handleDialogOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      setEditingAmenities(originalAmenities);
    }
  };

  return (
    <div className="w-[49rem] max-h-[19.5rem] bg-white flex flex-col p-6 rounded-[0.5rem] border">
      <div className="flex w-full h-9 justify-between items-center">
        <h4 className="text-lg font-semibold tracking-wide">Amenities</h4>
        <Dialog open={isOpen} onOpenChange={handleDialogOpenChange}>
          <DialogTrigger className="py-2 flex items-center text-[#2563EB] text-sm font-medium">Edit</DialogTrigger>
          <DialogContent className="sm:min-w-[38rem]">
            <DialogHeader>
              <DialogTitle className="font-semibold text-base">Amenities</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col gap-4 w-full ">
              <div className="flex flex-col gap-1">
                <Label>Amenities</Label>
                <div className="flex flex-wrap items-center gap-2 p-2 border rounded-md min-h-10">
                  {editingAmenities.map((amenity, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center gap-1 pr-1.5">
                      {amenity}
                      <button type="button" onClick={() => handleRemoveAmenity(amenity)} className="rounded-full hover:bg-gray-300 p-0.5">
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                  <input
                    ref={inputRef}
                    value={inputValue}
                    data-testid="amenities-input"
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={editingAmenities.length === 0 ? 'e.g. Pool, WiFi, Gym...' : ''}
                    className="flex-1 min-w-[100px] outline-none bg-transparent"
                  />
                </div>
              </div>
            </div>
            <div className="w-full flex justify-between mt-4">
              <DialogClose asChild>
                <Button type="button" variant={'ghost'}>
                  Close
                </Button>
              </DialogClose>
              <Button className="px-4 py-2 bg-[#2563EB] hover:bg-[#2564ebeb]" onClick={handleSave} disabled={mutationLoading}>
                {mutationLoading ? 'Saving...' : 'Save'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <div className="w-full pt-6 self-stretch border-b"></div>
      <div className="w-full pb-6 self-stretch border-t"></div>
      <div className="w-full flex gap-2 flex-wrap">
        {originalAmenities.map((item, index) => (
          <Badge key={index} variant={'secondary'}>
            {item}
          </Badge>
        ))}
      </div>
    </div>
  );
};
