'use client';

import { Login } from '@/components/Login';
import { OtpGenerate } from '@/components/OtpGenerate';
import { useGetEmployeeByEmailLazyQuery } from '@/generated';
import React, { useState } from 'react';

const Page = () => {
  const [loginStage, setLoginStage] = useState<string>('email');
  const [getEmployeeByEmail] = useGetEmployeeByEmailLazyQuery();
  const [email, setEmail] = useState<string>();
  const [error, setError] = useState<string>('');

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

  const handleChange = (e: string) => {
    setLoginStage(e);
  };
  const handlesubmit = () => {
    console.log();
  };
  return (
    <div className="w-screen h-screen flex items-center justify-center" data-cy="login-page">
      {loginStage === 'email' ? <Login emailSubmit={emailSubmit} emailHnalder={emailHnalder} error={error} /> : <OtpGenerate handlesubmit={handlesubmit} handleChange={handleChange} />}
    </div>
  );
};

export default Page;
