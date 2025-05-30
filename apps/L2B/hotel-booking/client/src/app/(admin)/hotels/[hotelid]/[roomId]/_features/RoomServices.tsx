'use client';
import { useState, useCallback } from 'react';
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useUpdateRoomMutation } from '@/generated';
import { ServiceCategory, ServiceInput } from '../_components/RoomServiceComponents';

const CATEGORIES = [
  { key: 'bathroom', label: 'Bathroom' },
  { key: 'accessibility', label: 'Accessibility' },
  { key: 'entertainment', label: 'Entertainment' },
  { key: 'internet', label: 'Internet' },
  { key: 'foodAndDrink', label: 'Food and drink' },
  { key: 'bedroom', label: 'Bedroom' },
  { key: 'other', label: 'Other' },
];

export const RoomServices = ({ roomId, room }: { roomId: string; room: { services?: Record<string, string[]> } }) => {
  const [updateRoom] = useUpdateRoomMutation();
  const [isOpen, setIsOpen] = useState(false);
  const [services, setServices] = useState(room.services || {});
  const [inputs, setInputs] = useState(Object.fromEntries(CATEGORIES.map((c) => [c.key, ''])));
  const [loading, setLoading] = useState(false);

  const handleSave = useCallback(async () => {
    setLoading(true);
    try {
      await updateRoom({
        variables: { updateRoomId: roomId, input: { services } },
        refetchQueries: ['room'],
      });
      setIsOpen(false);
    } finally {
      setLoading(false);
    }
  }, [roomId, services, updateRoom]);

  const handleService = (category: string, action: 'add' | 'remove', service?: string) => {
    if (action === 'add') {
      const value = inputs[category].trim();
      if (value && !services[category]?.includes(value)) {
        setServices((s) => ({ ...s, [category]: [...(s[category] || []), value] }));
        setInputs((i) => ({ ...i, [category]: '' }));
      }
    } else if (service) {
      setServices((s) => ({ ...s, [category]: s[category]?.filter((s) => s !== service) || [] }));
    }
  };

  return (
    <div className="w-full bg-white rounded-lg border p-6" data-cy="room-services">
      <div className="flex justify-between items-center mb-4">
        <h4 className="text-lg font-semibold">Services</h4>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger className="text-blue-600 text-sm font-medium" data-cy="edit-services-button">
            Edit
          </DialogTrigger>
          <DialogContent className="min-w-[50rem] max-h-[80vh]" data-cy="room-services-form">
            <DialogHeader>
              <DialogTitle>Room Services</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 overflow-y-auto">
              {CATEGORIES.map(({ key, label }) => (
                <ServiceInput
                  key={key}
                  label={label}
                  services={services[key] || []}
                  value={inputs[key]}
                  onChange={(value) => setInputs((i) => ({ ...i, [key]: value }))}
                  onAdd={() => handleService(key, 'add')}
                  onRemove={(service) => handleService(key, 'remove', service)}
                />
              ))}
            </div>
            <div className="flex justify-between mt-4">
              <DialogClose asChild>
                <Button variant="ghost" data-cy="services-cancel-button">
                  Close
                </Button>
              </DialogClose>
              <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700" disabled={loading} data-cy="services-save-button">
                {loading ? 'Saving...' : 'Save'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <div className="border-b my-4"></div>
      <div className="space-y-4">
        {CATEGORIES.map(({ key, label }, i) => (
          <div key={key} className="flex w-full gap-8" data-cy={`service-category-${key}`}>
            <ServiceCategory label={label} services={services[key] || []} />
            {i % 2 === 0 && i < CATEGORIES.length - 1 && <ServiceCategory label={CATEGORIES[i + 1].label} services={services[CATEGORIES[i + 1].key] || []} />}
          </div>
        ))}
      </div>
    </div>
  );
};
