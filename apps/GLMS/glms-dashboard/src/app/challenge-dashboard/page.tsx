'use client';

import { useState } from 'react';
import { RadioButton, SelectButton, Button } from './_components';
import { AddChallengeModal } from './_feature/AddChallengeModal';
import { Box } from '@mui/material';

const Page = () => {
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [checked, setChecked] = useState<boolean>(false);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };
  const handleRadioButtonChecked = (value: boolean) => {
    setChecked(value);
  };

  return (
    <Box data-testid="challenge-dashboard-page">
      <Box data-cy="radio-button">
        <RadioButton value={checked} checked={true} onClick={handleRadioButtonChecked} />
      </Box>
      <SelectButton data-cy="select-button" handleSelectChange={handleSelectChange} options={['yuu', 'bn', 'da']} selectedOption={selectedOption} />
      <Box>
        <AddChallengeModal data-cy="add-challenge-button" />
      </Box>
      <Button label={'text'} />
    </Box>
  );
};

export default Page;
