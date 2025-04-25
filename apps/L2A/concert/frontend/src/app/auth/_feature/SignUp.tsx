'use client';
import { AddUserDocument } from '@/generated';
import { useMutation } from '@apollo/client';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export const SignUp = () => {
  const [addUser, { loading, error }] = useMutation(AddUserDocument);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userRegistered, setUserRegistered] = useState(false);

  const handleSignup = async () => {
    try {
      const response = await addUser({ variables: { email, password } });
      if (response.data.addUser) {
        setUserRegistered(true);
      }
      console.log('User signed up:', response.data);
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setUserRegistered(false);
      return () => clearTimeout(timeout);
    }, 5000);
  }, [userRegistered]);

  return (
    <div data-cy="signup-form" className="bg-black flex justify-center items-center min-h-screen h-[100vh] w-[100%] ">
      <div className="w-[446px] h-[494px] border-[1px] border-[#27272A] rounded-2xl">
        <h1 data-testid="signup-title" className="text-2xl font-medium flex justify-center text-white mt-[40px]">
          Бүртгүүлэх
        </h1>
        <div className="w-[350px] h-[220px] ml-[48px]">
          <div className="text-white mt-[24px] mb-1">
            <label htmlFor="signup-email" className="flex">
              Имэйл хаяг:
            </label>
            <input
              id="signup-email"
              data-testid="email-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              className="rounded-md bg-black border w-[350px] h-[36px] mt-1 pl-2 border-[#27272A]"
            />
          </div>

          <div className="text-white mt-[25px]">
            <label htmlFor="signup-password">Нууц үг үүсгэх:</label>
            <input
              id="signup-password"
              data-testid="password-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="rounded-md bg-black border w-[350px] h-[36px] mt-2 pl-2 border-[#27272A]"
            />
            <input
              data-testid="confirm-password-input"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="rounded-md bg-black border w-[350px] h-[36px] mt-2 pl-2 border-[#27272A]"
            />
          </div>

          {userRegistered && (
            <div data-testid="success-msg" className="text-green-500 mt-2">
              Бүртгэл амжилттай!
            </div>
          )}
          {error && (
            <div data-testid="error-msg" className="text-red-500 mt-2">
              {error.message}
            </div>
          )}

          <button
            data-testid="submit-button"
            disabled={loading}
            onClick={handleSignup}
            className="bg-[#00B7F4] w-[350px] h-[36px] rounded-md text-black flex justify-center items-center mt-[24px] text-sm"
          >
            {loading ? 'Бүртгэж байна...' : 'Бүртгүүлэх'}
          </button>

          <div className="text-[#A1A1AA] text-center text-sm p-6">
            Та бүртгэлтэй хаягтай бол{' '}
            <Link href={`/auth/signin`} className="cursor-pointer underline">
              нэвтрэх
            </Link>{' '}
            хэсгээр орно уу!
          </div>
        </div>
      </div>
    </div>
  );
};
