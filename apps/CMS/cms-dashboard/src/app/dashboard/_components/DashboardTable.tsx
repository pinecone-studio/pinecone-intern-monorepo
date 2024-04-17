'use client';

import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Stack, Typography, Menu, MenuItem } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import morevert from './MoreVertMap';

const data = [
  {
    name: 'Morphosis Хөтөлбөр',
    date: 'Нийтэлсэн',
    status: '03.01.2024',
    bar: 'Software Engineer',
  },
  {
    name: 'Leap хөтөлбөр',
    date: 'Ноорог',
    status: '09.16.2024',
    bar: 'Coding',
  },
];

const DashboardTable = () => {
  const [anchorEl, setAnchorEl] = useState<(EventTarget & HTMLButtonElement) | null>();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Stack>
      <TableContainer component={Paper} sx={{ borderRadius: 1.5 }}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontSize: '14px', fontWeight: 600, color: '#3F4145' }}>Нийтлэл</TableCell>
              <TableCell sx={{ fontSize: '14px', fontWeight: 600, color: '#3F4145' }}>Огноо</TableCell>
              <TableCell sx={{ fontSize: '14px', fontWeight: 600, color: '#3F4145' }}>Статус</TableCell>
              <TableCell sx={{ fontSize: '14px', fontWeight: 600, color: '#3F4145' }}>Шошго</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item, index) => {
              return (
                <TableRow key={index}>
                  <TableCell sx={{ fontSize: '15px', fontWeight: 600, color: '#121316' }}>{item.name}</TableCell>
                  <TableCell>
                    <Typography sx={{ fontSize: '14px', fontWeight: 400, color: '#0A4E22', borderRadius: 3, bgcolor: '#C1E6CF', width: '70%', textAlign: 'center', py: 0.3 }}>{item.date}</Typography>
                  </TableCell>
                  <TableCell sx={{ fontSize: '14px', fontWeight: 400, color: '#121316' }}>{item.status}</TableCell>
                  <TableCell sx={{ fontSize: '14px', fontWeight: 400, color: '#121316' }}>
                    <Typography sx={{ fontSize: '14px', fontWeight: 400, color: '#1F2126', borderRadius: 3, bgcolor: '#ECEDF0', textAlign: 'center', py: 0.3, whiteSpace: 'nowrap' }}>
                      {item.bar}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Stack direction={'row'} gap={1} justifyContent={'center'}>
                      <Stack>
                        <IconButton data-testid="morevert-button-test-id" sx={{ cursor: 'pointer' }} onClick={handleClick}>
                          <MoreVertOutlinedIcon sx={{ width: 22, height: 22 }} />
                        </IconButton>
                        <Menu data-testid="drop-down-menu-test-id" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
                          {morevert.map((item, index) => {
                            return (
                              <Stack
                                className="close-test-class-name"
                                data-testid="close-button-menu-test-id"
                                key={index}
                                direction={'row'}
                                alignItems={'center'}
                                px={1}
                                py={0.3}
                                onClick={handleClose}
                              >
                                <IconButton sx={{ color: '#000' }}>{item.icons}</IconButton>
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
    </Stack>
  );
};

export default DashboardTable;
