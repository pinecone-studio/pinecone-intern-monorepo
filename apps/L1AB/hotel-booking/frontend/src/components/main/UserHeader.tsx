'use client';
import React from 'react';
import { Container } from './assets';

export const UserHeader = () => {
  return (
    <Container backgroundColor="bg-white ">
      <div className="flex items-center gap-2">
        <div className="container px-5 flex items-center justify-between">
          <div className="flex gap-1 py-3 items-center">
            <div className="w-5 h-5 rounded-full bg-[#2563EB]"></div>
            <div className="font-normal text-xl flex font-sans">Pedia</div>
          </div>
          <div className="flex gap-4 ">
            <p className="font-medium text-sm py-[10px] px-4">My Booking</p>
            <p className="font-medium text-sm py-[10px] px-4">Shagai</p>
          </div>
        </div>
      </div>
    </Container>
  );
};
