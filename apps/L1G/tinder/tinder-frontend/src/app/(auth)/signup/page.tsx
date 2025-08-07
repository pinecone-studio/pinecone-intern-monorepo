import { CreateAccount } from '@/components/CreateAcc';
import { MainHeader } from '@/components/MainHeader';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const Signup = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="w-[350px] h-fit flex flex-col gap-6 items-center">
        <MainHeader />

        <div className="items-center flex flex-col text-center">
          <h1 className="font-semibold text-[24px] font-sans">Create an account</h1>
          <p className="text-[#71717A] text-[14px] font-light">Enter your email below to create your account</p>
        </div>

        <div className="w-full h-fit flex flex-col gap-4">
          <CreateAccount />

          <div className="w-full flex justify-between items-center gap-[10px] py-4">
            <Separator className="w-[156px]" />
            <p className=" font-[400] text-[12px] text-[#71717A]">OR</p>
            <Separator className="w-[156px]" />
          </div>

          <Button className="rounded-full border-[1px] border-[#E4E4E7] bg-white text-[#18181B]  text-[14px] font-[500] shadow-sm">Create an account</Button>
        </div>

        <p className="text-center  text-wrap w-[249px] text-[14px] text-[#71717A] font-[400]">
          By clicking continue, you agree to our <span className="underline">Terms of Service</span> and <span className="underline">Privacy Policy</span>.
        </p>
      </div>
    </div>
  );
};
export default Signup;
