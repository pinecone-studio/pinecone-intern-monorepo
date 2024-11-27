'use client';
import { AlertDialog, AlertDialogContent, AlertDialogTrigger, AlertDialogCancel } from '@/components/ui/alert-dialog';
import { Card, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

import { Button } from '@/components/ui/button';
import { Star, X } from 'lucide-react';
import { useState } from 'react';

export const AdvertisedEvent = () => {
  const [selectedOption, setSelectedOption] = useState<'yes' | 'no'>('no');

  return (
    <div data-testid="AdvertisedEvent-Component">
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button type="button" variant="outline" aria-label="Show star">
            <Star data-testid="AdvertisedEvent-TriggerButton" className="h-5 w-5" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="w-[511px] border-none shadow-none" data-testid="AdvertisedEvent-DialogContent">
          <Card className="w-full border-none gap-4" data-testid="AdvertisedEvent-Card">
            <CardHeader className="gap-4" data-testid="AdvertisedEvent-CardHeader">
              <div className="flex justify-between items-center" data-testid="AdvertisedEvent-HeaderActions">
                <CardTitle data-testid="AdvertisedEvent-Title">Онцлох тоглолт болгох</CardTitle>
                <AlertDialogCancel asChild>
                  <button type="button" className="text-gray-500 hover:text-gray-700 focus:outline-none" aria-label="Close" data-testid="AdvertisedEvent-CloseButton">
                    <X className="h-5 w-5" />
                  </button>
                </AlertDialogCancel>
              </div>

              <RadioGroup value={selectedOption} onValueChange={(value) => setSelectedOption(value as 'yes' | 'no')} className="flex">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="r1" data-testid="Yes-btn" />
                  <Label htmlFor="r1">Тийм</Label>
                </div>
                <div className="flex items-center space-x-2" data-testid="AdvertisedEvent-RadioOptionNo">
                  <RadioGroupItem value="no" id="r2" data-testid="No-btn" />
                  <Label htmlFor="r2">Үгүй</Label>
                </div>
              </RadioGroup>
            </CardHeader>

            <CardFooter className="flex justify-between" data-testid="AdvertisedEvent-CardFooter">
              <Button className="w-full" data-testid="AdvertisedEvent-SaveButton">
                Хадгалах
              </Button>
            </CardFooter>
          </Card>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
