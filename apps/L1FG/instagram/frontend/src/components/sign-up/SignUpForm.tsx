'use client';
import { InstaLogo } from '@/components/svg/InstaLogo';
import { ChangeEvent, useState } from 'react';
import { useAuth } from '../providers/AuthProvider';
import Link from 'next/link';
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
          <input
            type="email"
            placeholder="Email"
            className="w-[300px] h-[36px] border border-[#E4E4E7] rounded-[6px] px-2"
            name="email"
            required
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            data-cy="signup-email-input"
            data-testid="signup-email-input"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-[300px] h-[36px] border border-[#E4E4E7] rounded-[6px] px-2"
            name="password"
            required
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            data-cy="signup-password-input"
            data-testid="signup-password-input"
          />
          <input
            type="text"
            placeholder="Full Name"
            className="w-[300px] h-[36px] border border-[#E4E4E7] rounded-[6px] px-2"
            name="fullName"
            required
            onChange={(e) => {
              setFullname(e.target.value);
            }}
            data-cy="signup-fullName-input"
            data-testid="signup-fullName-input"
          />
          <input
            type="text"
            placeholder="Username"
            className="w-[300px] h-[36px] border border-[#E4E4E7] rounded-[6px] px-2"
            name="userName"
            required
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            data-cy="signup-userName-input"
            data-testid="signup-userName-input"
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

          <Link className="text-[#2563EB] " href={'/log-in'}>
            Log In
          </Link>
        </div>
      </div>
    </form>
  );
};
export default SignUpForm;
