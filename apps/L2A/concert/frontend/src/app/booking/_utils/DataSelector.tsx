import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { FC } from 'react';

export const DateSelector: FC<{ dates: string[]; selected?: string; onChange: (_day: string) => void }> = ({ dates, selected, onChange }) => {
  return (
    <Select value={selected} onValueChange={onChange} aria-label="Select event date">
      <SelectTrigger className="w-full bg-zinc-800 text-white border border-zinc-700 rounded-lg py-3 px-4">
        <SelectValue placeholder="Тоглолтын өдрийг сонгоно уу" />
      </SelectTrigger>
      <SelectContent className="bg-zinc-800 text-white border border-zinc-700 rounded-lg">
        {dates.map((d) => (
          <SelectItem key={d} value={d} className="py-2 px-4 hover:bg-zinc-700">
            {d}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
