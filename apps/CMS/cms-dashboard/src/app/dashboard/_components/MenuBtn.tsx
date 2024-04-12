import { Stack, Box, Divider } from '@mui/material';
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
      <Stack direction={'row'} gap={1} p={2.5}>
        <Box data-testid="cypress-title" style={{ fontWeight: selected === menu ? 'bold' : 'normal' }}>
          {menu}
        </Box>
        <Box sx={{ bgcolor: '#ECEDF0', borderRadius: 25, px: 1 }}>{number}</Box>
      </Stack>
      <Divider sx={{ backgroundColor: 'black', width: '100%', visibility: selected === menu ? 'visible' : 'hidden' }}></Divider>
    </Stack>
  );
};
