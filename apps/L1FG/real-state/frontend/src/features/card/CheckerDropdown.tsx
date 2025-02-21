import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@radix-ui/react-select';

type Data = {
  id: number;
  value: string;
  title?: string;
};

type DropdownProps = {
  datas: Data[];

  setSelectedValue: (_value: string) => void;
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
      <SelectTrigger className="w-full flex justify-start p-2 border rounded-md bg-white">
        <SelectValue placeholder={placeholder}>{value}</SelectValue>
      </SelectTrigger>
      <SelectContent className="w-full flex justify-start p-2 border rounded-md bg-white">
        <SelectGroup className="w-full">
          {datas.map((data) => (
            <SelectItem className="w-[250px]" key={`${data.id}+${data.value}`} value={data.title ? data.title : data.value}>
              {data.value}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
