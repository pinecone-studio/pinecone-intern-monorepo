import React from 'react';

type Props = {
  name: string;
  value: string | number;
  onChange: (_e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (_e: React.FocusEvent<HTMLInputElement>) => void;
  error?: string;
};

export const CreatePostWindow = ({name, value, onChange, onBlur, error}: Props) => {
  return (
    <div>
      <label htmlFor={name} className="block text-md text-[#09090B] pb-1">
        Цонхны загвар
      </label>
      <input
        id={name}
        name={name}
        type="string"
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder="Цонхны загвар аа оруулна уу"
        data-testid="window"
        className={`w-full block px-2 py-1 border rounded-lg focus:outline-none focus:ring-1 ${error ? 'border-red-500 focus:ring-red-500' : 'focus:ring-1'}`}
      />
      <div className="h-3 mt-1">{error ? <p className="text-red-500 text-sm">{error}</p> : <p className="text-sm invisible">placeholder</p>}</div>
    </div>
  );
};