'use client';
import * as React from 'react';
import { useRouter } from 'next/navigation';
type ProfileButtonProps = {
  text: string;
};

export const RecruitingButton = ({ text }: ProfileButtonProps) => {
  const router = useRouter();
  return <button onClick={() => router.push('/recruiting/jobrecruit')}>{text}</button>;
};
