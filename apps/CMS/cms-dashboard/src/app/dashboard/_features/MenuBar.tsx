'use client'
import React, { useState } from 'react';
import { Stack } from '@mui/material';
import { MenuBtn } from '../_components/MenuBtn';

const menuMock = [
  {
    menu: 'Бүгд',
    number: 18
  },
  {
    menu: 'Нийтэлсэн',
    number: 10
  },
  {
    menu: 'Ноорог',
    number: 4
  },{
    menu: 'Архив',
    number: 2
  },
  {
    menu: 'Төлөвлөсөн',
    number: 2
  },
]

export const MenuBar = () => {
  const [selected, setSelected] = useState('Бүгд');
  return (
    <Stack sx={{ display: 'flex', marginX: 'auto', width: '1200px', backgroundColor: 'white', height: '70px', paddingX: '20px', alignItems: 'start', justifyContent: 'end', fontSize: '20px', borderRadius: 2 }}>
      <Stack flexDirection={'row'} sx={{ textDecorationColor: 'gray', width: '65%', justifyContent: 'space-between', cursor: 'pointer' }}>
        { menuMock && menuMock.map((e: any, index) => {
          return (
            <MenuBtn selected={selected} setSelected={setSelected} number={e.number} menu={e.menu} key={index}/>
          )
        })}
      </Stack>
    </Stack>
  )
}