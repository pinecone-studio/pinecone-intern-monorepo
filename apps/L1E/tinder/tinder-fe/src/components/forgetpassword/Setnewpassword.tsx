'use client';

import { useRouter } from 'next/navigation';
import { useState, ChangeEvent, useEffect } from 'react';
import { useChangePasswordMutation } from '@/generated';

interface InputData {
  password: string;
  rePassword: string;
}

const Setnewpassword: React.FC = () => {
  const [ChangePasswordInput] = useChangePasswordMutation();
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');

  const router = useRouter();

  useEffect(() => {
    const savedData = localStorage.getItem('forgetpassword');

    const parsedData = savedData ? JSON.parse(savedData) : null;

    if (parsedData?.email) {
      setEmail(parsedData.email);
      setOtp(parsedData.otp);
    }
  }, []);

  const [inputData, setInputData] = useState<InputData>({
    password: '',
    rePassword: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleClick = async () => {
    await ChangePasswordInput({
      variables: {
        input: { otp, email, password: inputData.password },
      },
    });
    router.push('/signin');
  };

  return (
    <div className="flex flex-col items-center w-full h-screen max-h-[1000px] justify-center">
      <div className="w-[350px] flex flex-col gap-8 items-center justify-between h-[340px]">
        <img className="w-[100px] h-[24px]" src="redlogo.png" alt="Logo" />
        <div className="flex gap-2 h-[92px] w-[350px] items-center flex-col">
          <div className="font-semibold text-2xl">Set new password</div>
          <div className="font-normal text-center text-sm text-[#71717A]">Use a minimum of 10 characters, including uppercase letters, lowercase letters, and numbers.</div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <div className="font-medium text-sm">Password</div>
            <input
              data-testid="password"
              name="password"
              value={inputData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-[350px] h-[36px] px-3 py-2 border-[1px] border-[#E4E4E7] rounded-[6px]"
              type="password"
            />
          </div>
          <div className="flex flex-col gap-2">
            <div className="font-medium text-sm">Confirm password</div>
            <input
              name="rePassword"
              value={inputData.rePassword}
              onChange={handleChange}
              placeholder="Password repeat"
              className="w-[350px] h-[36px] px-3 py-2 border-[1px] border-[#E4E4E7] rounded-[6px]"
              type="password"
            />
          </div>
          <button data-testid="confirmemail" onClick={handleClick} className="flex w-[350px] h-[36px] font-medium text-sm justify-center items-center rounded-full text-white bg-[#E11D48]">
            Confirm Email
          </button>
        </div>
      </div>
    </div>
  );
};

export default Setnewpassword;
