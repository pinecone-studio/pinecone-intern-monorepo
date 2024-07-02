import { Input } from '@/components/ui/input';
import { ComboboxDemo } from './Combobox';
import { ComboboxDemo2 } from './Combobox2';

export const Search = () => {
  return (
    <div className="pl-6 py-8 pr-11 flex gap-3 ">
      <Input  className="w-[302px]" type="email" placeholder="Хайх" />
      <ComboboxDemo />
      <ComboboxDemo2 />
    </div>
  );
};
