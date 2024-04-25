import { Button as MuiButton } from '@mui/material';

interface IButtonProps {
  label: string;
  disabled?: boolean;
  radius?: number;
  h?: number;
  onClick?: () => void;
  href?: string;
  w?: number;
  color?: string;
  fontSize?: number;
}

export const Button = ({ label, onClick, href, color = '#4B4844', w = 150, h = 50, radius = 5, fontSize = 14 }: IButtonProps) => {
  return (
    <MuiButton
      href={href}
      onClick={onClick}
      variant="contained"
      color="inherit"
      sx={{
        borderRadius: radius,
        fontSize: fontSize,
        fontStyle: 'normal',
        fontWeight: 600,
        color: 'white',
        bgcolor: color,
        width: w,
        height: h,
        '&:hover': {
          color: 'black',
        },
      }}
    >
      {label}
    </MuiButton>
  );
};
