'use client';
import Image from 'next/image';
import type { ChatUser } from 'types/chat';

interface AvatarProps {
  user: ChatUser;
  width?: number;
  height?: number;
  className?: string;
}

const Avatar = ({ user, width, height, className }: AvatarProps) => {
  const hasImage = user.images?.length > 0;
  const defaultAvatar = '/profile.jpg';
  const src = hasImage ? user.images[0] : defaultAvatar;

  return (
    <div className={`overflow-hidden ${className}`} style={{ width: width, height: height }}>
      <Image src={src} alt={user.name || 'Avatar'} width={width} height={height} className="object-cover w-full h-full" />
    </div>
  );
};

export default Avatar;
