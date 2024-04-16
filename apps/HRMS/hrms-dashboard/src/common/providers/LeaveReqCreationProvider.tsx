'use client';

import { Dispatch, PropsWithChildren, SetStateAction, useState } from 'react';
import { createContext } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { CreateLeaveReqStep1 } from '../../app/leaving/_components';

export const LeaveReqCreationContext = createContext<LeaveReqCreationContextType>({} as LeaveReqCreationContextType);

type LeaveReqCreationContextType = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  leaveReqStep: JSX.Element;
  setLeaveReqStep: Dispatch<SetStateAction<JSX.Element>>;
  stepNo: number;
  setStepNo: Dispatch<SetStateAction<number>>;
  date: dayjs.Dayjs | null;
  setDate: Dispatch<SetStateAction<dayjs.Dayjs | null>>;
  userName: string;
  setUserName: Dispatch<SetStateAction<string>>;
  leaveReason: string;
  setLeaveReason: Dispatch<SetStateAction<string>>;
  leaveLength: string;
  setLeaveLength: Dispatch<SetStateAction<string>>;
  startDate: string;
  setStartDate: Dispatch<SetStateAction<string>>;
  startTime: string;
  setStartTime: Dispatch<SetStateAction<string>>;
  subs: string;
  setSubs: Dispatch<SetStateAction<string>>;
  workBrief: string;
  setWorkBrief: Dispatch<SetStateAction<string>>;
  byApproved: string;
  setByApproved: Dispatch<SetStateAction<string>>;
  isSucceeded: boolean;
  setIsSucceeded: Dispatch<SetStateAction<boolean>>;
  refresh: number;
  setRefresh: Dispatch<SetStateAction<number>>;
};

export const LeaveReqCreationProvider = ({ children }: PropsWithChildren) => {
  const [isOpen, setIsOpen] = useState(false);
  const [stepNo, setStepNo] = useState(0);
  const [leaveReqStep, setLeaveReqStep] = useState(<CreateLeaveReqStep1 />);
  const [date, setDate] = useState<Dayjs | null>(dayjs(new Date()));
  const [userName, setUserName] = useState('');
  const [leaveReason, setLeaveReason] = useState('');
  const [leaveLength, setLeaveLength] = useState('');
  const [startDate, setStartDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [subs, setSubs] = useState('');
  const [workBrief, setWorkBrief] = useState('');
  const [byApproved, setByApproved] = useState('');
  const [isSucceeded, setIsSucceeded] = useState(false);
  const [refresh, setRefresh] = useState(0);

  return (
    <LeaveReqCreationContext.Provider
      value={{
        isOpen,
        setIsOpen,
        leaveReqStep,
        setLeaveReqStep,
        stepNo,
        setStepNo,
        date,
        setDate,
        userName,
        setUserName,
        leaveReason,
        setLeaveReason,
        leaveLength,
        setLeaveLength,
        startDate,
        setStartDate,
        startTime,
        setStartTime,
        subs,
        setSubs,
        workBrief,
        setWorkBrief,
        byApproved,
        setByApproved,
        isSucceeded,
        setIsSucceeded,
        refresh,
        setRefresh,
      }}
    >
      {children}
    </LeaveReqCreationContext.Provider>
  );
};
