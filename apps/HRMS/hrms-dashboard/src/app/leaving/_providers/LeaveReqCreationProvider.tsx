'use client';

import { Dispatch, PropsWithChildren, SetStateAction, useState } from 'react';
import { createContext } from 'react';
import { CreateLeaveReqStep1 } from '../_components';

export const LeaveReqCreationContext = createContext<LeaveReqCreationContextType>({} as LeaveReqCreationContextType);

type LeaveReqCreationContextType = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  leaveReqStep: JSX.Element;
  setLeaveReqStep: Dispatch<SetStateAction<JSX.Element>>;
  stepNumber: number;
  setStepNumber: Dispatch<SetStateAction<number>>;
};

export const LeaveReqCreationProvider = ({ children }: PropsWithChildren) => {
  const [isOpen, setIsOpen] = useState(false);
  const [stepNumber, setStepNumber] = useState(0);
  const [leaveReqStep, setLeaveReqStep] = useState(<CreateLeaveReqStep1 />);

  return (
    <LeaveReqCreationContext.Provider
      value={{
        isOpen,
        setIsOpen,
        leaveReqStep,
        setLeaveReqStep,
        stepNumber,
        setStepNumber,
      }}
    >
      {children}
    </LeaveReqCreationContext.Provider>
  );
};
