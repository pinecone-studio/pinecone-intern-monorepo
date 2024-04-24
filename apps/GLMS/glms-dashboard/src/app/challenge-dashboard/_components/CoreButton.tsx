import React, { ReactNode } from 'react';
import { Button as MuiButton } from '@mui/material';

interface IButtonProps {
  label: ReactNode;
  disabled?: boolean;
  radius?: number;
  h?: number;
  btnType?: 'border' | 'noBorder';
  onClick?: () => void;
  href?: string;
  w?: number;
  color?: string;
  fontSize?: number;
}

export const Button = ({ label, onClick, href, color = '#4B4844', w = 150, h = 50, radius = 20, fontSize = 14 }: IButtonProps) => {
  return (
    <MuiButton
      href={href}
      onClick={onClick}
      variant="contained"
      color="inherit"
      sx={{
        borderRadius: `${radius}px`,
        fontSize: ` ${fontSize}px`,
        fontStyle: 'normal',
        fontWeight: 600,
        color: 'white',
        bgcolor: color,
        width: `${w}px`,
        height: `${h}px`,
        '&:hover': {
          color: 'black',
        },
      }}
    >
      {label}
    </MuiButton>
  );
};
