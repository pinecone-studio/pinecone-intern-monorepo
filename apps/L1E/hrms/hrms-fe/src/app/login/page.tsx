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
  const [loader, setLoader] = useState(false);

  const emailHnalder = (e: string) => {
    setEmail(e);
  };
  const emailSubmit = async (e: string) => {
    setLoader(true);
    if (!email) {
      setError('И-мэйл хаягаа оруулна уу ');
    } else {
      const { data } = await getEmployeeByEmail({ variables: { email: email } });
      if (data) {
        handleChange(e);
        setError('');
      } else {
        setError('Ийм и-мэйл байхгүй байна');
      }
    }

    setLoader(false);
  };

  const resent = async () => {
    setErrorotp('OTP дахин илгээж байна...');
    const { refetch } = await getEmployeeByEmail({ variables: { email: email } });
    refetch();
  };

  const handleChange = (e: string) => {
    setLoginStage(e);
    if (e == 'email') {
      setEmail('');
    }
    setErrorotp('');
  };
  const handlesubmit = async (e: string) => {
    setErrorotp('Уншиж байна...');
    const { data } = await getEmployeeByOtp({ variables: { email: email, otpToken: e } });

    if (data) {
      localStorage.setItem('token', JSON.stringify(data.getEmployeeByOtp?.employee?._id));
      setEmail('');
      router.push('/my-requests');
    } else {
      setErrorotp('otp таарахгүй байна.');
    }
  };
  return (
    <div className="w-screen h-screen flex items-center justify-center" data-cy="login-page">
      {loginStage === 'email' ? (
        <Login emailSubmit={emailSubmit} emailHnalder={emailHnalder} error={error} loader={loader} />
      ) : (
        <OtpGenerate handlesubmit={handlesubmit} handleChange={handleChange} errorotp={errorotp} resent={resent} />
      )}
    </div>
  );
};

export default Page;
