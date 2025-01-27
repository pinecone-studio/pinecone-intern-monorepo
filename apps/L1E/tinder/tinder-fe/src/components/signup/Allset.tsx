'use client';

import Logo from '../common/Logo';

import Tinder from '../common/Tinder';
import { useState } from 'react';
import { useCreateUserMutation } from '@/generated';
import { useRouter } from 'next/navigation';
import { CircleCheck } from 'lucide-react';

export const AllSet = () => {
  const [error, setError] = useState('');
  const router = useRouter();

  const [createUser] = useCreateUserMutation();

  const handleSubmit = async () => {
    const savedData = localStorage.getItem('signupFormData');

    if (!savedData) {
      setError('No saved data found');
      return;
    }

    const parsedData = JSON.parse(savedData);
    const { email, password, age, bio, hobby, job, name, images, profession, interested } = parsedData;

    try {
      await createUser({
        variables: {
          input: {
            email,
            password,
            age,
            bio,
            hobby,
            interest: interested,
            job,
            username: name,
            profession,
            images,
            match: [],
          },
        },
      });

      localStorage.removeItem('signupFormData');

      router.push('/signin');
    } catch (err) {
      setError('There was an error submitting your data.');
    }
  };

  return (
    <div className="flex flex-col items-center h-screen justify-between">
      <div className="pt-[32px]">
        <Logo />
      </div>
      <div className="flex flex-col w-[320px] h-[220px] items-center justify-between">
        <CircleCheck className="text-[#18ba51]" />
        <div className="font-semibold text-2xl">You re all set!</div>
        <div className="text-sm text-[#71717a] text-center">Your account is all set. You re ready to explore and connect!</div>
        <button onClick={handleSubmit} className="w-[127px] h-[40px] font-medium text-sm text-white py-2 px-4 rounded-full bg-[#e11d48]">
          Start Swiping!
        </button>
      </div>
      <Tinder />
      {error && <p className="text-red-600 text-center text-sm">{error}</p>}
    </div>
  );
};
