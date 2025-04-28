'use client';

import Image from 'next/image';

type ListingCardProps = {
  imageUrl: string;
  price: string;
  title: string;
  beds: number;
  baths: number;
  area: number;
  location: string;
  imageCount?: string;
};

const ListingCard = ({
  imageUrl,
  price,
  title,
  beds,
  baths,
  area,
  location,
  imageCount,
}: ListingCardProps) => {
  return (
    <div className="w-full max-w-sm bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
      <div className="relative w-full h-48">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 400px"
        />
        <div className="absolute top-2 right-2 bg-white text-xs px-2 py-1 rounded shadow">
          {imageCount}
        </div>
      </div>

      <div className="p-4 space-y-2">
        <p className="text-lg font-semibold text-gray-900">{price}</p>

        <div className="flex gap-2 items-start">
          <Image
            src="/Vector.png"
            alt="icon"
            width={10}
            height={13}
            className="mt-[3px]"
          />
          <p className="text-sm text-gray-600">{title}</p>
        </div>

        <div className="flex items-center text-sm text-gray-600 gap-4">
          <div className="flex items-center gap-1">
            <Image src="/pic1.png" alt="area" width={16} height={16} />
            <span>{area} м²</span>
          </div>
          <div className="flex items-center gap-1">
            <Image src="/pic2.png" alt="beds" width={16} height={16} />
            <span>{beds} өрөө</span>
          </div>
          <div className="flex items-center gap-1">
            <Image src="/pic3.png" alt="baths" width={16} height={16} />
            <span>{baths} а.ц.ө</span>
          </div>
        </div>

        <p className="text-xs text-gray-400 line-clamp-2">{location}</p>
      </div>
    </div>
  );
};

export default ListingCard;

