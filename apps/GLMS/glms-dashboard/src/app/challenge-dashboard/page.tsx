'use client';
import { Container, Stack } from '@mui/material';
import { Button } from './_components';

const DashboardOtherLab = () => {
  return (
    <Stack width={'100%'}>
      <Container maxWidth="xl" sx={{ display: 'flex', gap: '20px', mt: '80px' }}>
        <Button disabled={false} label="button" onClick={() => console.log('clicked')} h={80} />
        <Button disabled label="Click Me" radius={30} h={20} w={40} fontSize={5}></Button>
        <Button disabled label="Click Me" h={50} w={200} radius={100} color="#18ba51"></Button>
        <Button label="Button"></Button>
        <Button label="Button" color="#28282B"></Button>
      </Container>
    </Stack>
  );
};
export default DashboardOtherLab;
