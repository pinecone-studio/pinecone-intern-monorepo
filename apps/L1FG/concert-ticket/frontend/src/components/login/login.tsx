'use client';
import Link from 'next/link';
import { ChangeEvent, useState } from 'react';
import { useAuth } from '../providers/AuthProvider';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signin } = useAuth();

  const login = async (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    await signin({
      password,
      email,
    });
  };
  return (
    <form className="flex h-screen justify-center items-center" data-testid="login-form-onSubmit-button" onSubmit={login}>
      <div className="flex flex-col items-center gap-6 px-12 py-8  bg-[#09090B] border border-[#27272A] rounded-xl">
        <p className="text-white   text-[24px] font-thin">Нэвтэрх</p>
        <div className="flex flex-col items-center gap-6">
          <div className="flex flex-col">
            <label className="text-[#FAFAFA] font-thin text-base">Имэйл хаяг:</label>
            <input
              data-testid="login-email-input"
              required
              onChange={(event) => setEmail(event.target.value)}
              className="bg-black text-[13px] texted-[#A1A1AA] pl-[10px] border-[#27272A] text-white w-[350px] h-[36px] my-[10px] border rounded-sm "
              type="texted"
              placeholder="name@example.com"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-[#FAFAFA] font-thin text-base">Нууц үг:</label>
            <input
              data-testid="login-password-input"
              required
              onChange={(event) => setPassword(event.target.value)}
              className="bg-black text-[13px] w-[350px] text-[white] pl-[10px] h-[36px] border-[#27272A] my-[10px] border rounded-sm"
              type="texted"
              placeholder="Нууц үг"
            />
          </div>
          <button data-testid="login-button" type="submit" className="w-[350px] text-base h-[36px] bg-[#00B7F4] rounded-lg font-thin">
            Нэвтрэх
          </button>
        </div>
        <div className="text-muted-foreground font-thin text-[14px] mx-auto w-[350px] flex-col text-center ">
          Та бүртгэлтэй хаяггүй бол {}
          <Link href={'/sign-up'}>
            <button className="bg-transparent underline"> бүртгүүлэх </button>
          </Link>
          <p>{}</p>хэсгээр орно уу.
        </div>
      </div>
    </form>
  );
};
export default Login;
