import { Button } from '@/components/ui/button';
import React from 'react';

const FourthStep = ({ setStep }: { setStep: (_step: number) => void }) => {
  return (
    <div>
      <p>4step</p>
      <Button onClick={() => setStep(4)}>next step</Button>
    </div>
  );
};

export default FourthStep;
