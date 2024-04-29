import { FormControlLabel, Radio } from '@mui/material';

interface RadioButtonProps {
  value: boolean;
  checked: boolean;
  onClick: (value: boolean) => void;
}

export const RadioButton: React.FC<RadioButtonProps> = ({ value, checked, onClick }) => {
  const handleRadioButtonClick = () => {
    onClick(value);
  };
  return <FormControlLabel value={value?.toString()} data-testid="radio-button" data-cy="radio-button" control={<Radio onClick={handleRadioButtonClick} />} checked={checked} label="" />;
};
