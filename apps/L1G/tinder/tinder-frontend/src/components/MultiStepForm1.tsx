'use client';
import { CreateAccount } from '@/components/CreateAcc';
<<<<<<< HEAD
import { UserData } from '@/app/(auth)/signup/page';
=======
import { CreatePassword } from '@/components/CreatePassword';
import { GenderOfUser } from '@/components/GenderOfUser';
>>>>>>> 7ce770644 (umnuh main dotorh buh yum ok)
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
