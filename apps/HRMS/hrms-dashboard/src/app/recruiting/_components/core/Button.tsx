'use client';

import { Button as MuiButton } from '@mui/material';
import SvgIcon from '@mui/material/SvgIcon';

interface IButtonProps {
  label: string;
  disabled?: boolean;
  href?: string;
  btnType?: 'contained' | 'outlined';
  onClick?: () => void;
  plusIcon?: boolean;
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
        fontSize: '16px',
        fontWeight: '400',
        padding: '10px 14px',
        color: btnType === 'outlined' ? '#121316' : 'white',
        border: btnType === 'outlined' ? 1 : 0,
        borderColor: btnType === 'outlined' ? '#1976d2' : '',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
      }}
      size="medium"
    >
      {label}
      {plusIcon && (
        <SvgIcon fontSize="small" sx={{ marginLeft: '8px' }}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.2} stroke="currentColor">
            <path strokeLinecap="square" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </SvgIcon>
      )}
    </MuiButton>
  );
};
