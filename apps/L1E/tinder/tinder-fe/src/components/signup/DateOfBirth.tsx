'use client';

import { Button } from '@/components/ui/button';
import Logo from '../common/Logo';
import Title from '../common/Title';
import Tinder from '../common/Tinder';
import { useEffect, useState } from 'react';
import UserInformation from './UserInformation';

const DateOfBirth = () => {
  const [step, setStep] = useState('age');
  const [age, setAge] = useState('');

  useEffect(() => {
    const savedData = localStorage.getItem('signupFormData');
    if (!savedData) return;
    const parsedData = JSON.parse(savedData);
    setAge(parsedData.age);
  }, []);

  useEffect(() => {
    const savedData = localStorage.getItem('signupFormData');
    const parsedData = savedData ? JSON.parse(savedData) : {};
    parsedData.age = age;
    localStorage.setItem('signupFormData', JSON.stringify(parsedData));
  }, [age]);

  const handleNext = () => {
    if (age) {
      setStep('detail');
    }
  };
  const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAge(e.target.value);
  };

  return (
    <div className="w-screen h-screen justify-between items-center flex flex-col">
      {step === 'age' && (
        <div className="w-screen h-screen flex justify-center mt-[80px] ">
          <div className="w-[400px], h-[244px] gap-[24px] flex flex-col justify-center items-center ">
            <Logo />
            <Title text="How old are you" desc="Please enter your age to continue." />
            <div className="flex flex-col gap-7">
              <input id="password" value={age} onChange={handleAgeChange} placeholder="age" className="w-[350px] h-[36px] px-3 py-2 border-[1px] border-[#E4E4E7] rounded-[6px]" type="text" />
              <div className="w-[400px] flex justify-between text-end">
                <Button className=" bg-white border rounded-full w-[64px] h-[36px] text-black ">Back</Button>
                <Button onClick={handleNext} className="bg-[#E11D48E5] text-white rounded-full w-[64px] h-[36px] ">
                  Next
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
      {step === 'detail' && <UserInformation />}
      <Tinder />
    </div>
  );
};

export default DateOfBirth;
