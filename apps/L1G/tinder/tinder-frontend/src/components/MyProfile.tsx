'use client';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import React from 'react';
import { MyProfileForm } from './MyProfileForm';

export const MyProfile = () => {
  return (
    <div className="w-full h-fit flex flex-col gap-6 py-10 px-6">
      <MyProfileHeader />

      <div className="flex justify-start items-start gap-12">
        <div className="flex flex-col gap-1">
          <Button className="w-[250px] rounded-md bg-transparent py-2 px-4 hover:bg-[#F4F4F5] text-[#09090B] text-[14px] font-sans font-[400] flex justify-start items-center">Profile</Button>
          <Button className="w-[250px] rounded-md bg-transparent py-2 px-4 hover:bg-[#F4F4F5] text-[#09090B] text-[14px] font-sans font-[400] flex justify-start items-center">Images</Button>
        </div>

        <div className="w-[672px] max-w-[672px] h-fit flex flex-col ">
          <div className="flex flex-col gap-[1px] justify-start items-start ">
            <p className="text-[18px] font-sans font-[500] text-[#09090B]">Personal Information</p>
            <p className="text-[14px] font-sans font-[400] text-[#71717A]">This is how others will see you on the site.</p>
          </div>

          <div className="py-6">
            <Separator />
          </div>

          <MyProfileForm />
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
