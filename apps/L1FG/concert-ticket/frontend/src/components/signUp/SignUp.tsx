'use client';
import Link from 'next/link';
import { ChangeEvent, useState } from 'react';
import { useAuth } from '../providers/AuthProvider';
import { toast } from 'react-toastify';

export const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  if (repeatPassword !== password) {
    toast.info('Нууц үгийг давтан хийнэ үү');
  }

  const { signup } = useAuth();

  const createUser = async (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    await signup({
      email,
      password,
    });
  };

  return (
    <form data-testid="signup-form-onSubmit-button" className="flex items-center justify-center h-screen bg-black" onSubmit={createUser}>
      <div className=" bg-[#09090B] border border-[#27272A] rounded-2xl flex flex-col gap-6 py-8 px-12">
        <p className="text-white text-center text-[24px] font-light ">Бүртгүүлэх</p>
        <div className="flex flex-col gap-6 items-center">
          <div className="space-y-4">
            <div>
              <p className="text-[#FAFAFA]  font-thin">Имэйл хаяг:</p>
              <input
                data-testid="signup-email-input"
                required
                onChange={(event) => setEmail(event.target.value)}
                className="w-[350px] h-[36px] bg-black text-white text-[13px] placeholder-[#A1A1AA] pl-3 border border-[#27272A] rounded-sm"
                type="email"
                placeholder="name@example.com"
              />
            </div>

            <div className="flex flex-col gap-1">
              <p className="text-[#FAFAFA] font-thin">Нууц үг үүсгэх:</p>
              <input
                data-testid="signup-password-input"
                required
                onChange={(event) => setPassword(event.target.value)}
                className="w-[350px] h-[36px] bg-black text-white text-[13px] pl-3 font-thin border border-[#27272A] rounded-sm mb-2"
                type="password"
                placeholder="Нууц үг"
              />
              <input
                data-testid="signup-repeatpassword-input"
                onChange={(event) => setRepeatPassword(event.target.value)}
                className="w-[350px] h-[36px] bg-black text-white text-[13px] pl-3 border border-[#27272A] rounded-sm font-thin"
                type="password"
                placeholder="Нууц үг дахин оруулна уу"
              />
            </div>
          </div>
          <button data-testid="signup-button" disabled={repeatPassword !== password} className="w-full h-[36px]  bg-[#00B7F4] text-black text-sm font-light rounded-sm">
            Бүртгүүлэх
          </button>
        </div>
        <div className="text-muted-foreground text-[14px] text-center mt-4 font-extralight">
          Та бүртгэлтэй хаягтай бол
          <Link href={'/signin'}>
            <button className="bg-transparent underline px-[4px] ">нэвтрэх</button>
          </Link>
          хэсгээр орно уу.
        </div>
      </div>
    </form>
  );
};
