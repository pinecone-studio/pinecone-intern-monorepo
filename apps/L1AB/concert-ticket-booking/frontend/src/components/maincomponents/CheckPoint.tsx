'use client';

import { Container } from '@/components';
import { CheckCircle } from 'lucide-react';

interface CheckPointProps {
  footerText: string;
}

export const CheckPoint: React.FC<CheckPointProps> = ({ footerText }) => {
  return (
    <Container>
      <div className="text-amber-50 flex items-center justify-center h-[48rem]" data-cy="CheckPoint-Page">
        <div className="flex rounded-2xl border-slate-500 border-[1px] flex-col py-8 px-12 gap-6">
          <div className="flex justify-center items-center w-[100px] h-[100px] mx-auto">
            <CheckCircle className="text-[#00B7F4]" size={100} data-testid="CheckCircle" />
          </div>
          <div className="flex flex-col justify-center items-center self-stretch w-[327px]">
            <p className="text-[#A1A1AA] self-stretch text-center text-base leading-7 tracking-wide">{footerText}</p>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default CheckPoint;
