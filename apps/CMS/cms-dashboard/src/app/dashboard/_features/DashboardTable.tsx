'use client';

import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Stack, Typography } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { Article } from '../../../generated';
import { useSearchParams } from 'next/navigation';
import MenuButton from '../_components/MenuButton';

type DashboardTablesTypes = {
  articles: Article[] | undefined;
};
const tableItems = ['Нийтлэл', 'Статус', 'Огноо', 'Ангилал'];

const DashboardTable = (props: DashboardTablesTypes) => {
  const { articles } = props;
  const searchParams = useSearchParams();
  const statusFilter = searchParams.get('status') ?? '';
  const searchedValueFilter = searchParams.get('searchedValue') ?? '';
  const startDate = searchParams.get('startDate') ?? '';
  const endDate = searchParams.get('endDate') ?? '';

  const result = articles
    ?.filter((item) => {
      if (!statusFilter) return item;
      if (statusFilter === null || statusFilter === 'ALL') return item;
      return item.status == statusFilter;
    })
    .filter((item) => {
      if (!searchedValueFilter) return item;
      return item.title.toLowerCase().includes(searchedValueFilter?.toLocaleLowerCase() ?? '');
    })
    .filter((item) => {
      if (!startDate || !endDate) return item;
      const itemDate = new Date(item['createdAt']);
      const start = new Date(startDate);
      const end = new Date(endDate);
      return itemDate >= start && itemDate <= end;
    });

  type articleStatus = {
    PUBLISHED: string;
    DRAFT: string;
    ARCHIVED: string;
    SCHEDULED: string;
  };
  const articleEnum: articleStatus = {
    PUBLISHED: 'Нийтэлсэн',
    DRAFT: 'Ноорог',
    ARCHIVED: 'Архив',
    SCHEDULED: 'Төлөвлөсөн',
  };

  return (
    <TableContainer data-cy="dashboard-table-cy-id" component={Paper} sx={{ borderRadius: 2, overflow: 'hidden' }}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            {tableItems.map((item, index) => {
              return (
                <TableCell key={index} sx={{ fontSize: '14px', fontWeight: 600, color: '#3F4145' }}>
                  {item}
                </TableCell>
              );
            })}
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {result?.map((item, index) => {
            return (
              <TableRow key={index}>
                <TableCell sx={{ fontSize: '15px', fontWeight: 600, color: '#121316' }}>{item?.title}</TableCell>
                <TableCell>
                  <Stack alignItems={'center'} width={'46%'}>
                    <Typography
                      sx={{ fontSize: '14px', fontWeight: 400, color: '#0A4E22', borderRadius: 3, width: 'fit-content', textAlign: 'center', py: 0.4, justifyContent: 'center', px: 1 }}
                      style={{
                        backgroundColor:
                          item?.status === 'DRAFT' ? '#ECEDF0' : item?.status === 'ARCHIVED' ? '#FDF4B6' : item?.status === 'SCHEDULED' ? '#B7DDFF' : item?.status === 'PUBLISHED' ? '#C1E6CF' : '',
                      }}
                    >
                      {articleEnum[item?.status as keyof articleStatus]}
                    </Typography>
                  </Stack>
                </TableCell>
                <TableCell sx={{ fontSize: '14px', fontWeight: 400, color: '#121316' }}>{item?.createdAt.slice(0, 10)}</TableCell>
                <TableCell sx={{ fontSize: '14px', fontWeight: 400, color: '#121316' }}>
                  <Typography sx={{ fontSize: '14px', fontWeight: 400, color: '#1F2126', borderRadius: 3, bgcolor: '#ECEDF0', py: 0.3, whiteSpace: 'nowrap', textAlign: 'center', width: '66%' }}>
                    {item.category.name}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Stack direction={'row'} gap={1} justifyContent={'center'}>
                    <MenuButton />
                    <IconButton aria-label="delete" sx={{ cursor: 'pointer' }}>
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
  );
};

export default DashboardTable;
