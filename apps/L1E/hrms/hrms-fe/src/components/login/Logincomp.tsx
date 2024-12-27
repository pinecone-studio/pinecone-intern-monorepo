'use client';
import React, { useState } from 'react';
import OtPpasswordcomp from './OtpPasswordcomp';

const Logincomp = () => {
  const [credential, setCredential] = useState('');
  const [error, setError] = useState('');
  const [showOTP, setShowOTP] = useState(false);

  const handleSubmit = () => {
    if (!credential) {
      setError('Имэйл хаягаа оруулна уу.');
      return;
    }
    setShowOTP(true);
  };

  return (
    <div className="flex flex-col items-center justify-between h-screen p-4 bg-gray-50" data-cy="Login-Page">
      <div className="flex items-center h-full">
        {!showOTP ? (
          <div className="w-[300px] p-8 py-16 flex flex-col gap-8 rounded-3xl border bg-card shadow-sm text-card-foreground">
            <div className="text-center flex flex-col items-center gap-5">
              <div>
                <h3 className="text-2xl font-semibold leading-none tracking-tight">Нэвтрэх</h3>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="35" viewBox="0 0 40 35" fill="none">
                <path
                  d="M6.53711 3.05531L1.21625 13.2358C0.552329 14.5102 0.219238 15.9082 0.219238 17.3085C0.219238 18.7088 0.552329 20.1072 1.21625 21.3811L6.53711 31.5616C7.51785 33.4423 9.43595 34.6165 11.5235 34.6165H17.1757V31.7324H17.1734C16.1307 31.7324 15.1717 31.1464 14.6813 30.2061L9.36228 20.0237C8.91755 19.1748 8.6961 18.2428 8.6961 17.3085C8.6961 16.3742 8.91755 15.4422 9.36228 14.5932L14.6813 4.41086C15.1717 3.47056 16.1307 2.88413 17.1734 2.88413H17.1757V0H11.5235C9.43595 0 7.51785 1.17469 6.53711 3.05531Z"
                  fill="currentColor"
                />
                <path
                  d="M38.7839 13.2358L33.4631 3.05531C32.4819 1.17469 30.5642 0 28.4766 0H22.8245V2.88413H22.8268C23.8694 2.88413 24.8285 3.47055 25.3188 4.41086L30.6379 14.5932C31.0822 15.4422 31.3036 16.3742 31.3036 17.3085C31.3036 18.2428 31.0822 19.1748 30.6379 20.0237L25.3188 30.2061C24.8285 31.1464 23.8694 31.7324 22.8268 31.7324H22.8245V34.6165H28.4766C30.5642 34.6165 32.4819 33.4423 33.4631 31.5616L38.7839 21.3811C39.4478 20.1072 39.7809 18.7088 39.7809 17.3085C39.7809 15.9082 39.4478 14.5102 38.7839 13.2358Z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <div className="flex flex-col gap-4">
              <div>
                <input
                  className="h-10 w-full rounded-md border bg-background px-3 py-2 text-sm placeholder: focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                  id="credential"
                  placeholder="Имэйл хаяг"
                  data-cy="credential"
                  data-testid="email-input"
                  name="credential"
                  value={credential}
                  onChange={(e) => setCredential(e.target.value)}
                />
                {error == '' ? (
                  ''
                ) : (
                  <h1 data-testid="error-message" className="pt-2 text-[12.8px] font-medium text-[#E11D48]" data-cy="Login-Page-Error-Message">
                    {error}
                  </h1>
                )}
              </div>
              <button
                data-testid="submit"
                onClick={() => {
                  handleSubmit();
                }}
                className="h-10 w-full rounded-md bg-primary text-primary-foreground hover:bg-primary/90"
                type="submit"
                data-cy="Login-Page-Button"
              >
                Үргэлжлүүлэх
              </button>
            </div>
          </div>
        ) : (
          <OtPpasswordcomp />
        )}
      </div>
    </div>
  );
};

export default Logincomp;
