import React from 'react';
import { Typography } from '@mui/material';
import { SelectButton } from './Select';

type ISelectPropsType = {
  label: string;
  options: string[];
  selectedOption: string;
  onSelect: (_: React.ChangeEvent<HTMLSelectElement>) => void;
};

export const SelectWithLabel = ({ label, options, selectedOption, onSelect }: ISelectPropsType) => {
  return (
    <>
      <Typography sx={{ fontWeight: 600, fontSize: '14px', color: '#121316' }}>{label}</Typography>
      <SelectButton data-testid="select" options={options} selectedOption={selectedOption} handleSelectChange={onSelect} />
    </>
  );
};
