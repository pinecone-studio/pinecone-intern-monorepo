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
      <label htmlFor={name} className="block text-sm text-[#09090B] pb-1">Эзэмшигчийн Нэр</label>
      <input
        id={name}
        title={name}
        type="name"
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder="Эзэмшигчийн нэр"
        data-testid="Title"
        className={`w-full block px-2 py-1 border rounded-lg focus:outline-none focus:ring-1 ${error ? 'border-red-500 focus:ring-red-500' : 'focus:ring-1'}`}
      />
      <div className="h-3 mt-1">{error ? <p className="text-red-500 text-sm">{error}</p> : <p className="text-sm invisible">placeholder</p>}</div>
    </div>
  );
};