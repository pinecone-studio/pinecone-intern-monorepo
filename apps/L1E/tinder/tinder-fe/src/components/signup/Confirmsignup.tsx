'use client';

import { useEffect, useState, useRef } from 'react';
import { useRequestOtpMutation } from '@/generated';
import Addpassword from './Addpassword';
import Image from 'next/image';

export const Confirmsignup = () => {
  const [requestOtp] = useRequestOtpMutation();
  const [step, setStep] = useState<'signup' | 'confirm'>('confirm');
  const [value, setValue] = useState<string[]>(['', '', '', '']);
  const [email, setEmail] = useState('');

  const inputRefs = useRef<HTMLInputElement[]>([]);

  useEffect(() => {
    const savedEmail = localStorage.getItem('signupFormData');
    setEmail(JSON.parse(savedEmail!).email);
  }, []);

  useEffect(() => {
    const sendOtp = async () => {
      if (email) {
        await requestOtp({
          variables: {
            input: {
              email,
              otp: '',
            },
          },
        });
      }
    };
    sendOtp();
  }, [email]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  useEffect(() => {
    if (value.every((char) => char !== '')) {
      handleSubmit();
    }
  }, [value]);

  const handleInputChange = (index: number, newValue: string) => {
    // newValue.length > 1;

    const newValues = [...value];
    newValues[index] = newValue;
    setValue(newValues);

    if (newValue && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleSubmit = async () => {
    await requestOtp({
      variables: {
        input: {
          email,
          otp: value.join(''),
        },
      },
    });
    setStep('signup');
  };

  return (
    <div className="flex flex-col items-center w-full h-screen max-h-[1000px] justify-center">
      {step === 'confirm' ? (
        <div className=" flex flex-col items-center justify-between h-[276px] w-[350px] ">
          <Image width={100} height={24} src="/redlogo.png" alt="Logo" />
          <div className="flex gap-2 h-[72px] w-[305px] items-center flex-col">
            <div className="font-semibold text-black text-2xl">Confirm email</div>
            <div className="font-normal text-center text-sm text-[#71717A]">{`To continue, enter the secure code we sent to ${email} Check junk mail if it’s not in your inbox.`}</div>
          </div>
          <div className="flex items-center justify-center w-[157px] max-sm:w-full">
            <div className="flex gap-[2px]">
              {value.map((char, index) => (
                <input
                  data-testid="Signup"
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el!)}
                  type="text"
                  maxLength={1}
                  value={char}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  // onKeyDown={(e) => handleKeyDown(e, index)}
                  className="h-[40px] w-[40px] text-center text-lg border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 text-black"
                />
              ))}
            </div>
          </div>
        </div>
      ) : (
        step === 'signup' && <Addpassword />
      )}
    </div>
  );
};

export default Confirmsignup;
