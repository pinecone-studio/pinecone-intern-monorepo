import React from 'react';

type Props = {
  title: string;
  value: string;
  onChange: (_e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (_e: React.FocusEvent<HTMLInputElement>) => void;
  error?: string;
};

export const CreatePostTitle = ({ title, value, onChange, onBlur, error }: Props) => {
  return (
    <div>
      <label htmlFor={title} className="block text-sm text-[#09090B] pb-1">Нэр</label>
      <input
        id={title}
        title={title}
        type="text"
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder="Нэр оруулна уу"
        data-testid="Name"
        className={`w-full block px-2 py-1 border rounded-lg focus:outline-none focus:ring-1 ${error ? 'border-red-500 focus:ring-red-500' : 'focus:ring-1'}`}
      />
      <div className="h-3 mt-1">{error ? <p className="text-red-500 text-sm">{error}</p> : <p className="text-sm invisible">placeholder</p>}</div>
    </div>
  );
};
