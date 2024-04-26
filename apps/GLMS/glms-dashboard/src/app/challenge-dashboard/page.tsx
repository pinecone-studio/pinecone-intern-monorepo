'use client';
import { useState } from 'react';
import { RadioButton, SelectButton, Button } from './_components';
import { AddChallengeModal } from './_feature/AddChallengeModal';

const Page = () => {
  const [selectedOption, setSelectedOption] = useState<string>('');

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div>
      <RadioButton value={false} checked={true}  />
      <SelectButton handleSelectChange={handleSelectChange} options={['yuu', 'bn', 'da']} selectedOption={selectedOption} />
      <AddChallengeModal />
      <Button label={'text'} />
    </div>
  );
};

export default Page;
