'use client';

import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dispatch, SetStateAction } from 'react';
interface StatusSelectorProp {
  id: string;
  name: string;
  count: number;
  selected: boolean;
}
interface StatusSelectorProps {
  handleStatusClick: (_id: string) => void;
  selectedStatuses: StatusSelectorProp[];
  statuses: StatusSelectorProp[];
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}
const StatusSelector = ({ handleStatusClick, isOpen, setIsOpen, selectedStatuses, statuses }: StatusSelectorProps) => {
  return (
    <div className="w-full max-w-md p-4  ">
      <div className="flex gap-2  ">
        <Button
          variant="ghost"
          data-testid="btn"
          className="text-md w-[98px] bg-white h-[40px] border rounded-lg "
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          <span className="w-5 h-5 border rounded-full flex justify-center items-center text-sm pb-[2px]">+</span>
          <span className="ml-2">Төлөв</span>
        </Button>
        {selectedStatuses.map((status) => (
          <Button data-testid={status.name} key={status.id} variant="secondary" className="text-base bg-white h-[40px]">
            {status.name}
          </Button>
        ))}
      </div>

      <Card className={`${isOpen ? 'p-2 absolute' : 'hidden'}`}>
        <div className="space-y-2">
          {statuses.map((status, index) => (
            <button
              key={status.id}
              data-testid={`${index}`}
              onClick={() => handleStatusClick(status.id)}
              className="w-full flex items-center bg-white justify-between p-2 rounded-lg hover:bg-secondary"
            >
              <div className="flex items-center gap-3">
                <div className={`w-6 h-6 rounded-md flex items-center justify-center ${status.selected ? 'bg-primary' : 'border border-input'}`}>
                  {status.selected && <Check className="w-4 h-4 text-primary-foreground" />}
                </div>
                <span className="text-lg">{status.name}</span>
              </div>
              <span className="text-lg">{status.count}</span>
            </button>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default StatusSelector;
