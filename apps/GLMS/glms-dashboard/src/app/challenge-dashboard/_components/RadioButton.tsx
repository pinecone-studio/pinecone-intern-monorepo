import { FormControlLabel, Radio } from '@mui/material';

interface RadioButtonProps {
  value: boolean;
  checked: boolean;
}

export const RadioButton: React.FC<RadioButtonProps> = ({ value, checked}) => {
  return <FormControlLabel value={value?.toString()} data-testid="radio-button" control={<Radio  />} checked={checked} label="" />;
};
