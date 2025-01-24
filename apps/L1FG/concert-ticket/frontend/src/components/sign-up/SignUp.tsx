'use client';

import Link from 'next/link';

export const SignUp = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="w-[446px] p-6 bg-[#09090B] border-2 border-[#27272A] rounded-md">
        <p className="text-white text-center text-[24px] font-semibold mb-6" data-testid="burtguuleh-title">
          Бүртгүүлэх
        </p>

        <div className="space-y-4">
          <div>
            <p className="text-[#FAFAFA] mb-2">Имэйл хаяг:</p>
            <input className="w-full h-[36px] bg-black text-white text-[13px] placeholder-[#A1A1AA] pl-3 border-2 border-[#27272A] rounded-sm" type="email" placeholder="name@example.com" />
          </div>

          <div>
            <p data-testid="password-uusgeh" className="text-[#FAFAFA] mb-2">
              Нууц үг үүсгэх:
            </p>
            <input data-testid="first-password" className="w-full h-[36px] bg-black text-white text-[13px] pl-3 border-2 border-[#27272A] rounded-sm mb-2" type="password" placeholder="Нууц үг" />
            <input
              data-testid="second-password"
              className="w-full h-[36px] bg-black text-white text-[13px] pl-3 border-2 border-[#27272A] rounded-sm"
              type="password"
              placeholder="Нууц үг дахин оруулна уу"
            />
          </div>
        </div>

        <button className="w-full h-[36px] mt-6 bg-[#00B7F4] text-white rounded-sm" data-testid="burtguuleh-click-button">
          Бүртгүүлэх
        </button>

        <div className="text-[#A1A1AA] text-[14px] text-center mt-4">
          Та бүртгэлтэй хаягтай бол
          <Link href={'/login'}>
            <button className="bg-transparent underline px-[4px]">нэвтрэх</button>
          </Link>
          хэсгээр орно уу.
        </div>
      </div>
    </div>
  );
};
