'use client';

import { useChangePasswordMutation } from '@/generated';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const NewPassword = () => {
  const router = useRouter();
  const [createNewPassword, { loading }] = useChangePasswordMutation();
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [userId, setUserId] = useState<string | null>('');

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(JSON.parse(storedUserId));
    }
  }, []);

  const handleSubmit = async () => {
    if (!userId) {
      router.push('/reset-password');
      return;
    }

    if (password !== rePassword) {
      setErrorMessage('Нууц үг таарахгүй байна.');
      return;
    }

    setErrorMessage('');

    try {
      await createNewPassword({
        variables: {
          input: { _id: userId, newPassword: password, newRePassword: rePassword },
        },
      });
      localStorage.removeItem('userId');
      router.push('/done');
    } catch (err) {
      setErrorMessage('Серверийн алдаа. Дахин оролдоно уу.');
    }
  };

  return (
    <div className="flex flex-col items-center w-full mx-auto px-4 gap-8 max-w-[340px] min-w-[320px]">
      <p>Шинэ нууц үг</p>
      <div className="flex flex-col gap-2 w-full">
        <form className="flex flex-col gap-2">
          <input
            data-testid="password"
            placeholder="Нууц үг"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full h-[36px] px-3 py-2 border border-gray-300 rounded-md"
            type="password"
            autoComplete="new-password"
          />
          <input
            data-testid="rePassword"
            placeholder="Нууц үг давтах"
            value={rePassword}
            onChange={(e) => setRePassword(e.target.value)}
            className="w-full h-[36px] px-3 py-2 border border-gray-300 rounded-md"
            type="password"
            autoComplete="new-password"
          />
        </form>
        {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
        <button
          type="button"
          data-testid="CreateNewPassword"
          className={`flex w-full h-[36px] font-medium text-sm justify-center items-center rounded-md text-white ${loading ? 'bg-gray-400' : 'bg-[#441500]'}`}
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? 'Үүсгэж байна...' : 'Үүсгэх'}
        </button>
      </div>
    </div>
  );
};

export default NewPassword;
