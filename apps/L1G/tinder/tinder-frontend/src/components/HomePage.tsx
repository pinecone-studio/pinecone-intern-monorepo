'use client';
import React from 'react';
import { ProfileCard } from './ProfileCard';
import TinderLogo from './TinderLogo';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

const mockUsers = [
  {
    name: 'Mark Zuckerberg',
    age: 40,
    bio: 'Software Engineer Facebook',
    src: 'https://i.pinimg.com/736x/c5/db/05/c5db056c6f75668bbf4bfe16d6481036.jpg',
  },
  {
    name: 'Mark Zuckerberg',
    age: 40,
    bio: 'Software Engineer Facebook',
    src: 'https://i.pinimg.com/1200x/54/35/f1/5435f149b7200e72bbc0dfa1fcd721dd.jpg',
  },
  {
    name: 'Mark Zuckerberg',
    age: 40,
    bio: 'Software Engineer Facebook',
    src: 'https://i.pinimg.com/736x/35/47/07/35470774f4c232e8bddbdd3e94c4a79d.jpg',
  },
  {
    name: 'Mark Zuckerberg',
    age: 40,
    bio: 'Software Engineer Facebook',
    src: 'https://i.pinimg.com/736x/63/0d/6a/630d6ad73a8b465a717863df09795648.jpg',
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
      <TinderLogo />

      <div className="flex gap-4">
        <Button className="py-2 px-4 bg-transparent text-[#FAFAFA] inter font-[500] text-[14px]" onClick={() => router.push('/signup')}>
          Create Account
        </Button>
        <Button className="py-2 px-4 bg-white text-[#18181B] font-[500] inter text-[14px] rounded-full" onClick={() => router.push('/login')}>
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
      <p className="font-[700] text-[64px] py-2 px-4 text-[#FAFAFA] inter rounded-full">Swipe Right®</p>
      <Button className="flex h-[40px] justify-center items-center bg-[#E11D48] font-[700] text-[14px] py-2 px-4 text-[#FAFAFA] inter rounded-full" onClick={() => router.push('/signup')}>
        Create Account
      </Button>
    </div>
  );
};

export const HomeFooter = () => {
  return (
    <div className="max-w-[1552px] w-[1552px] h-[64px] flex justify-between items-center px-4 py-8 gap-4 opacity-50">
      <TinderLogo />

      <p className="text-[#FAFAFA] font-sans text-sm ">© Copyright 2024</p>
    </div>
  );
};
