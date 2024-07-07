import { Textarea } from './ui/textarea';

interface TextareaFieldPropsTypes {
  label: string;
  placeholder?: string;
  value: string;
  dataTestid: string;
  // eslint-disable-next-line no-unused-vars
  onChange: (newValue: string) => void;
}

export const TextareaField = ({ label, placeholder, value, onChange, dataTestid }: TextareaFieldPropsTypes) => {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={label} className="text-[16px] not-italic font-semibold leading-[20px] tracking-[-0.3px] cursor-pointer">
        {label}
      </label>
      <Textarea
        id={label}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        data-testid={dataTestid}
        className="w-[590px] h-[120px] max-h-[200px] bg-gray-50 border-gray-300"
        aria-label={label}
      />
    </div>
  );
};
