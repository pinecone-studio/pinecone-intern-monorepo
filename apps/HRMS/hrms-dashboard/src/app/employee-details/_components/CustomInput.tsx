import { ChangeEventHandler, FocusEventHandler, PropsWithChildren } from 'react';
type CustomInputProps = {
  label: string;
  type: string;
  placeholder?: string;
  name: string;
  value: string | number;
  error?: boolean;
  helperText?: string;
  onChange?: ChangeEventHandler<HTMLInputElement> & ChangeEventHandler<HTMLSelectElement>;
  onBlur?: FocusEventHandler<HTMLInputElement> & FocusEventHandler<HTMLSelectElement>;
};
export const CustomInput = (props: CustomInputProps & PropsWithChildren) => {
  const { label, type, placeholder, name, value, children, helperText, onChange, onBlur } = props;
  return (
    <div data-testid="customInput" className="flex flex-col w-full justify-center gap-1">
      <p data-testid="label" className="text-base font-normal text-main">
        {label}
      </p>
      <div>
        {type != 'select' && (
          <input
            onChange={onChange}
            type={type}
            value={value}
            name={name}
            placeholder={placeholder}
            data-testid="inputField"
            autoComplete="off"
            onBlur={onBlur}
            className="w-full p-2 text-base rounded-lg font-semibold bg-light border border-[#D6D8DB]"
          ></input>
        )}
        {type == 'select' && (
          <select
            data-testid="select-input"
            onChange={onChange}
            onBlur={onBlur}
            name={name}
            value={value}
            style={{ color: !value ? '#D6D8DB' : '#121316' }}
            className="w-full p-2 appearance-none rounded-lg text-base font-semibold bg-light border border-[#D6D8DB]"
          >
            {children}
          </select>
        )}
      </div>
      <p className="text-error text-xs ml-2">{helperText}</p>
    </div>
  );
};
