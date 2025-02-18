'use client';
import { HeartIcon } from 'lucide-react';

type Props = {
  handleClickLike: () => void;
  liked: boolean;
};

export const PostLike = ({ handleClickLike, liked }: Props) => {
  return <HeartIcon onClick={handleClickLike} data-testid="like-icon" className={`${liked && 'fill-red-500 text-red-500 border-none cursor-pointer'} cursor-pointer fill-none`} />;
};
