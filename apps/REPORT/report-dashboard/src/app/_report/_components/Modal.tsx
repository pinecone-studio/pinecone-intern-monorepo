'use client';

import * as React from 'react';
import { cn } from '../../../lib/utils';
import { addDays, format } from 'date-fns';
import { mn } from 'date-fns/locale';
import { CalendarIcon, ArrowRight } from 'lucide-react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../../../shadcn/Dialog';
import { Popover, PopoverContent, PopoverTrigger } from '../../../shadcn/Popover';
import { Button } from '../../../shadcn/Button';
import { Calendar } from '../../../shadcn/Calendar';
import { Checkbox } from '../../../shadcn/Checkbox';
import { CheckedState } from '@radix-ui/react-checkbox';
import { Stepper } from '../../_student/_components/Stepper';

interface Day {
  date: string;
  checked: boolean;
}

function capitalizeDayName(fullDateString: string) {
  const parts = fullDateString.split(' ');
  parts[parts.length - 1] = parts[parts.length - 1].charAt(0).toUpperCase() + parts[parts.length - 1].slice(1);
  return parts.join(' ');
}

export const Modal = () => {
  const [date, setDate] = React.useState<Date | undefined>(undefined);
  const [step, setStep] = React.useState<string>('Date');
  const [nextDays, setNextDays] = React.useState<{ date: string; checked: boolean }[]>([]);
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (date) {
      setNextDays(calculateNextDays(date));
    }
  }, [date]);

  const calculateNextDays = (currentDate: Date) => {
    return Array.from({ length: 7 }, (_, index) => {
      const nextDay = addDays(currentDate, index);
      const formattedDate = format(nextDay, "M 'Сарын' dd EEEE", {
        locale: mn,
      });
      return {
        date: capitalizeDayName(formattedDate),
        checked: false,
      };
    });
  };

  const handleCheckboxChange = (index: number, checked: CheckedState) => {
    const isChecked = typeof checked === 'boolean' ? checked : false;
    setNextDays(updateCheckedDays(nextDays, index, isChecked));
  };

  const updateCheckedDays = (days: Day[], index: number, checked: boolean) => {
    return days.map((day, idx) => (idx === index ? { ...day, checked: checked === true } : day));
  };

  const handleContinue = () => {
    if (date) {
      setStep('Next7Days');
    }
  };

  const sendCheckedDays = () => {
    const checkedDays = nextDays.filter((day) => day.checked).map((day) => day.date);
    if (checkedDays.length > 0) {
      console.log('Sending these days:', checkedDays);
    } else {
      console.log('No days selected yet.');
    }
  };

  const handleDialogClose = (open: boolean) => {
    setIsOpen(open);
    if (!open) resetDialog();
  };

  const resetDialog = () => {
    setDate(undefined);
    setStep('Date');
    setNextDays([]);
  };

  const renderDateSelector = () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant={'outline'} className={cn('justify-between border-[#D6D8DB] bg-[#F7F7F8] text-left font-normal', !date && 'text-muted-foreground')} data-testid="date-picker-button">
          {date ? capitalizeDayName(format(date, "M 'Сарын' dd EEEE", { locale: mn })) : <span>Pick a date</span>}
          <CalendarIcon className="mr-2 h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" data-testid="calendar">
        <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
      </PopoverContent>
    </Popover>
  );

  const renderNextDays = () =>
    nextDays.map((day, index) => (
      <li key={index} className="flex items-center gap-2 py-3">
        <Checkbox
          id={`checkbox-${index}`}
          checked={day.checked}
          onCheckedChange={(checked) => handleCheckboxChange(index, checked)}
          aria-label={`Select ${day.date}`}
          data-testid={`checkbox-${index}`}
        />
        <label htmlFor={`checkbox-${index}`}>{day.date}</label>
      </li>
    ));

  return (
    <Dialog open={isOpen} onOpenChange={handleDialogClose}>
      <DialogTrigger asChild data-testid="trigger-button">
        <Button>Create Report</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]" data-testid="dialog-content">
        <DialogHeader>
          <DialogTitle>Create Report</DialogTitle>
          <Stepper currentStep={0} numberOfSteps={3} />
        </DialogHeader>
        {renderDateSelector()}
        {step === 'Next7Days' && (
          <div>
            <div className="mb-4">Хичээлийн өдөр сонгох:</div>
            <ul data-testid="next-7-days">{renderNextDays()}</ul>
          </div>
        )}
        <DialogFooter className="mt-10">
          {step === 'Date' && (
            <Button type="submit" onClick={handleContinue} disabled={!date} data-testid="continue-button">
              Хадгалах
            </Button>
          )}
          {step === 'Next7Days' && (
            <Button onClick={sendCheckedDays} disabled={nextDays.every((day) => !day.checked)} data-testid="send-report-button" className="flex gap-1">
              Үргэлжлүүлэх
              <ArrowRight className="" />
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
