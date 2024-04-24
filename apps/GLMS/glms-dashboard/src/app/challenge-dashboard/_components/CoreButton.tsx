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

export const Button = ({ label, onClick, href, color, w, h, radius, fontSize }: IButtonProps) => {
  return (
    <MuiButton
      href={href}
      onClick={onClick}
      variant="contained"
      color="inherit"
      sx={{
        borderRadius: radius + 'px',
        fontSize: fontSize ? fontSize + 'px' : '14px',
        fontStyle: 'normal',
        fontWeight: 600,
        color: 'white',
        bgcolor: color ? color : 'black',
        width: w ? '' + w + 'px' : '150px',
        height: h ? '' + h + 'px' : '50px',
        '&:hover': {
          color: 'black',
        },
      }}
    >
      {label}
    </MuiButton>
  );
};
