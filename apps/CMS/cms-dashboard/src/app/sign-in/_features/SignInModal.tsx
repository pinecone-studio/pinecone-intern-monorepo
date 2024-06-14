'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import ArrowIcon from '@/assets/icons/ArrowIcon';
import { useRouter } from 'next/navigation';
const SignInModal = () => {
  const router = useRouter();

  return (
    <div className="w-[440px] h-[484px] border border-[1px solid #ECEDF0] rounded-[16px] p-[40px]">
      <div className="flex flex-col items-center gap-[24px]">
        <h1 className="text-[36px] font-semibold">Нэвтрэх</h1>
        <div className="flex flex-col items-center gap-[16px]">
          <div className="flex flex-col gap-2">
            <p className="font-semibold">Таны имэйл эсвэл утасны дугаар</p>
            <Input data-testid="email-input" name="email" type="email" className="w-[360px] h-[56px] text-[18px] font-normal bg-[#F7F7F8]" placeholder="Имэйл эсвэл утасны дугаар" />
          </div>
          <div className="flex flex-col gap-2">
            <p className="font-semibold">Нууц үг</p>
            <Input data-testid="password-input" name="password" type="password" className="w-[360px] h-[56px] text-[18px] font-normal bg-[#F7F7F8]" placeholder="Нууц үгээ оруулна уу" />
          </div>
        </div>
        <div>
          <Button onClick={() => router.push('/')} className="w-[360px] h-[56px] bg-[#121316] rounded-[8px] relative">
            <p className="text-[16px] font-medium">Дараах</p>
            <ArrowIcon />
          </Button>
        </div>
      </div>
    </div>
  );
};
export default SignInModal;
