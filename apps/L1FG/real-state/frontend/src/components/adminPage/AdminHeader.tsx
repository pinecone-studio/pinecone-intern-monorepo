import { HomeLogo } from '../layout/icons/HomeLogo';
import Link from 'next/link';

const AdminHeader = () => {
  return (
    <div>
      <div className="h-16 border-b border-[#E4E4E7] w-screen bg-white px-8 flex items-center justify-center  ">
        <div className="max-w-[1280px] w-screen h-10 flex items-center  text-sm font-medium">
          <Link href={'/'}>
            <HomeLogo />
          </Link>
        </div>
        <div>
          <p className="font-medium text-[14px] leading-6 text-[#09090B] ">Admin</p>
        </div>
      </div>
    </div>
  );
};
export default AdminHeader;
