import React, { Dispatch, SetStateAction } from 'react';
type Props = {
  setStep: Dispatch<SetStateAction<number>>;
};
const SecondStep = ({ setStep }: Props) => {
  return (
    <div>
      <button onClick={() => setStep(3)}>next step</button>
    </div>
  );
};

export default SecondStep;
