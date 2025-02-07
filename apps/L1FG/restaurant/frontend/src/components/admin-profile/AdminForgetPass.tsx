'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const AdminForgetPass = () => {
  return (
    <div className="w-[600px] h-[812px] flex flex-col items-center justify-center">
      <div>
        <div className="flex flex-col items-center pb-6">
          <p>Нууц үг сэргээх</p>
        </div>
        <div className="gap-2 flex flex-col w-[337px]">
          <Input type="email" placeholder="Имэйл хаяг" />
          <Button>Үргэлжлүүлэх</Button>
        </div>
      </div>
    </div>
  );
};

export default AdminForgetPass;
