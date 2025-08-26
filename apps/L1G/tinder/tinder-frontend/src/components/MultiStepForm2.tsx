'use client';
import HowOldAreYou from '@/components/HowOldAreYou';
import { ProfileImages } from '@/components/ProfileImages';
import { YouAreAllSet } from '@/components/YouAreAllSet';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { UserData } from '@/app/(auth)/signup/page';
import { YourDetailsPage } from './YourDetailsPage';

type Props = {
  step: string;
  setStep: (_: any) => void;
  router: AppRouterInstance;
  userData: UserData;
  updateUserData: (_: Partial<UserData>) => void;
};

const MultiStepForm2 = ({ step, setStep, router, userData, updateUserData }: Props) => {
  return (
    <>
      {step === 'ageSelect' && <HowOldAreYou updateUserData={updateUserData} onSuccess={() => setStep('details')} onBack={() => setStep('genderSelect')} />}
      {step === 'details' && <YourDetailsPage userData={userData} updateUserData={updateUserData} onSuccess={() => setStep('uploadImages')} onBack={() => setStep('ageSelect')} />}
      {step === 'uploadImages' && <ProfileImages onBack={() => setStep('details')} onSuccess={() => setStep('allSet')} updateUserData={updateUserData} />}
      {step === 'allSet' && <YouAreAllSet onSuccess={() => router.push('/home')} />}
    </>
  );
};

export default MultiStepForm2;
