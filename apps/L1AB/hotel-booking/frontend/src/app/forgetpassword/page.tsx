'use client';

import { CreatePassForm, ForgetPassForm, OtpForm } from '@/components/main';
import { useState } from 'react';

type InputDataType = {
  email: string;
  otp: string;
  password: string;
};

const Page = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [inputData, setInputData] = useState<InputDataType>({
    email: '',
    otp: '',
    password: '',
  });

  const handleOnchange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <div>
      {currentIndex === 0 && <ForgetPassForm setInputData={setInputData} setCurrentIndex={setCurrentIndex} handleOnchange={handleOnchange} inputData={inputData} />}
      {currentIndex === 1 && <OtpForm setInputData={setInputData} setCurrentIndex={setCurrentIndex} handleOnchange={handleOnchange} inputData={inputData} />}
      {currentIndex === 2 && <CreatePassForm setInputData={setInputData} inputData={inputData} handleOnchange={handleOnchange} />}
    </div>
  );
};

export default Page;
