import { UserType } from '@/utils/type';
import { useAuth } from '../(main)/_context/AuthContext';
import Link from 'next/link';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { LogOut, User } from 'lucide-react';

interface HeaderAuthProps {
  bg: 'white' | 'blue';
  user: UserType | null;
}

export const HeaderAuth = ({ bg, user }: HeaderAuthProps) => {
  const { logout } = useAuth();
  const isBlue = bg === 'blue';
  const linkTextClass = `${isBlue ? 'text-white' : 'text-black'} text-[14px] font-[400]`;
  return user ? (
    <div className="flex gap-8">
      <Link className={linkTextClass} href="/booking-detail">
        My Booking
      </Link>
      <Popover>
        <PopoverTrigger>
          <p data-testid="profile-settings-button" className={linkTextClass}>
            {user.firstName}
          </p>
        </PopoverTrigger>
        <PopoverContent className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <User size={16} />
            <p>My Profile</p>
          </div>
          <div className="flex items-center gap-3 cursor-pointer" onClick={logout}>
            <LogOut size={16} />
            <p data-testid="logout-button">Sign out</p>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  ) : (
    <div className="flex gap-[32px] text-[#fafafa] text-[14px]">
      <Link className={`${linkTextClass}text-[14px] font-[400]`} href="/signup">
        Register
      </Link>
      <Link className={`${linkTextClass}text-[14px] font-[400]`} href="/signin">
        Sign in
      </Link>
    </div>
  );
};
