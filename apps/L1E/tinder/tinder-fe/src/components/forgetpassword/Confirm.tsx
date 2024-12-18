'use client';

import React, { useEffect, useState } from 'react';
import Setnewpassword from './Setnewpassword';

const Confirm: React.FC = () => {
  const [step, setStep] = useState<'confirm' | 'newpassword'>('confirm');
  const [time, setTime] = useState(30);
  const [otp, setOtp] = useState(['', '', '', '']);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (otp.every((digit) => digit !== '')) {
      setStep('newpassword');
    }
  }, [otp]);

  const handleOtpChange = (index: number, value: string) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
  };

  if (step === 'newpassword') {
    return <Setnewpassword />;
  }

  return (
    <div>
      <h2>Confirm email</h2>
      <p>To continue, enter the secure code we sent to your email</p>
      <div>
        {otp.map((digit, index) => (
          <input key={index} type="text" value={digit} onChange={(e) => handleOtpChange(index, e.target.value)} maxLength={1} data-testid="set-new-password" />
        ))}
      </div>
      <button>Send again</button>
      <span>({time.toString().padStart(2, '0')})</span>
    </div>
  );
};

export default Confirm;
