import React, { useEffect, useRef, useState } from 'react';

type Props = {
  setStep: React.Dispatch<React.SetStateAction<number>>;
};

const SecondStep = ({ setStep }: Props) => {
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);
  const [timer, setTimer] = useState(15);
  const [canResend, setCanResend] = useState(false);
  const [code, setCode] = useState(['', '', '', '']);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const correctCode = '1234';

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const resendCode = () => {
    console.log('Code resent!');
    setTimer(15);
    setCanResend(false);
    setError('');
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;
    if (!/^\d?$/.test(value)) return;
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    setError('');
    if (value && index < inputsRef.current.length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
    const joined = newCode.join('');
    if (joined.length === 4 && !newCode.includes('')) {
      setIsLoading(true);
      setTimeout(() => {
        if (joined === correctCode) {
          setStep(3);
        } else {
          setError('Invalid code. Please try again.');
          setCode(['', '', '', '']);
          setTimeout(() => {
            inputsRef.current[0]?.focus();
          }, 50);
        }
        setIsLoading(false);
      }, 1000);
    }
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && !e.currentTarget.value && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };
  return (
    <div className="flex flex-col gap-[24px]">
      <div className="flex flex-col gap-[4px] py-[8px] text-[24px] items-center justify-center">
        <p className="font-semibold text-[#09090B]">Confirm email</p>
        <p className="text-[#71717A] text-[14px] text-center w-[322px] h-[60px]">To continue, enter the secure code we sent to n.shagai@nest.mn. Check junk mail if it’s not in your inbox.</p>
      </div>
      <div className="flex flex-col gap-[16px] items-center justify-center">
        <form autoComplete="one-time-code" className="flex">
          {[0, 1, 2, 3].map((_, index) => (
            <input
              key={index}
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength={1}
              className={`w-11 h-12 text-center border-2 border-[#E4E4E7] text-lg outline-none 
                 ${index === 0 ? 'rounded-l-md' : ''} 
                 ${index === 3 ? 'rounded-r-md' : ''}
                 ${index !== 3 ? 'border-r-0' : ''}`}
              value={code[index]}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              ref={(el) => {
                inputsRef.current[index] = el;
              }}
              disabled={isLoading}
            />
          ))}
        </form>
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        <button className="text-[16px] font-medium disabled:opacity-70" onClick={resendCode} disabled={!canResend || isLoading}>
          {canResend ? 'Send again' : `Send again (${timer})`}
        </button>
        {isLoading && (
          <div role="status" className="flex items-center gap-2 mt-2 text-black text-sm">
            <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SecondStep;
