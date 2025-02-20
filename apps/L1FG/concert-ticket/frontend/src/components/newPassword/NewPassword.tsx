'use client';

import { useChangePasswordMutation } from '@/generated';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export const NewPassword = () => {
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
      router.push('/signin');
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
    <div className="flex items-center justify-center min-h-screen bg-[#09090B]">
      <div className="w-[446px] h-[300px] bg-[#09090B] border-2 border-[#27272A] rounded-md flex flex-col items-center py-6">
        <p className="text-white text-[24px] font-semibold mb-6">Шинэ нууц үг </p>
        <div className="w-[350px]">
          <form className="flex flex-col gap-2">
            <input
              data-testid="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-[36px] bg-black text-[13px] text-white pl-[10px] border-2 border-[#27272A] rounded-sm mb-6"
              type="password"
              placeholder="Шинэ нууц үг"
            />
            <input
              data-testid="rePassword"
              value={rePassword}
              onChange={(e) => setRePassword(e.target.value)}
              className="w-full h-[36px] bg-black text-[13px] text-white pl-[10px] border-2 border-[#27272A] rounded-sm mb-6"
              type="password"
              placeholder="Шинэ нууц үг давтах"
            />
          </form>
          {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
          <button type="button" data-testid="CreateNewPassword" className="w-full h-[36px] bg-[#00B7F4] hover:bg-[#1a83ec] text-black rounded-sm" onClick={handleSubmit} disabled={loading}>
            {loading ? 'Үүсгэж байна...' : 'Үүсгэх'}
          </button>
        </div>
      </div>
    </div>
  );
};
