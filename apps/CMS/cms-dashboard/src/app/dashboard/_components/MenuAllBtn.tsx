'use client';
import { Stack, Divider, Typography } from '@mui/material';

interface MenuBtnProps {
  statusName: string;
  number: number | undefined;
  status: string;
}

export const MenuAllBtn = ({ statusName, number, status }: MenuBtnProps) => {
  return (
    <Stack data-testid="menu-btn-test-id">
      <Stack direction={'row'} gap={0.7} px={2} py={2.3}>
        <Typography data-testid="title-test-id" fontSize={15} fontWeight={600} color={'#3F4145'} style={{ fontWeight: status === statusName ? 'bold' : 'normal' }}>
          Бүгд
        </Typography>
        <Typography data-testid="number-test-id" color={'#1F2126'} fontSize={14} sx={{ bgcolor: '#ECEDF0', px: 1.3, borderRadius: 40 }}>
          {number}
        </Typography>
      </Stack>
      <Divider data-testid="divider-test-id" sx={{ backgroundColor: 'black', width: '100%', visibility: status === statusName ? 'visible' : 'hidden' }}></Divider>
    </Stack>
  );
};
