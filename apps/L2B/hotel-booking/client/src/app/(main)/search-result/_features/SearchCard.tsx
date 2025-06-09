'use client';

import Image from 'next/image';
import { Star } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';

interface SearchCardProps {
  hotel: {
    _id: string | null | undefined;
    name: string | null | undefined;
    rating?: number | null | undefined;
    starRating?: number | null | undefined;
    imageUrl?: string | string[] | null | undefined;
  };
}

const SearchCard = ({ hotel }: SearchCardProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const from = searchParams.get('from');
  const to = searchParams.get('to');
  const adults = searchParams.get('adults');
  const children = searchParams.get('children');

  const handleCardClick = () => {
    const query = new URLSearchParams({
      from: from || '',
      to: to || '',
      adults: adults || '',
      children: children || '',
    }).toString();

    router.push(`/hotel-detail/${hotel._id}?${query}`);
  };

  const stars = Array(5).fill(0);
  const imageSrc = Array.isArray(hotel.imageUrl) ? hotel.imageUrl[0] : hotel.imageUrl || '/placeholder-image.jpg';

  return (
    <div className="flex border h-[220px] hover:cursor-pointer rounded-md" onClick={handleCardClick} data-testid="searchcard-component">
      <Image src={imageSrc} width={345} height={180} className="bg-gray-200" alt={'searchres'} />
      <div className="w-[477px] h-[222px] p-5 flex">
        <div className="h-[100%] flex flex-col justify-between">
          <div className="flex flex-col gap-2">
            <h1 className="text-base font-bold leading-7">{hotel.name}</h1>
            <div className="flex">
              {stars.map((_, index) => (
                <Star key={index} fill={index < (hotel.starRating || 0) ? 'orange' : 'transparent'} color="orange" size={16} />
              ))}
            </div>
          </div>
          <div className="flex pt-4 gap-2">
            {hotel.rating && (
              <>
                <p data-testid="hotel-rating" className="bg-[#2563EB] rounded-full w-[39px] h-[20px] font-md text-sm flex items-center justify-center text-white px-[10px] py-[2px]">
                  {hotel.rating}
                </p>
                <p data-testid="hotel-rating-label" className="text-sm font-medium">
                  Excellent
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchCard;
