'use client';
import { AlertDialog, AlertDialogContent, AlertDialogTrigger, AlertDialogCancel } from '@/components/ui/alert-dialog';
import { Card, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

import { Star, X } from 'lucide-react';
import { useState } from 'react';
import { useUpdateEventStatusMutation } from '@/generated';

export const AdvertisedEvent = ({ eventId }: { eventId: string }) => {
  const [updatestatus] = useUpdateEventStatusMutation();
  const [selectedOption, setSelectedOption] = useState<'Тийм' | 'Үгүй'>('Үгүй');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleUpdateStatus = async () => {
    const status = selectedOption === 'Тийм' ? 'Онцлох' : 'Reqular';

    await updatestatus({
      variables: {
        input: { _id: eventId, status },
      },
    });

    setIsDialogOpen(false);
  };

  return (
    <div data-testid="AdvertisedEvent-Component">
      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogTrigger asChild>
          <Star data-testid="AdvertisedEvent-TriggerButton" className="h-5 w-5 bg-[#F4F4F5] rounded cursor-pointer p-[2px]" />
        </AlertDialogTrigger>

        <AlertDialogContent className="w-[511px] border-none shadow-none" data-testid="AdvertisedEvent-DialogContent">
          <Card className="w-full border-none gap-4" data-testid="AdvertisedEvent-Card">
            <CardHeader className="gap-4" data-testid="AdvertisedEvent-CardHeader">
              <div className="flex justify-between items-center" data-testid="AdvertisedEvent-HeaderActions">
                <CardTitle data-testid="AdvertisedEvent-Title">Онцлох тоглолт болгох</CardTitle>
                <AlertDialogCancel asChild>
                  <button type="button" className="text-gray-500 hover:text-gray-700 focus:outline-none" aria-label="Close" data-testid="exit" onClick={() => setIsDialogOpen(false)}>
                    <X className="h-5 w-5" />
                  </button>
                </AlertDialogCancel>
              </div>

              <RadioGroup value={selectedOption} onValueChange={(value) => setSelectedOption(value as 'Тийм' | 'Үгүй')} className="flex">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Тийм" id="r1" data-testid="Yes-btn" />
                  <Label htmlFor="r1">Тийм</Label>
                </div>
                <div className="flex items-center space-x-2" data-testid="AdvertisedEvent-RadioOptionNo">
                  <RadioGroupItem value="Үгүй" id="r2" data-testid="No-btn" />
                  <Label htmlFor="r2">Үгүй</Label>
                </div>
              </RadioGroup>
            </CardHeader>

            <CardFooter className="flex justify-between" data-testid="AdvertisedEvent-CardFooter">
              <button
                className="w-full border rounded bg-black text-white p-2"
                data-testid="btn"
                placeholder="btn"
                onClick={async () => {
                  await handleUpdateStatus();
                }}
              >
                Хадгалах
              </button>
            </CardFooter>
          </Card>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
