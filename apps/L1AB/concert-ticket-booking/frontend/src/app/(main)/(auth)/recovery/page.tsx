'use client';

import { RecoveryEmail, VerifyOtp, PasswordRecovery } from '@/components';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

const PasswordRecoveryPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const step = searchParams.get('step');

  useEffect(() => {
    router.push('/recovery?step=1');
  }, []);

  return (
    <div className="flex justify-center">
      {Number(step) === 1 && <RecoveryEmail header="OTP хүсэлт илгээх" emailLabel="Имэйл хаяг:" buttonText="Хүсэлт илгээх" />}
      {Number(step) === 2 && <VerifyOtp footerText="Имэйл хаяг руу илгээсэн 6 оронтой кодыг оруулна уу" />}
      {Number(step) === 3 && <PasswordRecovery header="" buttonText="" passwordLabel="" confirmPasswordLabel="" />}
    </div>
  );
};

export default PasswordRecoveryPage;
