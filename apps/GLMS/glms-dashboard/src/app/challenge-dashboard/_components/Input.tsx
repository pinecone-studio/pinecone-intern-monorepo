'use client';
import { useState } from 'react';

export const Input = () => {
  const [quizeInput, setQuizeInput] = useState('');
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => setQuizeInput(e.target.value);
  return (
    <div>
      <input type="text" value={quizeInput} placeholder="Оруулна уу..." data-testid="search-text-field" onChange={onChangeHandler} />
    </div>
  );
};
