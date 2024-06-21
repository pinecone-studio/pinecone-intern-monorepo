'use client';

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { MdOutlineAdd } from 'react-icons/md';
import { NextAndBack } from './modal/NextAndBack';
import { useState } from 'react';

export const AddModal = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const steps = [
    { title: 'Step 1', content: 'Хувийн мэдээлэл' },
    { title: 'Step 2', content: 'Хөдөлмөр эрхлэлтийн мэдээлэл' },
    { title: 'Step 3', content: 'Нэмэлт мэдээлэл' },
  ];
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button data-testid="addEmployeeBtn" variant="secondary">
          <MdOutlineAdd data-testid="add-icon" className="w-5 h-5" />
          Ажилтан нэмэх
        </Button>
      </DialogTrigger>
      <DialogContent data-testid="modalContent" className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle data-testid="title">Ажилтан нэмэх</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <NextAndBack steps={steps} currentStep={currentStep} setCurrentStep={setCurrentStep} />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
