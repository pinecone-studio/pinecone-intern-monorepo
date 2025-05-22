'use client';
import { useState } from 'react';
import { PassRecoveryStep1 } from '../_feature/reset-password/PassRecoveryStep1';
import { PassRecoveryStep2 } from '../_feature/reset-password/PassRecoveryStep2';
import PassRecoveryStep3 from '../_feature/reset-password/PassRecoveryStep3';
import { Complete } from '../_feature/Complete';

const ResetPasswordPage = () => {
  const [step, setStep] = useState(1);
  return (
    <>
      {step === 1 && <PassRecoveryStep1 setStep={setStep} />}
      {step === 2 && <PassRecoveryStep2 setStep={setStep} />}
      {step === 3 && <PassRecoveryStep3 setStep={setStep} />}
      {step === 4 && <Complete />}
    </>
  );
};

export default ResetPasswordPage;
