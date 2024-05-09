'use client';

type InputProps = {
  value: string;
  onChange: (_: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
};

export const Input = ({ value, onChange, name }: InputProps) => {
  return (
    <div>
      <input name={name} className="p-2 border  rounded-lg w-full border-[#D6D8DB]" type="text" value={value} placeholder="Оруулна уу..." data-testid="search-text-field" onChange={onChange} />
    </div>
  );
};
