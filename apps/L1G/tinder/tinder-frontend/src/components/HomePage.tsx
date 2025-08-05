import React from 'react';
import { ProfileCard } from './ProfileCard';
import TinderLogo from './TinderLogo';
import { Button } from '@/components/ui/button';

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
    src: 'https://i.insider.com/681cc2f3a466d2b74ab56231?width=700',
  },
  {
    name: 'Mark Zuckerberg',
    age: 40,
    bio: 'Software Engineer Facebook',
    src: 'https://images.unsplash.com/photo-1507019403270-cca502add9f8?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Z2lybCUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D',
  },
  {
    name: 'Mark Zuckerberg',
    age: 40,
    bio: 'Software Engineer Facebook',
    src: 'https://media.istockphoto.com/id/1682296067/photo/happy-studio-portrait-or-professional-man-real-estate-agent-or-asian-businessman-smile-for.jpg?s=612x612&w=0&k=20&c=9zbG2-9fl741fbTWw5fNgcEEe4ll-JegrGlQQ6m54rg=',
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
  return (
    <div className="max-w-[1280px] w-[1280px] h-[64px] flex justify-between items-center px-4  gap-4 ">
      <TinderLogo />

      <div className="flex gap-4">
        <Button className="py-2 px-4 bg-transparent text-[#FAFAFA] inter font-[500] text-[14px]">Create Account</Button>
        <Button className="py-2 px-4 bg-white text-[#18181B] font-[500] inter text-[14px] rounded-full">Log in</Button>
      </div>
    </div>
  );
};

export const HomeMain = () => {
  return (
    <div className="flex flex-col justify-between items-center px-4 gap-4">
      <p className="font-[700] text-[64px] py-2 px-4 text-[#FAFAFA] inter rounded-full">Swipe Right®</p>
      <Button className="bg-[#E11D48] font-[700] text-[14px] py-2 px-4 text-[#FAFAFA] inter rounded-full">Create Account</Button>
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
