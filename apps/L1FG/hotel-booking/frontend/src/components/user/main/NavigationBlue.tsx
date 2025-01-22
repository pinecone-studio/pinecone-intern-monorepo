import Image from 'next/image';
import Link from 'next/link';

export const NavigationBlue = () => {
  return (
    <div className="bg-[#013B94] h-[64px]">
      <div className="container mx-auto h-full flex items-center justify-between">
        <Link href={'/'}>
          <Image src="/LogoBlue.png" alt="Logo" width={86} height={20} />
        </Link>
        <div className="flex gap-4">
          <div className="py-2 px-4">
            <p className="font-normal font-Inter text-sm text-[#FAFAFA]">Register</p>
          </div>
          <div className="py-2 px-4">
            <p className="font-normal font-Inter text-sm text-[#FAFAFA]">Sign in</p>
          </div>
        </div>
      </div>
    </div>
  );
};
