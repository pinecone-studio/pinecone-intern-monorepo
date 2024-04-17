import { Stack, Box, Divider } from '@mui/material';
import React, { Dispatch, SetStateAction } from 'react';

interface MenuBtnProps {
  menu: string;
  number: number;
  setSelected: Dispatch<SetStateAction<string>>;
  selected: string
}

export const MenuBtn = (props: MenuBtnProps) => {
  const { menu, number, setSelected, selected } = props
  return (
    <Stack onClick={() => setSelected(menu)} test-id="menu-btn-test-id">
      <Stack sx={{ display: 'flex', flexDirection: 'row', gap: '10px', alignItems: 'center', textColor: '#3F4145', height: 'full', paddingBottom: '20px' }}>
        <Box data-testid="cypress-title" style={{ fontWeight: selected === menu ? 'bold' : 'normal' }}>{menu}</Box>
        <Box sx={{ display: 'flex', paddingX: 1, width: '40px', justifyContent: 'center', alignItems: 'center', backgroundColor: '#ECEDE0', borderRadius: 25, textAlign: 'center' }}>{number}</Box>
      </Stack>
      <Divider sx={{ backgroundColor: 'black', width:'100%', visibility: selected === menu ? 'visible' : 'hidden' }}></Divider>
    </Stack>
  );
};