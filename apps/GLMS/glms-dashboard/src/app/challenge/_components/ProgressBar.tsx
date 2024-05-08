'use client';
import { useState } from 'react';

const ProgressBar = () => {
  const [oneProgressValue] = useState<number>(25);
  const [progressValue, setProgressValue] = useState<number>(0);
  const handleProgressValue = () => {
    if (progressValue !== 100) {
      setProgressValue((prev) => prev + oneProgressValue);
    }
  };
  return (
    <>
      <div data-testid="progress-bar" className="rounded-full w-full h-[8px] bg-[#ECEDF0] relative">
        <span data-testid="progress" style={{ width: `${progressValue}%` }} className="absolute left-0 top-0 bg-[#18BA51] rounded-full h-full"></span>
      </div>
      <button onClick={handleProgressValue} className="btn">
        Test Button
      </button>
    </>
  );
};

export default ProgressBar;
