import React from 'react';
import { Container } from './assets';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { LucideKey, Mail } from 'lucide-react';
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';

export const UserSettings = () => {
  return (
    <Container backgroundColor="bg-white">
      <div className="flex flex-col gap-4 mb-1 mt-10 w-[652px]">
        <Label htmlFor="name" className="text-left text-lg">
          Security & Settings
        </Label>
        <p className="text-[#71717A] text-sm font-thin mb-2">keep your account safe with a secure password</p>

        <div className="flex border border-x-1 mb-2"></div>
        <div className="flex w-full gap-4">
          <Button className=" flex w-full gap-2 bg-white text-black border  hover:bg-white">
            <Mail />
            <div className="flex  items-start flex-col p-4">
              <div>Email</div>
              <div>n.shagai@pinecone.mn</div>
            </div>
          </Button>
          <Button className=" flex w-full gap-2 bg-white text-black border  hover:bg-white">
            <div>
              <LucideKey />
            </div>
            <div className="flex  items-start p-4">
              <div>Change passowrd</div>
            </div>
            <div>
              <MdOutlineKeyboardArrowRight />
            </div>
          </Button>
        </div>
      </div>
    </Container>
  );
};
