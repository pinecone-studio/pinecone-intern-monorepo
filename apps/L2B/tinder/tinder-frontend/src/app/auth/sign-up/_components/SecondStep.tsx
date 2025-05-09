// SecondStep.tsx

import React, { Dispatch, SetStateAction } from 'react';

type Props = {
  setStep: Dispatch<SetStateAction<number>>;
};

const SecondStep = ({ setStep }: Props) => {
  return (
    <div className="flex flex-col mt-6 w-full">
      <p>2step</p>
      <button onClick={() => setStep(3)}>next step</button>
    </div>
  );
};

export default SecondStep;
