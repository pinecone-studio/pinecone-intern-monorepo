'use client';

import CodeInput from '@/app/_features/resertPassword/CodeInput';
import { ResetPage } from '@/app/_features/resertPassword/PasswordReset';
import { ChangeEvent, useState } from 'react';
import { NewPassword } from '../_features/resertPassword/NewPassword';

const stepper = [ResetPage, CodeInput, NewPassword];

export type dataProps = {
  email: string;
  password: string;
  code: string;
};

export type passwordClick = {
  handleNext: () => void;
  handleBack: () => void;
  handleChange: (_event: ChangeEvent<HTMLInputElement>) => void;
  data: dataProps;
};

const Page = () => {
  const [step, setStep] = useState(0);

  const [data, setData] = useState({ email: '', password: '', code: '' });

  const Step = stepper[step];

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (step < stepper.length) return <Step handleChange={handleChange} data={data} handleNext={() => setStep((prev) => prev + 1)} handleBack={() => setStep((prev) => prev - 1)}></Step>;
};

export default Page;
