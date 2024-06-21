'use client';

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { MdOutlineAdd } from 'react-icons/md';
import { Stepper } from './Stepper';
import { useState } from 'react';
import { NextAndBackButton } from './NextAndBackButton';
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
        <Button data-testid="addEmployeeBtn" variant={'secondary'} className="bg-[#F7F7F8] text-[#121316] hover:bg-gray-200 duration-600 ease-in-out h-9 px-4 py-2 ">
          <MdOutlineAdd data-testid="add-icon" className="w-5 h-5" />
          Ажилтан нэмэх
        </Button>
      </DialogTrigger>
      <DialogContent data-testid="modalContent" className="flex gap-10 flex-col sm:max-w-[620px] px-8">
        <DialogHeader>
          <DialogTitle data-testid="title">Ажилтан нэмэх</DialogTitle>
          <DialogDescription>
            
          </DialogDescription>
        </DialogHeader>
        <Stepper currentStep={currentStep} steps={steps} />
        <DialogFooter></DialogFooter>
        <NextAndBackButton steps={steps} currentStep={currentStep} setCurrentStep={setCurrentStep} />
      </DialogContent>
    </Dialog>
  );
};
