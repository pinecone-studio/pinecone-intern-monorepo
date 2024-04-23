'use client';

import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Stack, Typography, Menu, MenuItem } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import morevert from './MoreVertMap';
import { useGetArticlesQueryQuery } from '../../../generated';

const DashboardTable = () => {
  const [anchorEl, setAnchorEl] = useState<(EventTarget & HTMLButtonElement) | null>();
  const { data } = useGetArticlesQueryQuery();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <TableContainer data-cy="dashboard-table-cy" component={Paper} sx={{ borderRadius: 2, overflow: 'hidden' }}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontSize: '14px', fontWeight: 600, color: '#3F4145' }}>Нийтлэл</TableCell>
            <TableCell sx={{ fontSize: '14px', fontWeight: 600, color: '#3F4145' }}>Статус</TableCell>
            <TableCell sx={{ fontSize: '14px', fontWeight: 600, color: '#3F4145' }}>Огноо</TableCell>
            <TableCell sx={{ fontSize: '14px', fontWeight: 600, color: '#3F4145' }}>Ангилал</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.getArticlesQuery.map((item, index) => {
            return (
              <TableRow key={index}>
                <TableCell sx={{ fontSize: '15px', fontWeight: 600, color: '#121316' }}>{item?.title}</TableCell>
                <TableCell>
                  <Typography sx={{ fontSize: '14px', fontWeight: 400, color: '#0A4E22', borderRadius: 3, bgcolor: '#C1E6CF', width: '63%', textAlign: 'center', py: 0.4 }}>{item?.status}</Typography>
                </TableCell>
                <TableCell sx={{ fontSize: '14px', fontWeight: 400, color: '#121316' }}>{item?.createdAt.slice(0, 10)}</TableCell>
                <TableCell sx={{ fontSize: '14px', fontWeight: 400, color: '#121316' }}>
                  <Typography sx={{ fontSize: '14px', fontWeight: 400, color: '#1F2126', borderRadius: 3, bgcolor: '#ECEDF0', textAlign: 'center', py: 0.3, whiteSpace: 'nowrap', width: '65%' }}>
                    {item?.category.name}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Stack direction={'row'} gap={1} justifyContent={'center'}>
                    <Stack>
                      <IconButton data-testid="morevert-button-test-id" data-cy="morevert-button-test-cy" sx={{ cursor: 'pointer' }} onClick={handleClick}>
                        <MoreVertOutlinedIcon sx={{ width: 22, height: 22 }} />
                      </IconButton>

                      <Menu data-testid="drop-down-menu-test-id" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
                        {morevert.map((item, index) => {
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
