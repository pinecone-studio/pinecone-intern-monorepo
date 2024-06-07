import { Dispatch, SetStateAction } from 'react';

type PropsType = {
  setPage: Dispatch<SetStateAction<number | undefined>>;
  checked: number;
  defaultValue: string;
};
export const MonthlySalary = ({ setPage, checked, defaultValue }: PropsType) => {
  return <div>sar buriin tsalingiin medeelel hiiged maplah</div>;
};
