'use client';

import { useState, useEffect } from 'react';

import { InterestSelect } from './InterestSelect';

const Addpassword: React.FC = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [step, setStep] = useState('confirm');

  useEffect(() => {
    const savedData = localStorage.getItem('signupFormData');
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      if (parsedData.password) {
        setPassword(parsedData.password);
      }
    }
  }, []);

  useEffect(() => {
    const savedData = localStorage.getItem('signupFormData');
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      parsedData.password = password;
      localStorage.setItem('signupFormData', JSON.stringify(parsedData));
    }
  }, [password]);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async () => {
    if (password.length < 5) {
      setError('Password must be at least 5 characters long.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setError('');
    const savedData = localStorage.getItem('signupFormData') || '{}';
    const parsedData = JSON.parse(savedData);
    parsedData.password = password;
    localStorage.setItem('signupFormData', JSON.stringify(parsedData));

    setStep('interest');
  };

  return (
    <div>
      {step === 'confirm' && (
        <div className="flex flex-col items-center w-full h-screen max-h-[1000px] justify-center">
          <div className="w-[350px] flex flex-col gap-8 items-center justify-between h-[340px]">
            <img className="w-[100px] h-[24px]" src="redlogo.png" alt="Logo" />
            <div className="flex gap-2 h-[92px] w-[350px] items-center flex-col">
              <div className="font-semibold text-2xl">Create password</div>
              <div className="font-normal text-center text-sm text-[#71717A]">Use a minimum of 10 characters, including uppercase letters, lowercase letters, and numbers</div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="password" className="font-medium text-sm">
                  Password
                </label>
                <input
                  id="password"
                  value={password}
                  onChange={handlePasswordChange}
                  placeholder="Password"
                  className="w-[350px] h-[36px] px-3 py-2 border-[1px] border-[#E4E4E7] rounded-[6px]"
                  type="password"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="confirm-password" className="font-medium text-sm">
                  Confirm password
                </label>
                <input
                  id="confirm-password"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  placeholder="Password repeat"
                  className="w-[350px] h-[36px] px-3 py-2 border-[1px] border-[#E4E4E7] rounded-[6px]"
                  type="password"
                />
              </div>
              {error && <p className="text-red-600 text-center text-sm">{error}</p>}
              <button data-testid="continue-btn" className="flex w-[350px] h-[36px] font-medium text-sm justify-center items-center rounded-full text-white bg-[#E11D48]" onClick={handleSubmit}>
                Continue
              </button>
            </div>
          </div>
        </div>
      )}

      {step === 'interest' && <InterestSelect />}
    </div>
  );
};

export default Addpassword;
