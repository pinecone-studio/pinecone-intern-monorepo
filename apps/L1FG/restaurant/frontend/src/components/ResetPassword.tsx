'use client';

import { useRequestChangePasswordMutation } from '@/generated';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const ResetPassword = () => {
  const [email, setEmail] = useState<string>('');
  const [requestChangePassword] = useRequestChangePasswordMutation();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleContinue = async () => {
    setLoading(!loading);

    const { data } = await requestChangePassword({
      variables: { input: { email } },
    });

    if (!data) return;

    localStorage.setItem('requestedEmail', data.requestChangePassword.email);
    router.push('/otp');
  };

  return (
    <div className="flex flex-col items-center w-full  mx-auto px-4 gap-8 max-w-[340px] min-w-[320px]">
      <p className="text-[#441500] font-semibold text-2xl">Нууц үг сэргээх</p>
      <form className="flex flex-col gap-2 w-full">
        <input
          data-testid="email"
          placeholder="Имэйл хаяг"
          className="w-full h-[36px] px-3 py-2 border border-gray-300 rounded-md"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          type="button"
          data-testid="continue"
          className="flex w-full h-[36px] font-medium text-sm justify-center items-center rounded-md text-white bg-[#441500] disabled:bg-gray-400"
          onClick={handleContinue}
        >
          {loading ? 'Уншиж байна...' : 'Үргэлжлүүлэх'}
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
