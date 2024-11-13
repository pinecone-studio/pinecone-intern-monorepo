'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export const Profile = () => {
  return (
    <Avatar className="w-6 h-6">
      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
};
