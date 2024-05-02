'use client';

import { useState } from 'react';
import { RadioButton, SelectButton, Button } from './_components';
import { Box } from '@mui/material';

const Page = () => {
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [checked, setChecked] = useState<boolean>(false);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };
  const handleRadioButtonChecked = () => {
    setChecked(!checked);
  };

  return (
    <Box data-testid="challenge-dashboard-page">
      <Box data-cy="radio-button">
        <RadioButton checked={checked} handleRadioButtonChecked={handleRadioButtonChecked} />
      </Box>
      <SelectButton handleSelectChange={handleSelectChange} options={['yuu', 'bn', 'da']} selectedOption={selectedOption} />
      <Button label={'text'} />
    </Box>
  );
};

export default Page;
