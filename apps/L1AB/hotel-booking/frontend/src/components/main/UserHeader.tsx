import React from 'react';
import { Container } from './assets';

export const UserHeader = () => {
  return (
    <Container backgroundColor="bg-white ">
      <div className="flex items-center gap-2">
        <div className="container bg-green-100 px-5 flex items-center justify-between">
          <div className="flex gap-1 py-3 items-center bg-yellow-500">
            <div className="w-5 h-5 rounded-full bg-[#2563EB]"></div>
            <div className="font-normal text-xl flex font-sans">Pedia</div>
          </div>
          <div className="flex gap-4 ">
            <p className="font-medium text-sm py-[10px] px-4">My Booking</p>
            <p className="font-medium text-sm py-[10px] px-4">Shagai</p>
          </div>
        </div>
      </div>
      <div className="bg-pink-200 border border-black m-auto">
        <div className="container m-auto h-fit bg-blue-200 px-6 pt-10 pb-16 ">
          <h3 className="text-2xl font-semibold">Hi, Shagai</h3>
          <p className="text-[#71717A] text-base font-thin mb-6">n.shagai@pinecone.mn</p>
          <div className="border border-x-2 mb-6"></div>
          <div className="flex">
            <div className="flex justify-start w-[250px]  flex-col ">
              <button className="pl-4  flex py-2 bg-[#F4F4F5] rounded-md">Profile</button>
              <button className="px-4 flex py-2  ">Account</button>
              <button className="px-4 flex py-2 ">Appearance</button>
              <button className="px-4  flex py-2 ">Notification</button>
              <button className="px-4 flex py-2 ">Display</button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className="container bg-green-100  m-auto flex  items-center justify-between">
          <div className="flex gap-1 py-3 px-4 items-center mt-96">
            <div className="w-4 h-4 rounded-full bg-[#09090B]"></div>
            <div className="font-normal text-base flex font-sans">Pedia</div>
          </div>
        </div>
      </div>
    </Container>
  );
};
