'use client';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { PineLogo } from './SVG';
import { parseCookies } from 'nookies';
import jwt from 'jsonwebtoken'
type Decode = {
  imageUrl:string
}
export const Header = () => {
  const router = useRouter();
  const pathname = usePathname()
  const cookies = parseCookies()
  const token = cookies.token
  const data =  jwt.decode(token) as Decode
  if (pathname === '/login') {
    return null;
  }
  
  const handlePush = ()=>{
    router.push('/login')
  }
  return (
    <header className="w-full flex items-center justify-between py-1 px-6 bg-main bg-black">
      <div
        onClick={handlePush}
        data-cy="headerIcon"
        className="flex items-center justify-center cursor-pointer"
      >
        <PineLogo />
      </div>
      <div className="flex gap-4">
        <div data-cy="headerProfile" className="flex items-center justify-center rounded-full py-0.5 overflow-hidden cursor-pointer aspect-square">
          <Image style={{ objectFit: 'cover' }} alt="profile image" width={32} height={32} sizes="small" src={`${data?.imageUrl || '/avatar.png'}`} />
        </div>
      </div>
    </header>
  );
};
