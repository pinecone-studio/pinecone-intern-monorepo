import * as React from 'react';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const frameworks = [{ label: '2024 оон 11 сарын 13 өдөр' }, { label: '2024 он 11 сарын 14 өдөр' }, { label: '2024 он 11 сарын 15 өдөр' }];

const SelectDemo = () => {
  const [selectedDate, setSelectedDate] = React.useState('');

  return (
    <Select value={selectedDate} onValueChange={setSelectedDate}>
      <SelectTrigger className="w-full bg-[#1F1F1F] text-white" data-testid="select-trigger">
        <SelectValue className="text-white" placeholder="Өдөр сонгох" data-testid="select-value" />
      </SelectTrigger>
      <SelectContent className="bg-[#1F1F1F]">
        <SelectGroup className="text-white">
          {frameworks.map((framework) => (
            <SelectItem key={framework.label} value={framework.label} data-testid={`select-item-${framework.label}`}>
              {framework.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
export default SelectDemo;
