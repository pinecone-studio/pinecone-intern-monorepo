'use client';
import { CreateAccount } from '@/components/CreateAcc';
import { CreatePassword } from '@/components/CreatePassword';
import { UserData } from '@/app/(auth)/signup/page';
import { GenderSelect } from './GenderSelect';

type Props = {
  step: string;
  setStep: (_step: any) => void;
  userData: UserData;
  updateUserData: (newData: Partial<UserData>) => void;
};

export const MultiStepForm1 = ({ step, setStep, userData, updateUserData }: Props) => {
  return (
    <>
      {step === 'createAccount' && <CreateAccount onSuccess={() => setStep('createPass')} updateUserData={updateUserData} userData={userData} />}
      {step === 'createPass' && <CreatePassword onSuccess={() => setStep('genderSelect')} otpId={userData.otpId || ''} updateUserData={updateUserData} />}
      {step === 'genderSelect' && <GenderSelect onSuccess={() => setStep('ageSelect')} updateUserData={updateUserData} />}
    </>
  );
};
