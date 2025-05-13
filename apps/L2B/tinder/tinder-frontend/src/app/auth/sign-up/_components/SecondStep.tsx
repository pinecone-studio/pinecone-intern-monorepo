import React, { Dispatch, SetStateAction } from 'react';

type Props = {
  setStep: Dispatch<SetStateAction<number>>;
};

const SecondStep = ({ setStep }: Props) => {
  return (
    <div className="flex flex-col gap-[24px]">
      <div className="flex flex-col gap-[4px] py-[8px] text-[24px] items-center justify-center">
        <p className="font-semibold text-[#09090B]">Confirm email</p>
        <p className="text-[#71717A] text-[14px] text-center w-[322px] h-[60px]">To continue, enter the secure code we sent to n.shagai@nest.mn. Check junk mail if it’s not in your inbox.</p>
      </div>

      <div className=" flex flex-col gap-[16px] items-center justify-center">
        <div className="w-[157px] h-[40px] border rounded-md border-[#E4E4E7] flex items-center justify-center">ASD</div>
        <button className="font-medium text-[#09090B] w-[169px] h-[36px] py-[8px] px-[32px] flex flex-col justify-center" onClick={() => setStep(3)}>
          next step
        </button>
      </div>
    </div>
  );
};

export default SecondStep;
