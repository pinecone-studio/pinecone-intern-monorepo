'use client';
import { ConfirmEmail } from '@/components/ConfirmEmail';
import { CreateAccount } from '@/components/CreateAcc';
import { CreatePassword } from '@/components/CreatePassword';
import { GenderSelect } from './GenderSelect';

type Props = {
  step: string;
  setStep: (_step: any) => void;
};

export const MultiStepForm1 = ({ step, setStep }: Props) => {
  return (
    <>
      {step === 'createAccount' && <CreateAccount onSuccess={() => setStep('confirmEmail')} />}
      {step === 'confirmEmail' && <ConfirmEmail onSuccess={() => setStep('createPass')} />}
      {step === 'createPass' && <CreatePassword onSuccess={() => setStep('genderSelect')} />}
      {step === 'genderSelect' && <GenderSelect onSuccess={() => setStep('ageSelect')} />}
    </>
  );
};
