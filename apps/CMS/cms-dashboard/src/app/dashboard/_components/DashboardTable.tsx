'use client';

import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Container, Stack, Typography } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import { useGetArticlesQuery } from '../../../generated';

const DashboardTable = () => {
  const { data } = useGetArticlesQuery();

  return (
    <Container>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 655 }}>
          <TableHead>
            <TableRow>
              <TableCell data-testid="text-test-id" sx={{ fontSize: '14px', fontWeight: 600, color: '#3F4145' }}>
                Нийтлэл
              </TableCell>
              <TableCell data-testid="text-test-id" sx={{ fontSize: '14px', fontWeight: 600, color: '#3F4145' }}>
                Огноо
              </TableCell>
              <TableCell data-testid="text-test-id" sx={{ fontSize: '14px', fontWeight: 600, color: '#3F4145' }}>
                Статус
              </TableCell>
              <TableCell data-testid="text-test-id" sx={{ fontSize: '14px', fontWeight: 600, color: '#3F4145' }}>
                Шошго
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.getArticles?.map((item, index) => {
              return (
                <TableRow key={index}>
                  <TableCell sx={{ fontSize: '15px', fontWeight: 600, color: '#121316' }}>{item?.title}</TableCell>
                  <TableCell>
                    <Typography sx={{ fontSize: '14px', fontWeight: 400, color: '#0A4E22', borderRadius: 3, bgcolor: '#C1E6CF', width: '70%', textAlign: 'center', py: 0.3 }}>
                      {item?.status}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ fontSize: '14px', fontWeight: 400, color: '#121316' }}> {item?.createdAt.slice(0, 10)}</TableCell>
                  <TableCell sx={{ fontSize: '14px', fontWeight: 400, color: '#121316' }}>
                    <Typography sx={{ fontSize: '14px', fontWeight: 400, color: '#1F2126', borderRadius: 3, bgcolor: '#ECEDF0', width: '70%', textAlign: 'center', py: 0.3, whiteSpace: 'nowrap' }}>
                      Software Engineer
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Stack direction={'row'} gap={1}>
                      <IconButton aria-label="morevert">
                        <MoreVertOutlinedIcon sx={{ width: 22, height: 22 }} />
                      </IconButton>
                      <IconButton aria-label="delete">
                        <EditOutlinedIcon sx={{ width: 22, height: 22 }} />
                      </IconButton>
                    </Stack>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default DashboardTable;
