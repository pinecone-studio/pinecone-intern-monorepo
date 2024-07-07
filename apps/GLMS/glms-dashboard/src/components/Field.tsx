import { Input } from './ui/input';

interface FieldProps {
  label: string;
  value: string;
  placeholder?: string;
  dataTestid: string;
  // eslint-disable-next-line no-unused-vars
  onChange: (newValue: string) => void;
}

export const Field = ({ label, value, onChange, placeholder, dataTestid }: FieldProps) => {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={label} className="text-[16px] not-italic font-semibold leading-[20px] tracking-[-0.3px] cursor-pointer">
        {label}
      </label>
      <Input
        id={label}
        name={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        data-testid={dataTestid}
        className="w-[590px] bg-gray-50 border-gray-300"
        aria-label={label}
      />
    </div>
  );
};
