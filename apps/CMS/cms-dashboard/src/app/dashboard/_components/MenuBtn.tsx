import { Stack, Divider, Typography } from '@mui/material';
import React, { Dispatch, SetStateAction } from 'react';

interface MenuBtnProps {
  menu: string;
  number: number;
  setSelected: Dispatch<SetStateAction<string>>;
  selected: string;
}

export const MenuBtn = (props: MenuBtnProps) => {
  const { menu, number, setSelected, selected } = props;

  return (
    <Stack onClick={() => setSelected(menu)} test-id="menu-btn-test-id" px={1}>
      <Stack direction={'row'} gap={1} py={2.4} px={1.5} sx={{ cursor: 'pointer' }}>
        <Typography data-testid="cypress-title" fontSize={14} fontWeight={600} color={'#3F4145'} style={{ fontWeight: selected === menu ? 'bold' : 'normal' }}>
          {menu}
        </Typography>
        <Typography fontSize={14} fontWeight={400} color={'#1F2126'} sx={{ bgcolor: '#ECEDF0', borderRadius: 30, px: 1.1, py: 0.1 }}>
          {number}
        </Typography>
      </Stack>
      <Divider sx={{ bgcolor: 'black', visibility: selected === menu ? 'visible' : 'hidden' }}></Divider>
    </Stack>
  );
};
