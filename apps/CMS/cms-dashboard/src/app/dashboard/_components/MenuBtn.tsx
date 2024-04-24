'use client';
import { Stack, Divider, Typography } from '@mui/material';
import React, { Dispatch, SetStateAction } from 'react';

interface MenuBtnProps {
  statusName: string;
  number: number | undefined;
  setStatus: Dispatch<SetStateAction<string>>;
  status: string;
}

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

export const MenuBtn = ({ statusName, number, setStatus, status }: MenuBtnProps) => {
  
  console.log(status);
  
  return (
    <Stack onClick={() => setStatus(statusName)} data-testid="menu-btn-test-id">
      <Stack sx={{ display: 'flex', flexDirection: 'row', gap: '10px', alignItems: 'center', textColor: '#3F4145', height: 'full', paddingBottom: '20px' }}>
        <Typography data-testid="title-test-id" style={{ fontWeight: status === statusName ? 'bold' : 'normal' }}>{ articleEnum[statusName as keyof articleStatus] }</Typography>
        <Typography data-testid="number-test-id" sx={{ display: 'flex', paddingX: 1, width: '40px', justifyContent: 'center', alignItems: 'center', backgroundColor: '#ECEDE0', borderRadius: 25, textAlign: 'center' }}>{number}</Typography>
      </Stack>
      <Divider sx={{ backgroundColor: 'black', width: '100%', visibility: status === statusName ? 'visible' : 'hidden' }}></Divider>
    </Stack>
  );
};