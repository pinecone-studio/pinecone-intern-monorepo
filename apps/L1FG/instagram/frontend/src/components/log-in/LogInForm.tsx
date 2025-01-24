'use client';
import { ChangeEvent, useState } from 'react';
import { InstaLogo } from '../svg/InstaLogo';
import { useAuth } from '../providers/AuthProvider';
import Link from 'next/link';
const LogInForm = () => {
  const { signin } = useAuth();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    await signin({
      email,
      password,
    });
  };
  return (
    <form onSubmit={handleSubmit} data-cy="login-form">
      <div className="w-full flex justify-center min-h-screen bg-[#f4f4f5]">
        <div className="w-1200px flex flex-col gap-3 justify-center">
          <div className="w-[364px] h-[388px] rounded-[10px] flex flex-col items-center justify-center  gap-5 text-sm bg-white">
            <div className="flex flex-col justify-center items-center gap-3">
              <InstaLogo />
            </div>

            <input
              type="email"
              placeholder="Email"
              className="w-[300px] h-[36px] border border-[#E4E4E7] rounded-[6px] px-2"
              required
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              data-cy="login-email-input"
              data-testid="login-email-input"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-[300px] h-[36px] border border-[#E4E4E7] rounded-[6px] px-2"
              required
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              data-cy="login-password-input"
              data-testid="login-password-input"
            />
            <div className="text-[#2563EB]">Forgot password?</div>
            <button
              className="w-[316px] h-[40px] bg-[#2563EB80] text-white rounded-[6px]
            flex justify-center items-center"
              data-cy="login-submit-button"
              data-testid="login-submit-button"
            >
              Log in
            </button>
          </div>
          <div className="w-[364px] h-[72px] flex justify-center items-center gap-4 rounded-[10px] bg-white">
            <span>Don&apos;t have an account?</span>

            <Link className="text-[#2563EB] " href={'/sign-up'}>
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </form>
  );
};
export default LogInForm;
