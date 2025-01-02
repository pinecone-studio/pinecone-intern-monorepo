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
    name: 'Rokitbay',
    age: 29,
    title: 'Executive Assistant',
    image: './rokitbay.jpg',
  },
  {
    id: 2,
    name: 'Justin',
    age: 25,
    title: 'Actress',
    image: './bla.jpg',
  },
  {
    id: 3,
    name: 'Jay Jobz',
    age: 34,
    title: 'Singer-Songwriter',
    image: './rokitbay.jpg',
  },
];

export const CarouselUser = () => {
  const [isMatchOpen, setIsMatchOpen] = useState(false);
  const handleMatch = () => {
    setIsMatchOpen(true);
  };

  return (
    <div className="flex items-center justify-between flex-col w-screen h-screen">
      <div className="w-[350px], h-[550px] flex flex-col mt-[80px] justify-between items-center">
        <Carousel className="w-full mt-8 max-w-[350px]">
          <CarouselContent>
            {profiles.map((profile) => (
              <CarouselItem key={profile.id}>
                <Card className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="relative">
                      <img src={profile.image} alt={profile.name} className="w-[350px] h-[450px] object-cover" />
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
            <CarouselPrevious className="w-10 h-10 rounded-md border absolute left-[12px] top-[220px] bg-white" />
            <div className="flex w-[144px] h-[64px] justify-between mt-12">
              <Button size="icon" variant="outline" className="rounded-full shadow-md w-[64px] h-[64px]">
                <X className="h-6 w-6 text-red-500" />
              </Button>
              <Button size="icon" variant="outline" className="rounded-full w-[64px] h-[64px] shadow-md" data-testid="matchPopup" onClick={handleMatch}>
                <Check className="h-6 w-6 text-green-500" />
              </Button>
            </div>
            <CarouselNext className="w-10 h-10 rounded-md border absolute right-[12px] top-[220px] bg-white" />
          </div>
        </Carousel>
      </div>
      <UserMatchComp isOpen={isMatchOpen} onClose={() => setIsMatchOpen(false)} userImage="./bla.jpg" data-testid="userMatch" matchImage="./rokitbay.jpg" matchName="Baatarvan" />
      <Tinder />
    </div>
  );
};
