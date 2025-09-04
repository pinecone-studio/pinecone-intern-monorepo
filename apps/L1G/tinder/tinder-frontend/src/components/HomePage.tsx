'use client';
import React from 'react';
import { ProfileCard } from './ProfileCard';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { WhiteTinderLogo } from './TinderLogo';

const mockUsers = [
  {
    name: 'Mark Zuckerberg',
    age: 40,
    bio: 'Software Engineer Facebook',
    // eslint-disable-next-line no-secrets/no-secrets
    src: 'https://res.cloudinary.com/dx4imbbcs/image/upload/v1754461980/1_zhvyfo.jpg',
  },
  {
    name: 'Mark Zuckerberg',
    age: 40,
    bio: 'Software Engineer Facebook',
    // eslint-disable-next-line no-secrets/no-secrets
    src: 'https://res.cloudinary.com/dx4imbbcs/image/upload/v1754462051/3_xgk8e5.jpg',
  },
  {
    name: 'Mark Zuckerberg',
    age: 40,
    bio: 'Software Engineer Facebook',
    // eslint-disable-next-line no-secrets/no-secrets
    src: 'https://res.cloudinary.com/dx4imbbcs/image/upload/v1754462051/4_voo5zu.jpg',
  },
  {
    name: 'Mark Zuckerberg',
    age: 40,
    bio: 'Software Engineer Facebook',
    // eslint-disable-next-line no-secrets/no-secrets
    src: 'https://res.cloudinary.com/dx4imbbcs/image/upload/v1754462054/2_fbcumd.jpg',
  },
];

export const HomePageBackground = () => {
  return (
    <div className="h-fit flex flex-col gap-4 ">
      {mockUsers.map((user, index) => (
        <ProfileCard key={index} name={user.name} src={user.src} age={user.age} bio={user.bio} classname="" />
      ))}
    </div>
  );
};

export const HomeHeader = () => {
  const router = useRouter();

  return (
    <div className="max-w-[1280px] w-[1280px] h-[64px] flex justify-between items-center px-4  gap-4 ">
      <WhiteTinderLogo />

      <div className="flex gap-4">
        <Button className="py-2 px-4 bg-transparent text-[#FAFAFA] font-sans font-[500] text-[14px] rounded-full" onClick={() => router.push('/signup')}>
          Create Account
        </Button>
        <Button className="py-2 px-4 bg-white text-[#18181B] font-[500] font-sans text-[14px] rounded-full hover:text-white" onClick={() => router.push('/login')}>
          Log in
        </Button>
      </div>
    </div>
  );
};

export const HomeMain = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col justify-between items-center px-4 gap-4">
      <p className="font-[700] text-[36px] md:text-[64px] py-2 px-4 text-[#FAFAFA] font-sans rounded-full text-center">Swipe Right®</p>
      <Button className="flex h-[40px] justify-center items-center bg-[#E11D48] font-[700] text-[14px] py-2 px-4 text-[#FAFAFA] font-sans rounded-full" onClick={() => router.push('/signup')}>
        Create Account
      </Button>
    </div>
  );
};

export const HomeFooter = () => {
  return (
    <div className="max-w-[1552px] w-[1552px] h-[64px] flex justify-between items-center px-4 py-8 gap-4 opacity-50">
      <WhiteTinderLogo />

      <p className="text-[#FAFAFA] font-sans text-sm ">© Copyright 2024</p>
    </div>
  );
};
