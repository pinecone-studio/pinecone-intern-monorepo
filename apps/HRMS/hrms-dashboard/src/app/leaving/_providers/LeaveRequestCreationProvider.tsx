'use client';

import { Dispatch, PropsWithChildren, SetStateAction, useContext, useEffect, useState } from 'react';
import { createContext } from 'react';
import { CreateLeaveRequestGeneralInput } from '../_features/CreateLeaveRequest/CreateLeaveRequestGeneralInput';
import { AuthContext } from '@/common/providers/AuthProvider';
import { parseCookies } from 'nookies';
import jwt from 'jsonwebtoken';

export type PayloadProp = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
};
export type Step1Props = {
  step1Date: string;
  step1UserName: string;
  step1LeaveType: string;
};
export type Step2DayOffProps = {
  step2LeaveLength: string;
  step2Date?: string | undefined;
  step2StartHour?: string | undefined;
  step2EndHour?: string | undefined;
  step2StartDate?: string | undefined;
  step2EndDate?: string | undefined;
};

export const LeaveRequestCreationContext = createContext<LeaveRequestCreationContextType>({} as LeaveRequestCreationContextType);

type LeaveRequestCreationContextType = {
  leaveReqStep: JSX.Element;
  setLeaveReqStep: Dispatch<SetStateAction<JSX.Element>>;
  stepNumber: number;
  setStepNumber: Dispatch<SetStateAction<number>>;
  isLeaveRequestSucceeded: boolean;
  setisLeaveRequestSucceeded: Dispatch<SetStateAction<boolean>>;
  radioValue: string;
  setRadioValue: Dispatch<SetStateAction<string>>;
  step1: Step1Props | undefined;
  setStep1: Dispatch<SetStateAction<Step1Props | undefined>>;
  step2: Step2DayOffProps | undefined;
  setStep2: Dispatch<SetStateAction<Step2DayOffProps | undefined>>;
  loggedUser: PayloadProp | undefined;
  setLoggedUser: Dispatch<SetStateAction<PayloadProp | undefined>>;
};

export const LeaveRequestCreationProvider = ({ children }: PropsWithChildren) => {
  const { isLoggedIn } = useContext(AuthContext);

  const [stepNumber, setStepNumber] = useState(0);
  const [leaveReqStep, setLeaveReqStep] = useState(<CreateLeaveRequestGeneralInput />);
  const [isLeaveRequestSucceeded, setisLeaveRequestSucceeded] = useState(false);
  const [radioValue, setRadioValue] = useState('Hour');
  const [step1, setStep1] = useState<Step1Props>();
  const [step2, setStep2] = useState<Step2DayOffProps>();
  const [loggedUser, setLoggedUser] = useState<PayloadProp | undefined>();

  useEffect(() => {
    const cookies = parseCookies();
    const token = cookies.token;
    const payload = jwt.decode(token) as PayloadProp;
    setLoggedUser(payload);
  }, [isLoggedIn]);

  return (
    <LeaveRequestCreationContext.Provider
      value={{
        leaveReqStep,
        setLeaveReqStep,
        stepNumber,
        setStepNumber,
        isLeaveRequestSucceeded,
        setisLeaveRequestSucceeded,
        radioValue,
        setRadioValue,
        step1,
        setStep1,
        step2,
        setStep2,
        loggedUser,
        setLoggedUser,
      }}
    >
      {children}
    </LeaveRequestCreationContext.Provider>
  );
};
