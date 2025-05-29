'use client';

import Image from 'next/image';

type CategoryCardProps = {
  title: string;
  count: number;
  imageUrl: string;
};

const CategoryCard = ({ title, count, imageUrl }: CategoryCardProps) => {
  return (
    <div className="relative w-full h-[200px] rounded-lg overflow-hidden group cursor-pointer">
      <Image
        src={imageUrl}
        alt={title}
        fill
        className="object-cover group-hover:scale-105 transition-transform duration-300"
      />
      <div className="absolute inset-0 bg-black/30"></div>

      <div className="absolute bottom-4 left-4 text-white">
        <h3 className="text-lg font-semibold drop-shadow-md">{title}</h3>
      </div>

      <div className="absolute bottom-4 right-4 bg-white text-gray-800 text-xs font-bold px-3 py-1 rounded-full">
        {count.toLocaleString()}
      </div>
    </div>
  );
};

export default CategoryCard;


