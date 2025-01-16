'use client';

import { InstaLogo } from '../svg/InstaLogo';

export const SignUpPage = () => {
  return (
    <div className="w-full flex justify-center min-h-screen bg-[#f4f4f5]">
      <div className="w-1200px flex flex-col gap-3 justify-center">
        <div className="w-[364px] h-[625px] rounded-[10px] flex flex-col items-center justify-center  gap-5 text-sm bg-white">
          <div className="flex flex-col justify-center items-center gap-3">
            <InstaLogo />
            <p className="w-[245px] h-[40px] text-center  text-sm ">Sign up to see photos and videos from your friends</p>
          </div>
          <input type="text" placeholder="Email" className="w-[300px] h-[36px] border border-[#E4E4E7] rounded-[6px] px-2" />
          <input type="text" placeholder="Password" className="w-[300px] h-[36px] border border-[#E4E4E7] rounded-[6px] px-2" />
          <input type="text" placeholder="Full Name" className="w-[300px] h-[36px] border border-[#E4E4E7] rounded-[6px] px-2" />
          <input type="text" placeholder="Username" className="w-[300px] h-[36px] border border-[#E4E4E7] rounded-[6px] px-2" />
          <div className="w-[300px] h-[60px ] text-center   text-[#71717A]">
            People who use our service may have uploaded your contact information to Instagram. <span className="text-[#2563EB]  ">Learn More</span>
          </div>
          <div className=" text-center text-sm text-[#71717A] w-[316px] h-[40px]">
            By signing up, you agree to our <span className="text-[#2563EB] ">Terms</span> ,<span className="text-[#2563EB]  ">Privacy Policy</span> and
            <span className="text-[#2563EB]  "> Cookies Policy</span>.
          </div>
          <button className="w-[316px] h-[40px] bg-[#2563EB80] text-white rounded-[6px]">Sign Up</button>
        </div>
        <div className="w-[364px] h-[72px] flex justify-center items-center gap-4 rounded-[10px] bg-white">
          <span className="">Have an account?</span>
          <span className="text-[#2563EB] ">Log In</span>
        </div>
      </div>
    </div>
  );
};
