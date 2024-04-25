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
      <Stack>
        <Typography data-testid="title-test-id" fontSize={15} fontWeight={600} color={'#3F4145'} style={{ fontWeight: status === statusName ? 'bold' : 'normal' }}>
          Бүгд
        </Typography>
        <Typography data-testid="number-test-id" color={'#1F2126'} fontSize={14} sx={{ bgcolor: '#ECEDF0', px: 1.5, borderRadius: 40 }}>
          {number}
        </Typography>
      </Stack>
      <Divider data-testid="divider-test-id" sx={{ backgroundColor: 'black', width: '100%', visibility: status === statusName ? 'visible' : 'hidden' }}></Divider>
    </Stack>
  );
};

// <Stack onClick={() => setSelected(menu)} test-id="menu-btn-test-id" px={1}>
//   <Stack direction={'row'} gap={1} py={2.4} px={1.5} sx={{ cursor: 'pointer' }}>
//     <Typography data-testid="cypress-title" fontSize={14} fontWeight={600} color={'#3F4145'} style={{ fontWeight: selected === menu ? 'bold' : 'normal' }}>
//       {menu}
//     </Typography>
//     <Typography fontSize={14} fontWeight={400} color={'#1F2126'} sx={{ bgcolor: '#ECEDF0', borderRadius: 30, px: 1.1, py: 0.1 }}>
//       {number}
//     </Typography>
//   </Stack>
//   <Divider sx={{ bgcolor: 'black', visibility: selected === menu ? 'visible' : 'hidden' }}></Divider>
// </Stack>;
