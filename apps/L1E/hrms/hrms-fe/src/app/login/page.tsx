'use client';

import { Login } from '@/components/Login';
import { OtpGenerate } from '@/components/OtpGenerate';
import { useGetEmployeeByEmailLazyQuery, useGetEmployeeByOtpLazyQuery } from '@/generated';
import { useRouter } from 'next/navigation';

import React, { useState } from 'react';

const Page = () => {
  const [loginStage, setLoginStage] = useState<string>('email');
  const [getEmployeeByEmail] = useGetEmployeeByEmailLazyQuery();
  const [getEmployeeByOtp] = useGetEmployeeByOtpLazyQuery();
  const [email, setEmail] = useState<string>();
  const [error, setError] = useState<string>('');
  const [errorotp, setErrorotp] = useState<string>('');
  const router = useRouter();

  const emailHnalder = (e: string) => {
    setEmail(e);
  };
  const emailSubmit = async (e: string) => {
    const { data } = await getEmployeeByEmail({ variables: { email: email } });

    if (!email) {
      setError('И-мэйл хаягаа оруулна уу ');
    } else {
      if (data) {
        handleChange(e);
        setError('');
      } else {
        setError('Ийм и-мэйл байхгүй байна');
      }
    }
  };

  const resent = async () => {
    const { refetch } = await getEmployeeByEmail({ variables: { email: email } });
    refetch();
    setErrorotp('otp dahin ilgeelee');
  };

  const handleChange = (e: string) => {
    setLoginStage(e);
  };
  const handlesubmit = async (e: string) => {
    const { data } = await getEmployeeByOtp({ variables: { email: email, otpToken: e } });

    if (data) {
      localStorage.setItem('token', JSON.stringify(data.getEmployeeByOtp?._id));
      router.push('/');
    } else {
      setErrorotp('invalid otp');
    }
  };
  return (
    <div className="w-screen h-screen flex items-center justify-center" data-cy="login-page">
      {loginStage === 'email' ? (
        <Login emailSubmit={emailSubmit} emailHnalder={emailHnalder} error={error} />
      ) : (
        <OtpGenerate handlesubmit={handlesubmit} handleChange={handleChange} errorotp={errorotp} resent={resent} />
      )}
    </div>
  );
};

export default Page;
