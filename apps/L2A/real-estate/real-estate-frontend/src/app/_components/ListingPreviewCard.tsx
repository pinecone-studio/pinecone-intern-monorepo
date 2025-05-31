'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import {
  BedDouble,
  Bath,
  Building2,
  Scan,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

type ListingPreviewCardProps = {
  images?: string[];
  title: string;
  price: string;
  area: number | string;
  beds: number | string;
  baths: number | string;
  location: string;
};

const ListingPreviewCard = ({
  images = ['/listingcard.png'],
  title,
  price,
  area,
  beds,
  baths,
  location,
}: ListingPreviewCardProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <Card className="w-full rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition group">
      <div className="relative w-full aspect-[4/3]">
        <Image
          src={images[currentIndex]}
          alt={title}
          fill
          className="object-cover"
          data-testid="preview-image"
        />
        <div
          className="absolute top-2 right-2 bg-white rounded-full text-xs px-2 py-1 shadow"
          data-testid="image-counter"
        >
          {images.length > 1 ? `${currentIndex + 1}/${images.length}` : '1/1'}
        </div>

        {images.length > 1 && (
          <>
            <button
              aria-label="previous image"
              onClick={handlePrev}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full w-7 h-7 flex items-center justify-center shadow opacity-0 group-hover:opacity-100 transition"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              aria-label="next image"
              onClick={handleNext}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full w-7 h-7 flex items-center justify-center shadow opacity-0 group-hover:opacity-100 transition"
            >
              <ChevronRight size={16} />
            </button>
          </>
        )}
      </div>

      <CardContent className="p-4 space-y-1">
        <p className="text-lg font-bold">{price}</p>
        <div className="flex items-center text-sm text-muted-foreground gap-2">
          <Building2 className="w-4 h-4" />
          <span>{title}</span>
        </div>

        <div className="flex items-center text-sm text-muted-foreground gap-6">
          <div className="flex items-center gap-1">
            <Scan className="w-4 h-4" />
            <span>{area} м²</span>
          </div>
          <div className="flex items-center gap-1">
            <BedDouble className="w-4 h-4" />
            <span>{beds} өрөө</span>
          </div>
          <div className="flex items-center gap-1">
            <Bath className="w-4 h-4" />
            <span>{baths} а.ц.ө</span>
          </div>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2">{location}</p>
      </CardContent>
    </Card>
  );
};

export default ListingPreviewCard;
