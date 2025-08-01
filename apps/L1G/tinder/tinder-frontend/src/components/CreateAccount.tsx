'use client';
 
import React, { useState } from 'react';
import TinderLogo from '@/components/TinderLogo';
 
export const CreateAccount = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
 
  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
 
  const handleContinue = async () => {
    setError(null);
 
    if (!isValidEmail(email)) {
      setError('Please enter a valid email.');
      return;
    }
 
    setLoading(true);
 
    try {
      const res = await fetch('/api/check-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
 
      if (res.status !== 200) {
        setError('Email is already in use.');
        return;
      }
 
      const sendRes = await fetch('/api/send-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
 
      if (!sendRes.ok) {
        setError('Failed to send verification code.');
      } else {
        setError(null);
      }
 
    } catch (err) {
      setError('Something went wrong. Try again.');
    } finally {
      setLoading(false);
    }
  };
 
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleContinue();
  };
 
  return (
    <div className='w-[360px] flex flex-col gap-[24px]'>
      <div className='flex items-center justify-center'>
        <TinderLogo />
      </div>
      <div className='items-center flex flex-col text-center'>
        <h1 className='font-semibold text-[24px]'>Create an account</h1>
        <p className='text-[#71717A] text-[14px] font-light'>
          Enter your email below to create your account
        </p>
      </div>
 
      <form onSubmit={onSubmit} noValidate className='flex flex-col gap-[16px]'>
        <div className='flex flex-col gap-[8px]'>
          <label htmlFor="email" className='text-[15px] font-medium'>Email</label>
          <input
            id="email"
            data-testid="email-input"
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='name@example.com'
            className='border border-[#E4E4E7] rounded-[10px] py-[8px] text-[14px] font-light px-3 focus:outline-none focus:border-black'
          />
          {error && <p className='text-[11px] text-red-400 ml-1'>{error}</p>}
          <button
            data-testid="continue-button"
            type="submit"
            disabled={loading}
            className='bg-[#E11D48E5] hover:bg-black text-white rounded-full py-[8px] transition-colors duration-200'
          >
            {loading ? 'Sending...' : 'Continue'}
          </button>
        </div>
      </form>
 
      <div className='flex justify-center items-center gap-[20px]'>
        <div className='flex-1 h-[1px] bg-[#E4E4E7]' />
        <div className='text-[#71717A] font-light text-[12px]'>OR</div>
        <div className='flex-1 h-[1px] bg-[#E4E4E7]' />
      </div>
 
      <button className='border border-[#E4E4E7] hover:bg-[#F1F1F3] shadow-sm py-[8px] rounded-full transition-colors duration-200'>
        Log in
      </button>
 
      <div className='w-full flex flex-col items-center text-center'>
        <p className='font-light text-[#71717A] text-[14px]'>
          By clicking continue, you agree to our
        </p>
        <p className='font-light text-[#71717A] text-[14px]'>
          <a href="https://policies.tinder.com/community-guidelines/intl/en/" className='underline'>
            Terms of Service
          </a> and{' '}
          <a href="https://policies.tinder.com/privacy/intl/en-gb/" className='underline'>
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  );
};