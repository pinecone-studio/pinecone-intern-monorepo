'use client';

import { LoginUserDocument } from '@/generated';
import { useMutation } from '@apollo/client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { LoginSchema } from '../utils/login-schema';
import { SuccessMessage } from '../_components/SuccessMessage';
import { ErrorMessage } from '../_components/ErrorMessage';

export const Login = () => {
  const [LoginUser, { loading, error }] = useMutation(LoginUserDocument);
  const [email, setEmail] = useState('');
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [alert, setAlert] = useState(false);
  const [password, setPassword] = useState('');
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleLogin = async () => {
    const result = LoginSchema.safeParse({ email, password });

    if (!result.success) {
      setValidationError(result.error.errors[0].message);
      return;
    }

    setValidationError(null);

    try {
      const response = await LoginUser({ variables: { email, password } });
      if (response.data.loginUser.JWT) {
        const now = new Date();
        const expiry = now.getTime() + 24 * 60 * 60 * 1000;

        localStorage.setItem('token', response.data.loginUser.JWT);
        localStorage.setItem('tokenExpiry', expiry.toString());

        setUserLoggedIn(true);
      }
    } catch (error) {
      console.error('Error logging in:', error);
    } finally {
      setAlert(true);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    const expiry = localStorage.getItem('tokenExpiry');

    if (token && expiry) {
      const now = new Date().getTime();
      if (now > BigInt(expiry)) {
        localStorage.removeItem('token');
        localStorage.removeItem('tokenExpiry');
        setUserLoggedIn(false);
      } else {
        setUserLoggedIn(true);
      }
    } else {
      localStorage.removeItem('token');
      localStorage.removeItem('tokenExpiry');
      setUserLoggedIn(false);
    }
  }, [userLoggedIn]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAlert(false);
      return () => clearTimeout(timeout);
    }, 5000);
  }, [alert]);

  useEffect(() => {
    const result = LoginSchema.safeParse({ email, password });
    if (result.success) {
      setValidationError(null);
    } else {
      setAlert(true);
      setValidationError(result.error.errors[0].message);
    }
  }, [email, password]);

  return (
    <div data-cy="signin-form" className="bg-black flex justify-center h-[100vh] w-[100%]">
      <div className="w-[446px] h-[450px] border-[1px] border-[#27272A] rounded-2xl mt-[190px]">
        <h1 data-testid="signin-title" className="text-2xl font-rounded flex justify-center text-white mt-[40px]">
          Нэвтрэх
        </h1>
        <div className="w-[350px] h-[220px] ml-[48px]">
          <div className="text-white mt-[24px] mb-1">
            <label htmlFor="email" className="flex">
              Имэйл хаяг:
            </label>
            <input
              id="email"
              data-testid="email-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              className="rounded-md bg-black border w-[350px] h-[36px] mt-1 pl-2"
            />
          </div>
          <div className="text-white mt-[25px]">
            <label htmlFor="password">Нууц үг:</label>
            <input
              id="password"
              type="password"
              data-testid="password-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="rounded-md bg-black border w-[350px] h-[36px] mt-2 pl-2"
            />
          </div>
          <ErrorMessage alert={alert} message={error?.message} />
          <ErrorMessage alert={alert} message={validationError} />
          <SuccessMessage valid={userLoggedIn} />
          <button
            data-testid="submit-button"
            disabled={loading || !!validationError}
            onClick={handleLogin}
            className={`${
              loading || !!validationError ? 'bg-muted text-foreground cursor-not-allowed' : 'bg-green-500'
            } w-[350px] h-[36px] rounded-md text-black flex justify-center items-center mt-[24px] text-sm`}
          >
            {loading ? 'Нэвтрэж байна...' : 'Нэвтрэх'}
          </button>
          <div className="text-[#A1A1AA] text-center text-sm p-6">
            Та бүртгэлтэй хаяггүй бол{' '}
            <Link href={`/auth/signup`} className="cursor-pointer underline">
              бүртгүүлэх
            </Link>{' '}
            хэсгээр орно уу!
          </div>
        </div>
      </div>
    </div>
  );
};
