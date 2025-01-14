import { InstaLogo } from '../svg/InstaLogo';

export const LogInPage = () => {
  return (
    <div>
      <div className="w-full flex justify-center min-h-screen bg-[#f4f4f5]">
        <div className="w-1200px flex flex-col gap-3 justify-center">
          <div className="w-[364px] h-[388px] rounded-[10px] flex flex-col items-center justify-center  gap-5 text-sm bg-white">
            <div className="flex flex-col justify-center items-center gap-3">
              <InstaLogo />
            </div>

            <input type="text" placeholder="Email" className="w-[300px] h-[36px] border border-[#E4E4E7] rounded-[6px] px-2" />
            <input type="text" placeholder="Password" className="w-[300px] h-[36px] border border-[#E4E4E7] rounded-[6px] px-2" />
            <div className="text-[#2563EB]">Forgot password?</div>
            <button className="w-[316px] h-[40px] bg-[#2563EB80] text-white rounded-[6px]">Log In</button>
          </div>
          <div className="w-[364px] h-[72px] flex justify-center items-center gap-4 rounded-[10px] bg-white">
            <span>Don&apos;t have an account?</span>
            <span className="text-[#2563EB] ">Sign Up</span>
          </div>
        </div>
      </div>
    </div>
  );
};
