'use client';

import { Dispatch, PropsWithChildren, SetStateAction, useEffect, useState } from 'react';
import { createContext } from 'react';
import { parseCookies } from 'nookies';
import jwt from 'jsonwebtoken';
import { CreateLeaveRequestGeneralInput } from '../_features/CreateLeaveRequestSteps/CreateLeaveRequestGeneralInput';

type LeaveRequestCreationContextType = {
  leaveReqStep: JSX.Element;
  setLeaveReqStep: Dispatch<SetStateAction<JSX.Element>>;
  stepNumber: number;
  setStepNumber: Dispatch<SetStateAction<number>>;
  isLeaveRequestSucceeded: boolean;
  setisLeaveRequestSucceeded: Dispatch<SetStateAction<boolean>>;
  refresh: number;
  setRefresh: Dispatch<SetStateAction<number>>;
  loggedUser: PayloadProps | undefined;
  setLoggedUser: Dispatch<SetStateAction<PayloadProps | undefined>>;
  radioValue: string;
  setRadioValue: Dispatch<SetStateAction<string>>;
  step1: Step1Props | undefined;
  setStep1: Dispatch<SetStateAction<Step1Props | undefined>>;
  step2: Step2DayOffProps | undefined;
  setStep2: Dispatch<SetStateAction<Step2DayOffProps | undefined>>;
};

export const LeaveRequestCreationContext = createContext<LeaveRequestCreationContextType>({} as LeaveRequestCreationContextType);

export type PayloadProps = {
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

export const LeaveRequestCreationProvider = ({ children }: PropsWithChildren) => {
  const [stepNumber, setStepNumber] = useState(0);
  const [leaveReqStep, setLeaveReqStep] = useState(<CreateLeaveRequestGeneralInput />);
  const [isLeaveRequestSucceeded, setisLeaveRequestSucceeded] = useState(false);
  const [loggedUser, setLoggedUser] = useState<PayloadProps>();
  const [refresh, setRefresh] = useState(0);

  const [radioValue, setRadioValue] = useState('Hour');
  const [step1, setStep1] = useState<Step1Props>();
  const [step2, setStep2] = useState<Step2DayOffProps>();

  useEffect(() => {
    const cookies = parseCookies();
    const token = cookies.token;
    const payload = jwt.decode(token) as PayloadProps;
    setLoggedUser(payload);
  }, []);

  // const handleCreateBook = async () => {
  //   await createBook({
  //     variables: {
  //       title,
  //       authorId,
  //     },
  //   });

  //   await refetch();

  //   setTitle('');
  //   setAuthorId('');

  //   handleModalClose();
  // };

  // const refreshAuthors = async () => {
  //   await authorsRefetch({});
  // };

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
        loggedUser,
        setLoggedUser,
        radioValue,
        setRadioValue,
        step1,
        setStep1,
        step2,
        setStep2,
      }}
    >
      {children}
    </LeaveRequestCreationContext.Provider>
  );
};
