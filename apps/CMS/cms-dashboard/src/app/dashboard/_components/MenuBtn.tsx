'use client';
import { Stack, Box, Divider, Typography } from '@mui/material';
import React, { Dispatch, SetStateAction } from 'react';
import { ArticleStatus } from '../../../generated';

interface MenuBtnProps {
  status: string;
  number: number;
  setSelected: Dispatch<SetStateAction<string>>;
  selected: string;
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

export const MenuBtn = ({ status, number, setSelected, selected }: MenuBtnProps) => {
  return (
    <Stack onClick={() => setSelected(status)} data-testid="menu-btn-test-id">
      <Stack sx={{ display: 'flex', flexDirection: 'row', gap: '10px', alignItems: 'center', textColor: '#3F4145', height: 'full', paddingBottom: '20px' }}>
        <Typography data-testid="title-test-id" style={{ fontWeight: selected === status ? 'bold' : 'normal' }}>{ articleEnum[status as keyof articleStatus] }</Typography>
        <Typography data-testid="number-test-id" sx={{ display: 'flex', paddingX: 1, width: '40px', justifyContent: 'center', alignItems: 'center', backgroundColor: '#ECEDE0', borderRadius: 25, textAlign: 'center' }}>{number}</Typography>
      </Stack>
      <Divider sx={{ backgroundColor: 'black', width: '100%', visibility: selected === status ? 'visible' : 'hidden' }}></Divider>
    </Stack>
  );
};