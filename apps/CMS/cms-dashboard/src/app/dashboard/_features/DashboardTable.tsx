'use client';

import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Stack, Typography, Menu, MenuItem } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import LinkOutlinedIcon from '@mui/icons-material/LinkOutlined';
import { Article } from '../../../generated';
import { useSearchParams } from 'next/navigation';

const menuItems = [
  {
    icons: <VisibilityOutlinedIcon />,
    label: 'Статистик харах',
  },
  {
    icons: <ShareOutlinedIcon />,
    label: 'Хуваалцах',
  },
  {
    icons: <ArchiveOutlinedIcon />,
    label: 'Архив',
  },
  {
    icons: <ModeEditOutlinedIcon />,
    label: 'Засварлах',
  },
  {
    icons: <LinkOutlinedIcon />,
    label: 'Линк хуулах',
  },
];

const tableItems = ['Нийтлэл', 'Статус', 'Огноо', 'Ангилал'];

type DashboardTablesTypes = {
  articles: Article[] | undefined;
};

const DashboardTable = (props: DashboardTablesTypes) => {
  const [anchorEl, setAnchorEl] = useState<(EventTarget & HTMLButtonElement) | null>();
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

  const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
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
                  <Typography
                    sx={{ fontSize: '14px', fontWeight: 400, color: '#0A4E22', borderRadius: 3, bgcolor: '#C1E6CF', width: '63%', textAlign: 'center', py: 0.4 }}
                    style={{ backgroundColor: item?.status === 'DRAFT' ? '#ECEDF0' : item?.status === 'ARCHIVED' ? '#FDF4B6' : item?.status === 'SCHEDULED' ? '#B7DDFF' : '' }}
                  >
                    {item?.status}
                  </Typography>
                </TableCell>
                <TableCell sx={{ fontSize: '14px', fontWeight: 400, color: '#121316' }}>{item?.createdAt.slice(0, 10)}</TableCell>
                <TableCell sx={{ fontSize: '14px', fontWeight: 400, color: '#121316' }}>
                  <Typography
                    sx={{ fontSize: '14px', fontWeight: 400, color: '#1F2126', borderRadius: 3, bgcolor: '#ECEDF0', textAlign: 'center', py: 0.3, whiteSpace: 'nowrap', width: '65%' }}
                  ></Typography>
                </TableCell>
                <TableCell>
                  <Stack direction={'row'} gap={1} justifyContent={'center'}>
                    <Stack>
                      <IconButton data-testid="morevert-button-test-id" data-cy="morevert-button-test-cy" sx={{ cursor: 'pointer' }} onClick={handleClick}>
                        <MoreVertOutlinedIcon sx={{ width: 22, height: 22 }} />
                      </IconButton>

                      <Menu data-testid="drop-down-menu-test-id" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
                        {menuItems.map((item, index) => {
                          return (
                            <Stack
                              className={`close-test-class-name-${index}`}
                              data-testid="close-button-menu-test-id"
                              data-cy="drop-down-menu-test-cy"
                              key={index}
                              direction={'row'}
                              alignItems={'center'}
                              px={1}
                              py={0.3}
                              onClick={handleClose}
                            >
                              <IconButton data-testid="item-icon" sx={{ color: '#000' }}>
                                {item.icons}
                              </IconButton>
                              <MenuItem sx={{ padding: 1 }}>{item.label}</MenuItem>
                            </Stack>
                          );
                        })}
                      </Menu>
                    </Stack>
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
