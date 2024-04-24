'use client';

import { EmployeePagination } from './_components';
import { Stack, Typography } from '@mui/material';
import { EmployeesListTable } from './_features/EmployeesListTable';
import { Add } from '@mui/icons-material';

const EmployeeDetailsPage = () => {
  return (
    <Stack p={4} bgcolor={'primary.light'} width={'100%'} overflow={'scroll'}>
      <Stack p={3} bgcolor={'common.white'} width={'100%'}>
        <Stack flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
          <Typography color={'primary.main'} fontSize={24} fontWeight={700}>
            Ажилчид
          </Typography>
          <Stack flexDirection={'row'} alignItems={'center'} py={1} px={1.5} gap={0.5} borderRadius={'8px'} bgcolor={'primary.light'} color={'primary.main'}>
            <Add color="inherit" fontSize="medium" />
            <Typography fontSize={14} fontWeight={600}>
              Ажилтан нэмэх
            </Typography>
          </Stack>
        </Stack>
        <EmployeesListTable />
        <EmployeePagination />
      </Stack>
    </Stack>
  );
};

export default EmployeeDetailsPage;
