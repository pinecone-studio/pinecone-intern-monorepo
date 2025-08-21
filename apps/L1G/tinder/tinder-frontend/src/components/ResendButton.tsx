import React from 'react';
import { Button } from '@/components/ui/button';
import { ApolloError } from '@apollo/client';

type ResendButtonProps = {
  timeLeft: number;
  onResend: () => Promise<void>;
  resending: boolean;
  resendError: ApolloError | undefined;
  message: string | null;
};

const TimerDisplay = ({ timeLeft }: { timeLeft: number }) => <p className="text-[14px] font-medium text-[#09090B] font-sans">Send again in {timeLeft}s</p>;

const ResendActionButton = ({ onResend, resending }: { onResend: () => Promise<void>; resending: boolean }) => (
  <Button type="button" onClick={onResend} disabled={resending} className="bg-transparent hover:bg-transparent text-[14px] font-medium text-blue-600 hover:underline font-sans">
    {resending ? 'Resending...' : 'Resend Code'}
  </Button>
);

const ResendMessage = ({ message, resendError }: { message: string | null; resendError: ApolloError | undefined }) => {
  if (!message) return null;

  const messageColorClass = resendError ? 'text-red-500' : 'text-green-600';

  return <p className={`text-[14px] font-medium ${messageColorClass} font-sans`}>{message}</p>;
};

const ResendError = ({ resendError }: { resendError: ApolloError | undefined }) => {
  if (!resendError) return null;

  return <p className="text-red-500 mt-1">{resendError.message}</p>;
};

export const ResendButton = ({ timeLeft, onResend, resending, resendError, message }: ResendButtonProps) => {
  const canResend = timeLeft <= 0;

  return (
    <div className="py-2 px-4 flex flex-col justify-center items-center gap-2">
      {canResend ? <ResendActionButton onResend={onResend} resending={resending} /> : <TimerDisplay timeLeft={timeLeft} />}

      <ResendMessage message={message} resendError={resendError} />
      <ResendError resendError={resendError} />
    </div>
  );
};
