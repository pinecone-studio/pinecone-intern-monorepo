import { Button } from '@/components/ui/button';
import React from 'react';

const SecondStep = ({ setStep }: { setStep: (_step: number) => void }) => {
  return (
    <div>
      <p>2step</p>
      <Button onClick={() => setStep(2)}>next step</Button>
    </div>
  );
};

export default SecondStep;
