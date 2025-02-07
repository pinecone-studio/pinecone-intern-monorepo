import { BlackLogoIcon } from '@/components/user/ui/svg';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';

const CreateAccountOtp = () => {
  return (
    <main className="container mx-auto h-screen">
      <div className="w-full h-full pt-[140px] pb-8 flex flex-col items-center justify-between">
        <div className="w-[350px] flex flex-col gap-6">
          <div className="flex items-center justify-center gap-[8.33px]">
            <div className="w-5 h-5 rounded-full bg-[#2563EB]"></div>
            <BlackLogoIcon />
          </div>
          <div className="py-2 flex flex-col items-center gap-1 ">
            <p className="font-Inter font-semibold text-2xl not-italic tracking-[-0.6px]">Confirm email</p>
            <p className="font-Inter font-normal text-sm text-[#71717A] text-center">To continue, enter the secure code we sent to n.shagai@nest.mn. Check junk mail if it’s not in your inbox.</p>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-center">
              <InputOTP maxLength={4}>
                <InputOTPGroup>
                  <InputOTPSlot index={0} className="rounded-l-md" />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} className="rounded-r-md" />
                </InputOTPGroup>
              </InputOTP>
            </div>
            <div className="flex items-center justify-center">
              <p className="py-2 px-8 font-Inter font-medium text-sm not-italic">Send again (15)</p>
            </div>
          </div>
        </div>
        <p className="font-Inter font-normal text-sm not-italic">©2024 Pedia is an Pedia Group company.</p>
      </div>
    </main>
  );
};

export default CreateAccountOtp;
