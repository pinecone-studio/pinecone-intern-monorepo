'use client';
import { ConfirmEmail } from '@/components/ConfirmEmail';
import { CreateAccount } from '@/components/CreateAcc';
import { CreatePassword } from '@/components/CreatePassword';
import { GenderSelect } from '@/components/GenderSelect';
import HowOldAreYou from '@/components/HowOldAreYou';
import { MainHeader } from '@/components/MainHeader';
import { ProfileImages } from '@/components/ProfileImages';
import { YouAreAllSet } from '@/components/YouAreAllSet';
import YourDetailsPage from '@/components/YourDetailsPage';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const Signup = () => {
  const router = useRouter();

  const [step, setStep] = useState<'createAccount' | 'confirmEmail' | 'createPass' | 'genderSelect' | 'ageSelect' | 'details' | 'uploadImages' | 'allSet'>('createAccount');

  const renderStep = () => {
    switch (step) {
      case 'createAccount':
        return <CreateAccount onSuccess={() => setStep('confirmEmail')} />;
      case 'confirmEmail':
        return <ConfirmEmail onSuccess={() => setStep('createPass')} />;
      case 'createPass':
        return <CreatePassword onSuccess={() => setStep('genderSelect')} />;
      case 'genderSelect':
        return <GenderSelect onSuccess={() => setStep('ageSelect')} />;
      case 'ageSelect':
        return <HowOldAreYou onSuccess={() => setStep('details')} onBack={() => setStep('genderSelect')} />;
      case 'details':
        return <YourDetailsPage onSuccess={() => setStep('uploadImages')} onBack={() => setStep('ageSelect')} />;
      case 'uploadImages':
        return <ProfileImages onSuccess={() => setStep('allSet')} />;
      case 'allSet':
        return <YouAreAllSet onSuccess={() => router.push('/home')} />;
      default:
        return null;
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center relative">
      <div className="w-[640px] h-fit flex flex-col gap-6 items-center justify-start top-[200px] fixed">
        <MainHeader />
        <div className="w-fit max-w-[640px] h-fit flex flex-col gap-4">{renderStep()}</div>
      </div>
    </div>
  );
};

export default Signup;
