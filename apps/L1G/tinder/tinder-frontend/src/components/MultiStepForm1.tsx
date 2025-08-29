'use client';
import { CreateAccount } from '@/components/CreateAcc';
import { UserData } from '@/app/(auth)/signup/page';
import { GenderSelect } from './GenderSelect';
import { GenderOfUser } from './GenderOfUser';

type Props = {
  step: string;
  setStep: (_step: any) => void;
  userData: UserData;
  updateUserData: (_: Partial<UserData>) => void;
};

export const MultiStepForm1 = ({ step, setStep, userData, updateUserData }: Props) => {
  return (
    <>
      {step === 'createAccount' && <CreateAccount onSuccess={() => setStep('genderOfUser')} updateUserData={updateUserData} userData={userData} />}
      {step === 'genderOfUser' && <GenderOfUser onSuccess={() => setStep('genderSelect')} updateUserData={updateUserData} />}
      {step === 'genderSelect' && <GenderSelect onSuccess={() => setStep('ageSelect')} updateUserData={updateUserData} />}
    </>
  );
};
