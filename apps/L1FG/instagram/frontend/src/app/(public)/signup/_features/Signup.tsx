'use client';
import { InstaLogo } from '@/components/svg/InstaLogo';
import { ChangeEvent, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/components/providers/AuthProvider';
import { RegistrationInput } from '@/components/(public)/RegistrationInput';
const SignUpForm = () => {
  const { signup } = useAuth();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [fullName, setFullname] = useState<string>('');
  const [userName, setUsername] = useState<string>('');
  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    await signup({
      email,
      password,
      fullName,
      userName,
    });
  };
  return (
    <form className="w-full flex justify-center min-h-screen bg-[#f4f4f5]" data-cy="signup-form" data-testid="signup-form" onSubmit={handleSubmit}>
      <div className="w-1200px flex flex-col gap-3 justify-center">
        <div className="w-[364px] h-[625px] rounded-[10px] flex flex-col items-center justify-center  gap-5 text-sm bg-white">
          <div className="flex flex-col justify-center items-center gap-3">
            <InstaLogo />
            <p className="w-[245px] h-[40px] text-center  text-sm ">Sign up to see photos and videos from your friends</p>
          </div>
          <RegistrationInput
            type="email"
            placeholder="Email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            dataCy="signup-email-input"
            dataTestId="signup-email-input"
            required
          />
          <RegistrationInput
            type="password"
            placeholder="Password"
            required
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            dataCy="signup-password-input"
            dataTestId="signup-password-input"
          />

          <RegistrationInput
            type="test"
            placeholder="Full Name"
            required
            onChange={(e) => {
              setFullname(e.target.value);
            }}
            dataCy="signup-fullName-input"
            dataTestId="signup-fullName-input"
          />

          <RegistrationInput
            type="text"
            placeholder="Username"
            required
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            dataCy="signup-userName-input"
            dataTestId="signup-userName-input"
          />
          <div className="w-[300px] h-[60px ] text-center   text-[#71717A]">
            People who use our service may have uploaded your contact information to Instagram. <span className="text-[#2563EB]  ">Learn More</span>
          </div>
          <div className=" text-center text-sm text-[#71717A] w-[316px] h-[40px]">
            By signing up, you agree to our <span className="text-[#2563EB] ">Terms</span> ,<span className="text-[#2563EB]  ">Privacy Policy</span> and
            <span className="text-[#2563EB]  "> Cookies Policy</span>.
          </div>
          <button className="w-[316px] h-[40px] bg-[#2563EB80] text-white rounded-[6px] flex justify-center items-center" data-cy="sign-up-button" data-testid="sign-up-button">
            Sign up
          </button>
        </div>
        <div className="w-[364px] h-[72px] flex justify-center items-center gap-4 rounded-[10px] bg-white">
          <span className="">Have an account?</span>

          <Link className="text-[#2563EB] " href={'/login'}>
            Log In
          </Link>
        </div>
      </div>
    </form>
  );
};
export default SignUpForm;
