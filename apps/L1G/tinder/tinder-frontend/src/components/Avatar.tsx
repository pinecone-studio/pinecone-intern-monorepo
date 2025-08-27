'use client';
import Image from 'next/image';
import { ChatUser } from './ChatPage';

interface AvatarProps {
  user: ChatUser;
  size?: number;
}

const Avatar = ({ user, size = 48 }: AvatarProps) => {
  const hasImage = user.images.length > 0;
  const defaultAvatar = '/profile.jpg';
  const src = hasImage ? user.images[0] : defaultAvatar;

  return (
    <div className="overflow-hidden rounded-full" style={{ width: size, height: size }}>
      <Image src={src} alt={user.name || 'Avatar'} width={size} height={size} className="object-cover w-full h-full" />
    </div>
  );
};

export default Avatar;
