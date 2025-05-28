'use client';
import Link from 'next/link';
import { useAuth } from '../(main)/_context/AuthContext';
import { HeaderAuth } from './HeaderAuth';

interface Props {
  bg: 'white' | 'blue';
}

const Header = ({ bg }: Props) => {
  const { user } = useAuth();

  const isBlue = bg === 'blue';
  const bgColor = isBlue ? 'bg-[#013B94]' : 'bg-white';
  const textColor = isBlue ? 'text-white' : 'text-black';
  const dotColor = isBlue ? 'bg-white' : 'bg-[#013B94]';

  return (
    <div className={`${bgColor} w-screen h-[64px] flex items-center`} data-testid="header">
      <div className="flex w-[1280px] items-center justify-between m-auto">
        <Link href={'/'}>
          <div className="flex gap-2 items-center">
            <div className={`${dotColor} w-5 h-5 rounded-full cursor-pointer`} />
            <p className={`${textColor} text-[19px] cursor-pointer`}>Pedia</p>
          </div>
        </Link>
        <HeaderAuth user={user} bg={bg} />
      </div>
    </div>
  );
};

export default Header;
