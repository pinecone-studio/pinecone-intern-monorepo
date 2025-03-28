'use client';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import RequestcomDay1 from './RequestFormcom1';
import RequestcomTime1 from './RequestFormtime';
import { Dispatch, SetStateAction } from 'react';
import { Employee } from '@/generated';
import { RequestsInput } from '@/utils/requests-input';
interface RequestcomPaidProps {
  leads: Employee[];
  setDay: Dispatch<SetStateAction<boolean>>;
  day: boolean;
  employee: Employee;
  isOpen: boolean;
  onSubmit: (_data: RequestsInput) => Promise<void>;
}
const Requestcom = ({ leads, setDay, day, employee, isOpen, onSubmit }: RequestcomPaidProps) => {
  return (
    <div className="space-y2">
      <div className="gap-2">
        <Label className="text-sm">Төрөл*</Label>
        <p className="text-xs text-muted-foreground mb-2">
          Хэрэв та ажлын 1 өдөрт багтаан 8 цагаас доош чөлөө авах бол <span className="font-medium text-black">цагаар</span>, 8 цагаас илүү бол <span className="font-medium text-black">өдрөөр </span>
          гэдгийг сонгоно уу.
        </p>
      </div>
      <RadioGroup defaultValue="hour">
        <div className="flex mt-2 gap-4">
          <div
            data-testid="time-btn"
            onClick={() => {
              setDay(false);
            }}
            className="flex items-center"
          >
            <RadioGroupItem value="hour" id="hour" />
            <Label className="text-sm cursor-pointer pl-2 " htmlFor="hour">
              Цагаар
            </Label>
          </div>
          <div
            data-testid="day-btn"
            onClick={() => {
              setDay(true);
            }}
            className="flex items-center "
          >
            <RadioGroupItem value="day" id="day" />
            <Label className="text-sm cursor-pointer pl-2 " htmlFor="day">
              Өдрөөр
            </Label>
          </div>
        </div>
      </RadioGroup>
      {day ? <RequestcomDay1 leads={leads} employee={employee} isOpen={isOpen} onSubmit={onSubmit} /> : <RequestcomTime1 leads={leads} employee={employee} isOpen={isOpen} onSubmit={onSubmit} />}
    </div>
  );
};
export default Requestcom;
