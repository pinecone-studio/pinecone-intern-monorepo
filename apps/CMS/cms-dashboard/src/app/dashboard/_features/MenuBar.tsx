'use client';
import React, { useState } from 'react';
import { Stack } from '@mui/material';
import { MenuBtn } from '../_components/MenuBtn';

type menuType = {
  menu: string;
  number: number;
};
const menuMock = [
  {
    menu: 'Бүгд',
    number: 18,
  },
  {
    menu: 'Нийтэлсэн',
    number: 10,
  },
  {
    menu: 'Ноорог',
    number: 4,
  },
  {
    menu: 'Архив',
    number: 2,
  },
  {
    menu: 'Төлөвлөсөн',
    number: 2,
  },
];

export const MenuBar = () => {
  const [selected, setSelected] = useState('Бүгд');

  return (
    <Stack
      sx={{
        backgroundColor: 'white',
        borderRadius: 2,
        border: 1,
        borderColor: '#D6D8DB',
      }}
    >
      <Stack flexDirection={'row'} sx={{ textDecorationColor: 'gray', width: '65%', justifyContent: 'space-between', cursor: 'pointer' }}>
        {menuMock &&
          menuMock.map((e: menuType, index) => {
            return <MenuBtn selected={selected} setSelected={setSelected} number={e.number} menu={e.menu} key={index} />;
          })}
      </Stack>
    </Stack>
  );
};
