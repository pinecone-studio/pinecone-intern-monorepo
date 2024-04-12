'use client'
import React, { useState } from 'react';
import { Stack } from '@mui/material';
import { MenuBtn } from '../_components/MenuBtn';

export const MenuBar = () => {
  const [selected, setSelected] = useState('Бүгд');
  return (
    <Stack sx={{ display: 'flex', marginX: 'auto', width: '1200px', backgroundColor: 'white', height: '70px', paddingX: '20px', alignItems: 'start', justifyContent: 'end', fontSize: '20px', borderRadius: 2 }}>
      <Stack flexDirection={'row'} sx={{ textDecorationColor: 'gray', width: '65%', justifyContent: 'space-between', cursor: 'pointer' }}>
        <MenuBtn selected={selected} setSelected={setSelected} number={18} menu='Бүгд'/>
        <MenuBtn selected={selected} setSelected={setSelected} number={10} menu='Нийтэлсэн'/>
        <MenuBtn selected={selected} setSelected={setSelected} number={4} menu='Ноорог'/>
        <MenuBtn selected={selected} setSelected={setSelected} number={2} menu='Архив'/>
        <MenuBtn selected={selected} setSelected={setSelected} number={2} menu='Төлөвлөсөн'/>
      </Stack>
    </Stack>
  )
}