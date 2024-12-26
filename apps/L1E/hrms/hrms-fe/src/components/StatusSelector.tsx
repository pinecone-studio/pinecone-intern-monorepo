'use client';

import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useState } from 'react';

interface StatusSelectorProps {
  id: string;
  name: string;
  count: number;
  selected: boolean;
}

const StatusSelector = () => {
  const [statuses, setStatuses] = useState<StatusSelectorProps[]>([
    { id: 'confirmed', name: 'Баталгаажсан', count: 21, selected: true },
    { id: 'pending', name: 'Хүлээгдэж байна', count: 21, selected: true },
    { id: 'rejected', name: 'Татгалзсан', count: 20, selected: false },
  ]);

  const handleStatusClick = (id: string) => {
    setStatuses((prevStatuses) => prevStatuses.map((status) => (status.id === id ? { ...status, selected: !status.selected } : status)));
  };

  const selectedStatuses = statuses.filter((status) => status.selected);

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full max-w-md p-4  ">
      <div className="flex flex-wrap gap-2  ">
        <Button variant="ghost" className="text-md w-[98px] h-[40px] border rounded-lg " onClick={() => setIsOpen((prev) => !prev)}>
          <span className="w-5 h-5 border rounded-full flex justify-center items-center text-sm pb-[2px]">+</span>
          <span className="ml-2">Төлөв</span>
        </Button>

        {selectedStatuses.map((status) => (
          <Button data-testid={status.name} key={status.id} variant="secondary" className="text-lg">
            {status.name}
          </Button>
        ))}
      </div>

      <Card className={`${isOpen ? 'p-2' : 'hidden'}`}>
        <div className="space-y-2">
          {statuses.map((status) => (
            <button key={status.id} onClick={() => handleStatusClick(status.id)} className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-secondary">
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
