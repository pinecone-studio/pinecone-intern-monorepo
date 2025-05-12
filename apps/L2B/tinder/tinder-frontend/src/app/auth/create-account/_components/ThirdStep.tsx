import { Button } from '@/components/ui/button';
import React from 'react';

const ThirdStep = ({ setStep }: { setStep: (_step: number) => void }) => {
  return (
    <div>
      <p>3step</p>
      <Button onClick={() => setStep(3)}>next step</Button>
    </div>
  );
};

export default ThirdStep;
