import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { BlackLogoIcon } from '@/components/user/ui/svg';

const ForgetPassword = () => {
  return (
    <main className="container mx-auto h-screen">
      <div className="w-full h-full pt-[140px] pb-8 flex flex-col items-center justify-between">
        <div className="w-[350px] flex flex-col gap-6">
          <div className="flex items-center justify-center gap-[8.33px]">
            <div className="w-5 h-5 rounded-full bg-[#2563EB]"></div>
            <BlackLogoIcon />
          </div>
          <div className="py-2 flex flex-col items-center gap-1 ">
            <p className="font-Inter font-semibold text-2xl not-italic tracking-[-0.6px]">Forget password</p>
            <p className="font-Inter font-normal text-sm text-[#71717A]">Enter your email account to reset password</p>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-2">
                <p className="font-Inter font-normal text-sm leading-[14px] not-italic">Email</p>
                <Input type="email" placeholder="name@example.com" />
              </div>
              <Button className="w-full bg-[#2563EB] hover:bg-[#2563D2]">
                <p className="font-Inter font-medium text-sm not-italic text-white">Continue</p>
              </Button>
            </div>
          </div>
        </div>
        <p className="font-Inter font-normal text-sm not-italic">©2024 Pedia is an Pedia Group company.</p>
      </div>
    </main>
  );
};

export default ForgetPassword;
