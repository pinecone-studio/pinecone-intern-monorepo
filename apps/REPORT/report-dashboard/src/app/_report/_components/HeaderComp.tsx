import { Button } from '../../../shadcn/Button';
import { format } from '../../../shadcn/DatePicker';
import { cn } from '../../../lib/utils';
import { PopoverContent, PopoverTrigger, Popover } from '../../../shadcn/Popover';
import { Calendar } from '../../../shadcn/Calendar';
import * as React from 'react';
import { DateRange } from 'react-day-picker';
import { Arrow } from '../icons';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from '../../../shadcn/Dialog';

export const HeaderComp = () => {
  const [date, setDate] = React.useState<DateRange | undefined>(undefined);
  const [isDialogOpen, setIsDialogOpen] = React.useState<boolean>(false);

  const handleGenerateReport = () => {
    setIsDialogOpen(true);
  };

  return (
    <div className="flex items-center gap-[48px]">
      <div>
        <p className="text-[#121316] text-[36px] font-bold leading-[44px] tracking-tighter px-[3px]">Репорт</p>
      </div>
      <div className={cn('grid gap-2 w-[827px]')}>
        <Popover>
          <PopoverTrigger asChild>
            <Button id="date" variant="outline" className={cn('px-2 py-[23px] w-[220px] justify-between text-left font-normal text-xs text-black', !date && 'text-muted-foreground')}>
              {date?.from ? (
                date.to ? (
                  <>
                    {format(date.from, 'LLL dd, y')} - {format(date.to, 'LLL dd, y')}
                  </>
                ) : (
                  format(date.from, 'LLL dd, y')
                )
              ) : (
                <span className="w-[160px] text-base font-normal text-black">7 хоног сонгох</span>
              )}
              <Arrow />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={date?.from}
              selected={date}
              onSelect={(range) => {
                setDate(range);
                console.log('Range selected:', range);
              }}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>
      </div>
      <div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleGenerateReport} className="w-[151px] py-[24px]">
              <p>Репорт үүсгэх</p>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Репорт үүсгэх</DialogTitle>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};
