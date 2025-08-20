'use client';
import { ConfirmEmail } from '@/components/ConfirmEmail';
import { CreateAccount } from '@/components/CreateAcc';
import { CreatePassword } from '@/components/CreatePassword';
import { GenderSelect } from './GenderSelect';
import { UserData } from '@/app/(auth)/signup/page';
import { OtpType } from '@/generated';

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
      {/* {step === 'confirmEmail' && userData.email && <ConfirmEmail onSuccess={() => setStep('createPass')} email={userData.email} updateUserData={updateUserData} otpType={OtpType.Create} />} */}
      {step === 'createPass' && <CreatePassword onSuccess={() => setStep('genderSelect')} otpId={userData.otpId ?? ''} updateUserData={updateUserData} />}
      {step === 'genderSelect' && <GenderSelect onSuccess={() => setStep('ageSelect')} updateUserData={updateUserData} />}
    </>
  );
};
