'use client';

import { Dispatch, PropsWithChildren, SetStateAction, useState } from 'react';
import { createContext } from 'react';
import { CreateLeaveRequestGeneralInput } from '../_components';

export const LeaveRequestCreationContext = createContext<LeaveRequestCreationContextType>({} as LeaveRequestCreationContextType);

type LeaveRequestCreationContextType = {
  leaveReqStep: JSX.Element;
  setLeaveReqStep: Dispatch<SetStateAction<JSX.Element>>;
  stepNumber: number;
  setStepNumber: Dispatch<SetStateAction<number>>;
  isLeaveRequestSucceeded: boolean;
  setisLeaveRequestSucceeded: Dispatch<SetStateAction<boolean>>;
};

export const LeaveRequestCreationProvider = ({ children }: PropsWithChildren) => {
  const [stepNumber, setStepNumber] = useState(0);
  const [leaveReqStep, setLeaveReqStep] = useState(<CreateLeaveRequestGeneralInput />);
  const [isLeaveRequestSucceeded, setisLeaveRequestSucceeded] = useState(false);

  return (
    <LeaveRequestCreationContext.Provider
      value={{
        leaveReqStep,
        setLeaveReqStep,
        stepNumber,
        setStepNumber,
        isLeaveRequestSucceeded,
        setisLeaveRequestSucceeded,
      }}
    >
      {children}
    </LeaveRequestCreationContext.Provider>
  );
};
