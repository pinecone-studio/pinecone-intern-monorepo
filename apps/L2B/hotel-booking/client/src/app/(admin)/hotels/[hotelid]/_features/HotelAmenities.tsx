'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { X } from 'lucide-react';
import { useUpdateHotelMutation } from '@/generated';

export const HotelAmenities = ({ hotel, refetch }: { hotel: { _id: string; amenities?: (string | null)[] }; refetch: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [originalAmenities, setOriginalAmenities] = useState<string[]>([]);
  const [editingAmenities, setEditingAmenities] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const [updateHotel, { loading: mutationLoading }] = useUpdateHotelMutation();

  useEffect(() => {
    const safeAmenities = (hotel.amenities ?? []).filter((a): a is string => a !== null);
    setOriginalAmenities(safeAmenities);
    setEditingAmenities(safeAmenities);
  }, [hotel.amenities]);

  const handleAddAmenity = () => {
    const value = inputValue.trim();
    if (value && !editingAmenities.includes(value)) {
      setEditingAmenities([...editingAmenities, value]);
      setInputValue('');
    }
  };

  const handleRemoveAmenity = (amenity: string) => {
    setEditingAmenities(editingAmenities.filter((a) => a !== amenity));
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddAmenity();
    }
  };

  const handleSave = async () => {
    await updateHotel({
      variables: {
        updateHotelId: hotel._id,
        input: { amenities: editingAmenities },
      },
    });
    await refetch();
    setOriginalAmenities(editingAmenities);
    setIsOpen(false);
  };

  return (
    <div className="w-[49rem] max-h-[19.5rem] bg-white flex flex-col p-6 rounded-[0.5rem] border">
      <div className="flex w-full h-9 justify-between items-center">
        <h4 className="text-lg font-semibold tracking-wide">Amenities</h4>
        <Dialog
          open={isOpen}
          onOpenChange={(o) => {
            setIsOpen(o);
            if (!o) setEditingAmenities(originalAmenities);
          }}
        >
          <DialogTrigger className="py-2 flex items-center text-[#2563EB] text-sm font-medium">Edit</DialogTrigger>
          <DialogContent className="sm:min-w-[38rem]">
            <DialogHeader>
              <DialogTitle className="font-semibold text-base">Amenities</DialogTitle>
            </DialogHeader>

            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <Label>Amenities</Label>
                <div className="flex flex-wrap items-center gap-2 p-2 border rounded-md min-h-10">
                  {editingAmenities.map((amenity, i) => (
                    <Badge key={i} variant="secondary" className="flex items-center gap-1 pr-1.5">
                      {amenity}
                      <button type="button" onClick={() => handleRemoveAmenity(amenity)} className="rounded-full hover:bg-gray-300 p-0.5">
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                  <input
                    ref={inputRef}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    data-testid="amenities-input"
                    placeholder={editingAmenities.length === 0 ? 'e.g. Pool, WiFi, Gym…' : ''}
                    className="flex-1 min-w-[100px] outline-none bg-transparent"
                  />
                </div>
              </div>
            </div>

            <div className="w-full flex justify-between mt-4">
              <DialogClose asChild>
                <Button type="button" variant="ghost">
                  Close
                </Button>
              </DialogClose>
              <Button onClick={handleSave} disabled={mutationLoading} className="px-4 py-2 bg-[#2563EB] hover:bg-[#2564ebeb]">
                {mutationLoading ? 'Saving…' : 'Save'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="w-full pt-6 border-b" />
      <div className="w-full pb-6 border-t" />
      <div className="w-full flex gap-2 flex-wrap">
        {originalAmenities.map((a, i) => (
          <Badge key={i} variant="secondary">
            {a}
          </Badge>
        ))}
      </div>
    </div>
  );
};
