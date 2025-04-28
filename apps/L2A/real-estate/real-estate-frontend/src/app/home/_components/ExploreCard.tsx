'use client';

import Image from 'next/image';

type ExploreCardProps = {
  title: string;
  imageUrl: string;
};

const ExploreCard = ({ title, imageUrl }: ExploreCardProps) => {
  return (
    <div className="relative w-full h-[250px] rounded-lg overflow-hidden group cursor-pointer">
      <Image src={imageUrl} alt={title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
      <div className="absolute inset-0 bg-black/30"></div>
      <div className="absolute bottom-4 left-4 text-white text-2xl font-bold drop-shadow-md">{title}</div>
    </div>
  );
};

export default ExploreCard;
