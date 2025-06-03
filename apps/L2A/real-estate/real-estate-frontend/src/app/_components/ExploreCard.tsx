'use client';

import Image from 'next/image';

type ExploreCardProps = {
  title: string;
  imageUrl: string;
};

const ExploreCard = ({ title, imageUrl }: ExploreCardProps) => {
  return (
    <div className="relative w-full h-[250px] rounded-lg shadow-md overflow-hidden group cursor-pointer transition-all duration-500 ease-in-out hover:scale-[1.05] hover:shadow-xl hover:translate-y-[-2px]">
      <Image src={imageUrl} alt={title} fill className="object-cover " />
      <div className="absolute inset-0 bg-black/30"></div>
      <div className="absolute bottom-4 left-4 text-white text-2xl font-bold drop-shadow-md">{title}</div>
    </div>
  );
};

export default ExploreCard;
