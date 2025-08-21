'use client';
import { CreateAccount } from '@/components/CreateAcc';
import { UserData } from '@/app/(auth)/signup/page';
import { GenderSelect } from './GenderSelect';

type Props = {
  step: string;
  setStep: (_step: any) => void;
  userData: UserData;
  updateUserData: (_: Partial<UserData>) => void;
};

export const MultiStepForm1 = ({ step, setStep, userData, updateUserData }: Props) => {
  return (
    <>
      {step === 'createAccount' && <CreateAccount onSuccess={() => setStep('genderSelect')} updateUserData={updateUserData} userData={userData} />}
      {step === 'genderSelect' && <GenderSelect onSuccess={() => setStep('ageSelect')} updateUserData={updateUserData} />}
    </>
  );
};
