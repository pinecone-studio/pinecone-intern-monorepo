import { DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import React, { FC } from 'react';

type FieldInfo = {
  title: string;
  value: string;
};

interface EmploymentInfoDialogProps {
  infoFields: FieldInfo[];
}

export const EmploymentInfoDialog: FC<EmploymentInfoDialogProps> = ({ infoFields }) => {
  return (
    <>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Хөдөлмөр эрхлэлтийн мэдээлэл</DialogTitle>
        </DialogHeader>
        <div className="  grid gap-4 py-4">
          {infoFields.map((value, index) => (
            <div key={index} className="items-center gap-4">
              <Label htmlFor={value.title} className="text-left">
                {value.title}
              </Label>
              <Input id={value.value} defaultValue={value.value} className="col-span-3 mt-2" />
            </div>
          ))}
        </div>
        <DialogFooter>
          <Button type="button" className="bg-white border-gray-500 text-black">
            Цуцлах
          </Button>
          <Button type="submit">Хадгалах</Button>
        </DialogFooter>
      </DialogContent>
    </>
  );
};
