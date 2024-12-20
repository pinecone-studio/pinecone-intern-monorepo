'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Check, X } from 'lucide-react';
import Tinder from '../common/Tinder';
import { UserMatchComp } from './UserMatchComp';

type ProfileCard = {
  id: number;
  name: string;
  age: number;
  title: string;
  image: string;
};

const profiles: ProfileCard[] = [
  {
    id: 1,
    name: 'Diddy',
    age: 29,
    title: 'Executive Assistant',
    image: 'hehe',
  },
  {
    id: 2,
    name: 'Justin',
    age: 25,
    title: 'Actress',
    image: 'haha',
  },
  {
    id: 3,
    name: 'Jay Jobz',
    age: 34,
    title: 'Singer-Songwriter',
    image: 'hoho',
  },
];

export const CarouselUser = () => {
  const [isMatchOpen, setIsMatchOpen] = useState(false);
  const handleMatch = () => {
    setIsMatchOpen(true);
  };

  return (
    <div className="flex items-center justify-between flex-col w-screen h-screen">
      <div className="w-[440px], h-[756px] flex flex-col mt-[80px] justify-between items-center">
        <Carousel className="w-full max-w-[440px]">
          <CarouselContent>
            {profiles.map((profile) => (
              <CarouselItem key={profile.id}>
                <Card className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="relative aspect-[3/4]">
                      <img src={profile.image} alt={profile.name} className="w-[440px] h-[600px] object-cover" />
                      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent text-white">
                        <div className="flex items-center gap-2">
                          <h2 className="text-[18px] font-semibold">{profile.name}</h2>
                          <p className="text-[18px] font-semibold">{profile.age} </p>
                        </div>
                        <p className="text-sm">{profile.title}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-center items-center">
            <CarouselPrevious className="w-10 h-10 rounded-md border absolute left-[12px] top-[310px] bg-white" />
            <div className="flex w-[144px] h-[64px] justify-between mt-12">
              <Button size="icon" variant="outline" className="rounded-full shadow-md w-[64px] h-[64px]">
                <X className="h-6 w-6 text-red-500" />
              </Button>
              <Button size="icon" variant="outline" className="rounded-full w-[64px] h-[64px] shadow-md" data-testid="matchPopup" onClick={handleMatch}>
                <Check className="h-6 w-6 text-green-500" />
              </Button>
            </div>
            <CarouselNext className="w-10 h-10 rounded-md border absolute right-[12px] top-[310px] bg-white" />
          </div>
        </Carousel>
      </div>
      <UserMatchComp isOpen={isMatchOpen} onClose={() => setIsMatchOpen(false)} userImage="rokitbay" data-testid="userMatch" matchImage="fla" matchName="Baatarvan" />
      <Tinder />
    </div>
  );
};
