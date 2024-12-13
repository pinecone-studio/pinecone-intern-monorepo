'use client';

import { Button } from '@/components/ui/button';
import { Container } from './assets';

export const Header = () => {
  return (
    <Container backgroundColor="bg-white">
      <div className="flex justify-between items-center h-16">
        <div className="flex flex-row gap-1 items-center">
          <div className="w-[20px] h-[20px] rounded-full bg-blue-600"></div>
          <h1 className="text-lg">Pedia</h1>
        </div>
        <div className="flex gap-4">
          <Button variant="ghost">My Booking</Button>
          <Button variant="ghost">Shagai</Button>
        </div>
      </div>
    </Container>
  );
};
