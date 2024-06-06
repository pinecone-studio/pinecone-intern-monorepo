'use client';
import { useEffect, useState } from 'react';

export const Timer = () => {
  const [time, setTime] = useState(30);

  const nextClick = () => {
    setTime(30);
  };
  useEffect(() => {
    const timer = setInterval(() => {
      setTime((time) => {
        if (time === 0) {
          clearInterval(timer);

          return 0;
        } else return time - 1;
      });
    }, 1000);
  }, []);
  return (
    <main className="bg-white flex justify-center items-center py-5 lg:py-8">
      <div className="flex justify-center items-center w-3/4 lg:w-[1216px]">
        <div className="w-16 h-16 border-4 border-yellow-200 rounded-full flex items-center justify-center">{time}</div>
        <button onClick={nextClick} className="ml-16 w-[100px] h-[50px] text-white bg-[#0000FF]">
          Next
        </button>
      </div>
    </main>
  );
};
