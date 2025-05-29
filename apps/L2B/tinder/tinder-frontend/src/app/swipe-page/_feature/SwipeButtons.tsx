'use client';

import { Check, X } from 'lucide-react';

type Props = {
  onLike: () => void;
  onDislike: () => void;
};

const SwipeButtons = ({ onLike, onDislike }: Props) => {
  return (
    <div className="flex mt-6 gap-10 items-center justify-center">
      <button
        onClick={onDislike}
        className="w-[50px] h-[50px] border-2 border-red-500 bg-white hover:bg-red-100 rounded-full flex justify-center items-center cursor-pointer shadow-lg transition-all"
        aria-label="Dislike"
      >
        <X color="#E11D48" size={28} />
      </button>

      <button
        onClick={onLike}
        className="w-[50px] h-[50px] border-2 border-green-500 bg-white hover:bg-green-100 rounded-full flex justify-center items-center cursor-pointer shadow-lg transition-all"
        aria-label="Like"
      >
        <Check color="#44cd0a" size={28} />
      </button>
    </div>
  );
};

export default SwipeButtons;
