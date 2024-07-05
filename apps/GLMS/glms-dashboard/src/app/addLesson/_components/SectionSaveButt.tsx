import React from 'react';
import { Button } from '@/components/ui/button';

interface SectionSaveButtProps {
  disabled: boolean;
}

export const SectionSaveButt: React.FC<SectionSaveButtProps> = ({ disabled }) => {
  return (
    <Button disabled={disabled} className={`bg-[#18BA51] h-[56px] w-[280px] ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#39c758] hover:!shadow-none'}`}>
      <p className="text-lg font-semibold tracking-[-0.3px]">Хадгалах</p>
    </Button>
  );
};
