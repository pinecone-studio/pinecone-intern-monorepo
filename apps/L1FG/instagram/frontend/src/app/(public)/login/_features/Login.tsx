'use client';
import { ChangeEvent, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/components/providers/AuthProvider';
import { InstaLogo } from '@/components/svg/InstaLogo';
import { RegistrationInput } from '@/components/(public)/RegistrationInput';
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

            <RegistrationInput
              type="email"
              placeholder="Email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              dataCy="login-email-input"
              dataTestId="login-email-input"
              required
            />
            <RegistrationInput
              type="password"
              placeholder="Password"
              required
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              dataCy="login-password-input"
              dataTestId="login-password-input"
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

            <Link className="text-[#2563EB] " href={'/signup'}>
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </form>
  );
};
export default LogInForm;
