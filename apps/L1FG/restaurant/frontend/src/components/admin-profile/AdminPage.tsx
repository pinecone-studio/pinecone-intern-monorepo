'use client';

import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const AdminPage = () => {
  return (
    <div className="w-[600px] h-[812px] flex flex-col items-center justify-center">
      <div className="pb-6 ">
        <Image className="h-[104px]" height={104} width={108} src="/Logo.png" alt="" />
      </div>
      <div>
        <div className="flex flex-col items-center pb-6">
          <p>Нэвтрэх нэр</p>
        </div>
        <div className="gap-2 flex flex-col items-center">
          <Input type="email" placeholder="Имэйл хаяг" />
          <Input type="" placeholder="Нууц үг" />
          <Link href={'/admin-login/adminAuth'}>
            <Button>Нэвтрэх</Button>
          </Link>
          <p className="flex justify-center ">Нууц үгээ мартсан?</p>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
