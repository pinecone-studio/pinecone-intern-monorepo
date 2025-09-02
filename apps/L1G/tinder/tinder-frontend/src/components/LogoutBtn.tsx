import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import React from 'react';

export const LogoutBtn = () => {
  const router = useRouter();

  const handleLogout = () => {
    try {
      localStorage.removeItem('token');
      router.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Button onClick={handleLogout} className="rounded-md w-fit py-2 px-4 bg-[#E11D48E5] bg-opacity-90 font-sans hover:bg-[#E11D48E5] ">
      Log out
    </Button>
  );
};
