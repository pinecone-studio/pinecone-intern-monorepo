'use client';
import { CircularProgress, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import Image from 'next/image';
import { useGetAllEmployeeQuery } from '../../../generated';
import { useEffect } from 'react';
import { perPage } from '../constants';

type PropsType = {
  setPageCount: (_: number) => void;
  start: number;
  end: number;
};

export const EmployeesListTable = ({ setPageCount, start, end }: PropsType) => {
  const tableHeader = ['Ажилтан', 'Мэргэжил', 'И-мэйл', 'Хэлтэс', 'Төлөв'];
  const { data, loading } = useGetAllEmployeeQuery();
  const allEmployees = data?.getAllEmployee;
  const allEmployeeslength: number = allEmployees?.length ?? 0;
  useEffect(() => {
    const pageCount = allEmployeeslength / perPage.limit;
    setPageCount(Math.ceil(pageCount));
  }, [data]);

  if (loading)
    return (
      <Stack width={'100%'} justifyContent={'center'} alignItems={'center'} py={8}>
        <CircularProgress />
      </Stack>
    );
  return (
    <Stack data-cy="employeesList" my={2} borderRadius={'12px'} overflow={'hidden'}>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              {tableHeader.map((item, index) => (
                <TableCell align="left" key={index} sx={{ backgroundColor: 'primary.light' }}>
                  <Typography data-cy={`tableHeader-${index}`} fontSize={12} fontWeight={600} color={'primary.dark'}>
                    {item}
                  </Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {!loading &&
              allEmployees?.slice(start, end).map((row, index) => (
                <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 }, borderBottom: '1px solid #ECEDF0' }}>
                  <TableCell sx={{ cursor: 'pointer', '&:hover': { fontWeight: 900 } }} component="th" scope="row">
                    <Stack flexDirection={'row'} alignItems={'left'} gap={1.5}>
                      <Stack position={'relative'} borderRadius={'50%'} overflow={'hidden'} height={'50px'} sx={{ aspectRatio: 1 / 1 }}>
                        <Image src={row?.imageUrl || '/avatar.png'} style={{ objectFit: 'cover' }} alt="product image" fill sizes="small" />
                      </Stack>
                      <Stack justifyContent={'center'}>
                        <Typography fontSize={14} fontWeight={600} color={'primary.dark'}>
                          {row?.lastName?.slice(0, 1).toUpperCase() + '.' + row?.firstName}
                        </Typography>
                      </Stack>
                    </Stack>
                  </TableCell>
                  <TableCell align="left">{row?.jobTitle}</TableCell>
                  <TableCell align="left">{row?.email}</TableCell>
                  <TableCell align="left">{row?.department}</TableCell>
                  <TableCell align="left">{row?.employmentStatus}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
};
