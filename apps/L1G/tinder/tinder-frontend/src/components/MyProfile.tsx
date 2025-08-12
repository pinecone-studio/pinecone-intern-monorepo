'use client';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import React, { useState } from 'react';
import { MyProfileForm } from './MyProfileForm';
import { MyImages } from './MyImages';

export const MyProfile = () => {
  const [menu, setMenu] = useState<'profile' | 'images' | 'appearance' | 'notifications' | 'display'>('profile');
  return (
    <div className="w-full h-fit flex flex-col gap-6 py-10 px-6">
      <MyProfileHeader />

      <div className="flex justify-start items-start gap-12">
        <div className="flex flex-col gap-1">
          <Button
            onClick={() => setMenu('profile')}
            className={`w-[250px] rounded-md py-2 px-4 text-[#09090B] text-[14px] font-sans font-[400] flex justify-start items-center 
                ${menu === 'profile' ? 'bg-[#F4F4F5] hover:bg-[#F4F4F5]' : 'bg-transparent hover:bg-[#F4F4F5]'}`}
          >
            Profile
          </Button>
          <Button
            onClick={() => setMenu('images')}
            className={`w-[250px] rounded-md py-2 px-4 text-[#09090B] text-[14px] font-sans font-[400] flex justify-start items-center 
                ${menu === 'images' ? 'bg-[#F4F4F5] hover:bg-[#F4F4F5]' : 'bg-transparent hover:bg-[#F4F4F5]'}`}
          >
            Images
          </Button>

          <Button
            onClick={() => setMenu('appearance')}
            className="w-[250px] rounded-md bg-transparent py-2 px-4 hover:bg-[#F4F4F5] text-[#09090B] text-[14px] font-sans font-[400] flex justify-start items-center"
          >
            Appearance
          </Button>
          <Button
            onClick={() => setMenu('notifications')}
            className="w-[250px] rounded-md bg-transparent py-2 px-4 hover:bg-[#F4F4F5] text-[#09090B] text-[14px] font-sans font-[400] flex justify-start items-center"
          >
            Notifications
          </Button>
          <Button
            onClick={() => setMenu('display')}
            className="w-[250px] rounded-md bg-transparent py-2 px-4 hover:bg-[#F4F4F5] text-[#09090B] text-[14px] font-sans font-[400] flex justify-start items-center"
          >
            Display
          </Button>
        </div>

        <div className="w-[672px] max-w-[672px] h-fit flex flex-col ">
          {menu === 'profile' && <MyProfileForm />}
          {menu === 'images' && <MyImages />}
          {menu === 'appearance' && <div>Appearance Settings</div>}
          {menu === 'notifications' && <div>Notification Settings</div>}
          {menu === 'display' && <div>Display Settings</div>}
        </div>
      </div>
    </div>
  );
};

export const MyProfileHeader = () => {
  return (
    <div className="w-full h-fit flex flex-col gap-6 px-6">
      <div className="flex flex-col gap-[2px] justify-start items-start">
        <p className="text-[24px] font-sans font-[600] text-[#09090B]">Hi, user</p>
        <p className="text-[14px] font-sans font-[400] text-[#71717A]">n.shagai@pinecone.mn</p>
      </div>

      <Separator />
    </div>
  );
};
