'use client';

import { Dispatch, PropsWithChildren, SetStateAction, useState } from 'react';
import { createContext } from 'react';
import { CreateLeaveRequestGeneralInput } from '../_components';
import { parseCookies } from 'nookies';
import jwt from 'jsonwebtoken';

export const LeaveRequestCreationContext = createContext<LeaveRequestCreationContextType>({} as LeaveRequestCreationContextType);

export type PayloadProps = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
};

type LeaveRequestCreationContextType = {
  leaveReqStep: JSX.Element;
  setLeaveReqStep: Dispatch<SetStateAction<JSX.Element>>;
  stepNumber: number;
  setStepNumber: Dispatch<SetStateAction<number>>;
  isLeaveRequestSucceeded: boolean;
  setisLeaveRequestSucceeded: Dispatch<SetStateAction<boolean>>;
  refresh: number;
  setRefresh: Dispatch<SetStateAction<number>>;
  payload: string | jwt.JwtPayload | null;
};

export const LeaveRequestCreationProvider = ({ children }: PropsWithChildren) => {
  const [stepNumber, setStepNumber] = useState(0);
  const [leaveReqStep, setLeaveReqStep] = useState(<CreateLeaveRequestGeneralInput />);
  const [isLeaveRequestSucceeded, setisLeaveRequestSucceeded] = useState(false);
  const [refresh, setRefresh] = useState(0);

  const cookies = parseCookies();
  const payload = jwt.decode(cookies.token);

  return (
    <LeaveRequestCreationContext.Provider
      value={{
        leaveReqStep,
        setLeaveReqStep,
        stepNumber,
        setStepNumber,
        isLeaveRequestSucceeded,
        setisLeaveRequestSucceeded,
        refresh,
        setRefresh,
        payload,
      }}
    >
      {children}
    </LeaveRequestCreationContext.Provider>
  );
};
