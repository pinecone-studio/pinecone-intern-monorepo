import { LockIcon } from '../svg/LockIcon';

export const TroubleLoggingIn = () => {
  return (
    <form className="w-full min-h-screen flex justify-center items-center text-sm bg-[#f4f4f5]" data-cy="trouble-logging-in">
      <div className="w-full max-w-md p-6 flex justify-center items-center">
        <div className="w-full max-w-[364px] rounded-[10px] flex flex-col gap-5 items-center bg-white p-6">
          <div className="flex flex-col gap-5 text-center items-center w-full">
            <LockIcon />
            <p className="font-bold text-lg">Trouble logging in?</p>
            <p className="text-[#71717A] text-sm">Enter your email and we&apos;ll send you a link to get back into your account.</p>
          </div>

          <input type="email" placeholder="Email" className="w-full h-[36px] border border-[#E4E4E7] rounded-[6px] px-3" data-cy="trouble-login-email" />
          <button className="bg-[#2563EB80] w-full h-[40px] text-white round">Send Login Link</button>
        </div>
      </div>
    </form>
  );
};
