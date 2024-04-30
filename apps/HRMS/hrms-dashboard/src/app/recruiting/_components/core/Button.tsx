'use client';

import { Button as MuiButton } from '@mui/material';
import PlusIcon from '../icons/PlusIcon';

interface IButtonProps {
  label: string;
  disabled?: boolean;
  href?: string;
  btnType?: 'contained' | 'outlined';
  onClick?: () => void;
  plusIcon?: boolean;
  style?: React.CSSProperties;
}

export const Button = ({ label, onClick, disabled = false, btnType = 'contained', href, plusIcon }: IButtonProps) => {
  return (
    <MuiButton
      href={href}
      onClick={onClick}
      color="primary"
      variant={btnType}
      disabled={disabled}
      sx={{
        fontSize: '14px',
        fontWeight: '400',
        padding: '10px 14px',
        color: btnType === 'outlined' ? '#121316' : 'white',
        border: btnType === 'outlined' ? 1 : 0,
        borderColor: btnType === 'outlined' ? '#121316' : '',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
      }}
      size="medium"
    >
      {label}
      {plusIcon && <PlusIcon />}
    </MuiButton>
  );
};
