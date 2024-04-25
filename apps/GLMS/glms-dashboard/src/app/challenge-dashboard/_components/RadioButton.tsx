import { FormControlLabel, Radio } from '@mui/material';

interface RadioButtonProps {
  value: boolean;
  checked: boolean;
  onClick: () => void;
}

export const RadioButton: React.FC<RadioButtonProps> = ({ value, checked, onClick }) => {
  return <FormControlLabel value={value?.toString()} data-testid="radio-button" control={<Radio onClick={onClick} />} checked={checked} label="" />;
};
