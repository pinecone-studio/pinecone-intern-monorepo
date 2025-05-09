import React, { Dispatch, SetStateAction } from 'react';
type Props = {
  setStep: Dispatch<SetStateAction<number>>;
};
const SecondStep = ({ setStep }: Props) => {
  return <div>SecondStep</div>;
};

export default SecondStep;
