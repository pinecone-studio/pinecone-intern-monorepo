'use client';
import React, { useState } from 'react';
import FirstStep from './FirstStep';
import SecondStep from './SecondStep';
import ThirdStep from '../_components/ThirdStep';
import FourthStep from './FourthStep';
import FifthStep from '../_components/FifthStep';
import Image from 'next/image';
import { useCreateProfileMutation } from '@/generated';
import { ProfileFormData } from '@/app/utils/types';


const CreateAccountSteps = () => {
  const [step, setStep] = useState<number>(0);
  const [createProfile]= useCreateProfileMutation()

  const [formData, setFormData] = useState<ProfileFormData>({
    interestedIn: '',
    age: 0,
    name: '',
    bio: '',
    interest: '',
    profession: '',
    schoolOrWork: '',
    images: [],
  });

  const Steps = [FirstStep, SecondStep, ThirdStep, FourthStep, FifthStep][step];

  const updateFormData = async (updatedValues: Partial<ProfileFormData>) => {
  setFormData(prev => ({ ...prev, ...updatedValues }));

};

  const handleSubmit = async (imagesOverride?: string[]) => {

  const finalImages = imagesOverride ?? formData.images;

  await createProfile({
    variables: {
      input: {
        user: '68351c543724fbd2e052f029',
        interestedIn: formData.interestedIn,
        age: formData.age,
        profileInfo: {
          name: formData.name,
          bio: formData.bio,
          interest: formData.interest,
          profession: formData.profession,
          school: formData.schoolOrWork,
        },
        images: finalImages,
      },
    },
  });
  
  };


  return (
    <div className="flex flex-col gap-[24px]  w-full items-center mt-[80px]">
      <Image src="/tinder.svg" width={100} height={25} alt="logo" />
      <Steps setStep={setStep} step={step} updateFormData = {updateFormData} handleSubmit= {handleSubmit} />
    </div>
  );
};

export default CreateAccountSteps;

