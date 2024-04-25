'use client';
import { useState } from 'react';
import { FooterButton } from '../_components/FooterButton';
import { Divider, Stack } from '@mui/material';
import { FooterButtonWithIcon } from '../_components/FooterButtonWithIcon';
import AddIcon from '@mui/icons-material/Add';
import Link from 'next/link';

export const FooterButtons = () => {
  const [selectedButton, setSelectedButton] = useState('Нүүр');
  return (
    <>
      <Stack
        width={746}
        height={96}
        direction={'row'}
        alignItems={'center'}
        paddingY={2}
        paddingX={4}
        boxShadow={'0 0 10px rgba(0, 0, 0, 0.1)'}
        justifyContent={'space-between'}
        sx={{ borderRadius: '50px' }}
      >
        <Link href={'/'}>
          <FooterButton text="Нүүр" selectedButton={selectedButton} setSelectedButton={setSelectedButton} />
        </Link>
        <Link href={'/dashboard'}>
          <FooterButton text="Контент" selectedButton={selectedButton} setSelectedButton={setSelectedButton} />
        </Link>
        <FooterButton text="Сэтгэгдэл" selectedButton={selectedButton} setSelectedButton={setSelectedButton} />
        <FooterButton text="Статистик" selectedButton={selectedButton} setSelectedButton={setSelectedButton} />
        <Divider orientation="vertical" variant="middle" flexItem></Divider>
        <FooterButtonWithIcon text="Контент нэмэх" icon={<AddIcon />} />
      </Stack>
    </>
  );
};
