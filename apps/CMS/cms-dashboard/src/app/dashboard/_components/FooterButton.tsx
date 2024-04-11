'use client';
import { Stack } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';
type FooterButtonProps = {
  text: string;
  selectedButton: string;
  setSelectedButton: Dispatch<SetStateAction<string>>;
};
export const FooterButton = (props: FooterButtonProps) => {
  const { text, selectedButton, setSelectedButton } = props;
  return (
    <Stack
      data-testid="footer-button"
      paddingY={2}
      paddingX={3}
      sx={{ fontWeight: '600', color: '#121316', backgroundColor: selectedButton === text ? '#1c202414' : '', borderRadius: '50px', cursor: 'pointer' }}
      onClick={() => {
        setSelectedButton(text);
      }}
    >
      {text}
    </Stack>
  );
};
