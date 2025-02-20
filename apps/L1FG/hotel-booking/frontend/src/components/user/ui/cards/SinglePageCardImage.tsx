import { Room } from '@/generated';
import Image from 'next/image';

interface SinglePageCardImageProps {
  rooms?: Room | null;
}

export const SinglePageCardImage = ({ rooms }: SinglePageCardImageProps) => {
  return (
    <div className="relative w-full h-[216px]">
      <Image
        src={rooms?.images[0] || 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2c/b0/b9/d0/cheap-hotels.jpg?w=1200&h=-1&s=1'}
        alt={rooms?.name || 'Hotel room'}
        className="rounded-t-[6px] w-full h-full object-cover"
        layout="fill"
      />
    </div>
  );
};
