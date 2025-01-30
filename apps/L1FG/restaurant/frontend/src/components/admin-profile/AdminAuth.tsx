'use client';

import Image from 'next/image';
import { OtpPattern } from './OtpPattern';
import { Back } from '../svg/Back';
import { Refresh } from '../svg/Refresh';
import Link from 'next/link';

const AdminAuth = () => {
  return (
    <div className="px-[136.5px] py-[105px]">
      <div className="w-[327px] h-[274px] flex justify-center">
        <div className="flex flex-col items-center">
          <div className="pb-[32px]">
            <Image className="h-[70px]" height={66} width={54} src="/Logo.png" alt="" />
          </div>
          <div className="flex flex-col items-center gap-6 text-center">
            <p>Имэйл хаяг руу илгээсээн 4 оронтой кодыг оруулна уу</p>
            <div className="flex flex-col gap-6">
              <OtpPattern />
              <div className="flex justify-between">
                <Link href={'/admin-login/admin'}>
                  <Back />
                </Link>
                <Refresh />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAuth;
