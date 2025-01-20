type InputProps = {
  type?: string;
  placeholder: string;
  // eslint-disable-next-line no-unused-vars
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  value: string;
};

const Input = ({ type, placeholder, onChange, className = '', value }: InputProps) => {
  return (
    <div>
      <input type={type} placeholder={placeholder} className={`border rounded-md px-3 py-1 w-full ${className}`} onChange={onChange} value={value} />
    </div>
  );
};

export default Input;
