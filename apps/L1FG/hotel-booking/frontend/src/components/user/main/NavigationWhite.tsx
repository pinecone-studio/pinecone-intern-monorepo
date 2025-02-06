import Image from 'next/image';
import Link from 'next/link';

export const NavigationWhite = () => {
  return (
    <div className="bg-[#FFFFFF] h-[64px]">
      <div className="container mx-auto h-full flex items-center justify-between">
        <Link href={'/'}>
          <Image src="/LogoWhite.png" alt="Logo" width={86} height={20} />
        </Link>
        <div className="flex gap-4">
          <div className="py-2 px-4">
            <p className="font-normal font-Inter text-sm text-[#09090B]">Register</p>
          </div>
          <div className="py-2 px-4">
            <p className="font-normal font-Inter text-sm text-[#09090B]">Sign in</p>
          </div>
        </div>
      </div>
    </div>
  );
};
