'use client';
import * as React from 'react';
import { Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import Image from 'next/image';

const employeesList = [{ id: '1', employeeImg: '/profile.png', firstName: 'Нэр', lastName: 'Овог', jobTitle: 'Developer', email: 'morgild@gmail.com', phone: '88088722', status: 'Үндсэн' }];
export const EmployeesListTable = () => {
  const tableHeader = ['Ажилтан', 'Мэргэжил', 'И-мэйл', 'Утасны дугаар', 'Төлөв'];

  return (
    <Stack my={2} borderRadius={'12px'} overflow={'hidden'}>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              {tableHeader.map((item, index) => (
                <TableCell align="left" key={index} sx={{ backgroundColor: 'primary.light' }}>
                  <Typography fontSize={12} fontWeight={600} color={'primary.dark'}>
                    {item}
                  </Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {employeesList.map((row, index) => (
              <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 }, borderBottom: '1px solid #ECEDF0' }}>
                <TableCell component="th" scope="row">
                  <Stack flexDirection={'row'} alignItems={'left'} gap={1.5}>
                    <Stack position={'relative'} borderRadius={'50%'} overflow={'hidden'} height={'50px'} sx={{ aspectRatio: 1 / 1 }}>
                      <Image src={row.employeeImg} style={{ objectFit: 'cover' }} alt="product image" fill sizes="small" />
                    </Stack>
                    <Stack justifyContent={'center'}>
                      <Typography fontSize={14} fontWeight={600} color={'primary.dark'}>
                        {row.lastName.trim().slice(0, 1).toUpperCase().concat('.', row.firstName)}
                      </Typography>
                    </Stack>
                  </Stack>
                </TableCell>
                <TableCell align="left">{row.jobTitle}</TableCell>
                <TableCell align="left">{row.email}</TableCell>
                <TableCell align="left">{row.phone}</TableCell>
                <TableCell align="left">{row.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
};
