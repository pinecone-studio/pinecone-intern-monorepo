import { Heart } from 'lucide-react';

export const HeartSVG = ({ isOpen }: { isOpen?: boolean }) => {
  return (
    <div>
      <Heart className={`${isOpen ? 'fill-black' : 'fill-none'}`} width={28} height={28} />
    </div>
  );
};
