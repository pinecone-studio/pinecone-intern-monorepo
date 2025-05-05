import React from 'react';

type Props = {
  name: string;
  value: number;
  onChange: (_e: React.ChangeEvent<HTMLInputElement>) =>void;
  onBlur: (_e: React.FocusEvent<HTMLInputElement>) => void;
  error?: string;
}

export const CreatePostField = ({ name, value, onChange, onBlur, error}: Props) => {

  return (
    <div>
      <label className="block text-sm text-[#09090B] pb-2">Талбай</label>
      <input
        id={name}
        name={name}
        type="number"
        onBlur={onBlur}
        onChange={onChange}
        value={value}
        placeholder="Талбай (м2)"
        data-testid="field"
        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 ${error ? 'border-red-500 focus:ring-red-500' : 'focus:ring-1'}`}
      />
      {error && <p className='text-red-500 text-sm mt-1'>{error}</p>}
    </div>
  );
};
