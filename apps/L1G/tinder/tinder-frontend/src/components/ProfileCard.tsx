import Image from 'next/image';
import React from 'react';

type ProfileCardType = {
  src: string;
  name: string;
  age: number;
  bio: string;
  classname?: string;
};

export const ProfileCard = ({ src, name, age, bio, classname = '' }: ProfileCardType) => {
  return (
    <div className={'w-[196px] h-[340px] lg:w-[336px] lg:h-[505px] flex flex-col relative justify-end items-start rounded-lg overflow-hidden ' + classname}>
      <Image src={src} fill alt={`Profile picture of ${name}`} className="object-cover absolute top-0 left-0 z-0" />

      <div className="relative z-10 w-full flex flex-col justify-end items-start p-5 gap-[6px] bg-gradient-to-b from-transparent to-black">
        <p className="font-sans text-white font-semibold text-[14px]">
          {name}, {age}
        </p>
        <p className="font-sans text-white font-normal text-[12px]">{bio}</p>
      </div>
    </div>
  );
};
