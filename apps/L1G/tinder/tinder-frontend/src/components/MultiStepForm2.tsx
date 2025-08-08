'use client';
import HowOldAreYou from '@/components/HowOldAreYou';
import YourDetailsPage from '@/components/YourDetailsPage';
import { ProfileImages } from '@/components/ProfileImages';
import { YouAreAllSet } from '@/components/YouAreAllSet';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

type Props = {
  step: string;
  setStep: (_: any) => void;
  router: AppRouterInstance;
};

export const MultiStepForm2 = ({ step, setStep, router }: Props) => {
  return (
    <>
      {step === 'ageSelect' && <HowOldAreYou onSuccess={() => setStep('details')} onBack={() => setStep('genderSelect')} />}
      {step === 'details' && <YourDetailsPage onSuccess={() => setStep('uploadImages')} onBack={() => setStep('ageSelect')} />}
      {step === 'uploadImages' && <ProfileImages onSuccess={() => setStep('allSet')} />}
      {step === 'allSet' && <YouAreAllSet onSuccess={() => router.push('/home')} />}
    </>
  );
};
