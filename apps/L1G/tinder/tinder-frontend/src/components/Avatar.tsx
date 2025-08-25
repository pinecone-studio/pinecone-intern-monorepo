'use client';
import Image from 'next/image';

interface User {
  id: number;
  name: string;
  age: number;
  job: string;
  avatar: string[];
}

interface AvatarProps {
  user: User;
  size?: number;
}

const Avatar = ({ user, size = 48 }: AvatarProps) => {
  const hasImage = user.avatar.length > 0;

  const defaultAvatar = '/profile.jpg';

  const src = hasImage ? user.avatar[0] : defaultAvatar;

  return (
    <div className="relative">

      <Image src={src} alt={user.name || 'Avatar'} width={size} height={size} className="object-cover rounded-full" />
    </div>
  );
};

export default Avatar;
