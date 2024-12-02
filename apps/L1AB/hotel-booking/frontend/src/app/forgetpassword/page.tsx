'use client';

import { CreatePassForm, ForgetPassForm, OtpForm } from '@/components/main';
import { useState } from 'react';
import { Dispatch, SetStateAction } from 'react';

export type InputDataType = {
  email: string;
  otp: string;
  password: string;
  rePassword: string;
};

type SetCurrentIndexType = Dispatch<SetStateAction<number>>;
type SetInputDataType = Dispatch<SetStateAction<InputDataType>>;
type handleOnchangeType = (_event: React.ChangeEvent<HTMLInputElement>) => void;

export type ForgetPassFormProps = {
  setInputData: SetInputDataType;
  setCurrentIndex: SetCurrentIndexType;
  handleOnchange: handleOnchangeType;
  inputData: InputDataType;
};

const STEP_COMPONENTS = [ForgetPassForm, OtpForm, CreatePassForm];

const Page = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [inputData, setInputData] = useState<InputDataType>({
    email: '',
    otp: '',
    password: '',
    rePassword: '',
  });

  const Component = STEP_COMPONENTS[currentIndex];

  const handleOnchange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  return <Component setInputData={setInputData} setCurrentIndex={setCurrentIndex} handleOnchange={handleOnchange} inputData={inputData} />;
};

export default Page;
