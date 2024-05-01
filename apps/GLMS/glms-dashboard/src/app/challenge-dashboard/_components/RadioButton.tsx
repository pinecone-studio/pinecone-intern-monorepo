import { FormControlLabel, Radio } from '@mui/material';

interface RadioButtonProps {
  checked: boolean;
  handleRadioButtonChecked: () => void;
}

export const RadioButton: React.FC<RadioButtonProps> = ({ checked, handleRadioButtonChecked }) => {
  return <FormControlLabel data-testid="radio-button" data-cy="radio-button" control={<Radio checked={checked} onClick={handleRadioButtonChecked} />} label="" />;
};
