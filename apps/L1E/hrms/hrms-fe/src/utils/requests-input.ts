import { RequestStatus } from "@/generated";

export type RequestsInput={
  date: Date;
  startTime: string;
  endTime: string;
  leadEmployeeId: string;
  requestStatus: RequestStatus;
  reason: string;
  employeeId: string;
}