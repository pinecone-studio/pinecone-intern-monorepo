'use client';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import RequestcomTime1 from './RequestFormtime';
import { useState } from 'react';
import { values } from 'lodash';
import RequestcomDay1 from './RequestFormcom1';

const Requestcom = () => {
  const [timepicker, setTimepicker] = useState('hour');
  console.log(timepicker);

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
          <div className="flex items-center">
            <RadioGroupItem
              onClick={() => {
                setTimepicker('hour');
              }}
              value="hour"
              id="hour"
            />
            <Label className="text-sm cursor-pointer pl-2 " htmlFor="hour">
              Цагаар
            </Label>
          </div>
          <div className="flex items-center ">
            <RadioGroupItem
              onClick={() => {
                setTimepicker('day');
              }}
              value="day"
              id="day"
            />
            <Label className="text-sm cursor-pointer pl-2 " htmlFor="day">
              Өдрөөр
            </Label>
          </div>
        </div>
      </RadioGroup>
      {timepicker === 'hour' ? <RequestcomTime1 /> : <RequestcomDay1 />}
    </div>
  );
};
export default Requestcom;
