import React from 'react';

type Props = {
  name: string;
  value: string;
  onChange: (_e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (_e: React.FocusEvent<HTMLInputElement>) => void;
  error?: string;
};

export const CreatePostName = ({ name, value, onChange, onBlur, error }: Props) => {
  return (
    <div>
      <label className="block text-sm text-[#09090B] pb-2">
        Нэр
      </label>
      <input
        id={name}
        name={name}
        type="text"
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder="Нэр"
        data-testid="Name"
        className={`w-full block px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 ${error ? 'border-red-500 focus:ring-red-500' : 'focus:ring-1'}`}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};
