'use client';

import Image from 'next/image';

type CategoryCardProps = {
  title: string;
  imageUrl: string;
};

const CategoryCard = ({ title, imageUrl }: CategoryCardProps) => {
  return (
    <div className="relative w-full h-[200px] rounded-lg overflow-hidden group cursor-pointer shadow-md transition-all duration-500 ease-in-out hover:scale-[1.05] hover:shadow-xl hover:-translate-y-1">
      <Image
        src={imageUrl}
        alt={title}
        fill
        className="object-cover pointer-events-none"
      />

      <div className="absolute inset-0 bg-black/30" />
      <div className="absolute bottom-4 left-4 text-white">
        <h3 className="text-lg font-semibold drop-shadow-md">{title}</h3>
      </div>
      <div className="absolute bottom-4 right-4 text-gray-800 text-xs font-bold px-3 py-1 rounded-full">
      </div>
    </div>
  );
};

export default CategoryCard;
