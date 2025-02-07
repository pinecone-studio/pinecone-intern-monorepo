import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@radix-ui/react-select';

type Data = {
  id: number;
  value: string;
};

type DropdownProps = {
  datas: Data[];
  /* eslint-disable */
  setSelectedValue: (value: string) => void;
  placeholder: string;
  value: string | null;
};

export const Dropdown = ({ datas, setSelectedValue, placeholder, value }: DropdownProps) => {
  return (
    <Select
      value={value || ''}
      onValueChange={(selectedValue) => {
        setSelectedValue(selectedValue);
      }}
    >
      <SelectTrigger className="w-[180px] flex justify-start p-2 border rounded-md bg-white">
        <SelectValue placeholder={placeholder}>{value}</SelectValue>
      </SelectTrigger>
      <SelectContent className="w-[180px] flex justify-start p-2 border rounded-md bg-white">
        <SelectGroup>
          {datas.map((data) => (
            <SelectItem key={`${data.id}+${data.value} `} value={data.value}>
              {data.value}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
