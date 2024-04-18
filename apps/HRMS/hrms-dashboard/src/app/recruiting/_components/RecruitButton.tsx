'use client';
import { useRouter } from 'next/navigation';
import * as React from 'react';

type ProfileButtonProps = {
  text: string;
};

export const RecruitingButton = ({ text }: ProfileButtonProps) => {
  const router = useRouter();
  return <button onClick={() => router.push('/recruiting/jobDash')}>{text}</button>;
};
