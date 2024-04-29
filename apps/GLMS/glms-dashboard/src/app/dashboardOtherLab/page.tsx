'use client';
import { Button, Container, Grid, Stack, Typography } from '@mui/material';
import { Add } from '@mui/icons-material';
import { Book } from './assets/Book';
import Courses from './_components/Course';
import { useState } from 'react';
import { AddChallengeModal } from '../challenge-dashboard/_feature/AddChallengeModal';
import { useRouter } from 'next/navigation';
import { useGetCoursesQuery } from '@/generated/index';

const buttonsBottom = ['Хичээл', 'Ноорог', 'Архив'];

const DashboardOtherLab = () => {
  const {data} = useGetCoursesQuery() 
  const router = useRouter();
  const [actionTab, setActionTab] = useState('Хичээл');

  return (
    <Stack data-testid="outerStack" bgcolor={'#ECEDF0'} minHeight={'100vh'} data-cy="Dashboard-Lab-Page">
      <Stack bgcolor={'white'} width={'100%'}>
        <Stack borderBottom={'1px solid #0000001A'} borderTop={'1px solid #0000001A'}>
          <Container maxWidth="xl" sx={{ display: 'flex' }}>
            <Stack width={'50%'} py={'34px'} gap={4}>
              <Stack>
                <Typography data-testid="title1" color={'#121316'} fontSize={36} fontWeight={500}>
                  {'Сайн уу?'}
                </Typography>
                <Typography data-testid="title2" color={'#121316'} fontSize={36} fontWeight={700}>
                  {'Өдрийн мэнд'}
                </Typography>
              </Stack>
              <Stack direction={'row'} gap={2}>
                <Button
                  data-testid="button1"
                  onClick={() => router.push('/create-course')}
                  variant="outlined"
                  color="inherit"
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    border: 'solid 2px #121316',
                    borderRadius: '8px',
                    gap: '2px',
                    '&:hover': { background: 'black', color: 'white' },
                  }}
                  endIcon={<Add />}
                >
                  Хичээл
                </Button>
                <AddChallengeModal />
              </Stack>
            </Stack>
            <Stack width={'50%'} alignItems={'center'}>
              <Book />
            </Stack>
          </Container>
        </Stack>
        <Stack borderBottom={'1px solid #0000001A'}>
          <Container maxWidth="xl">
            {buttonsBottom.map((name) => (
              <Button
                data-testid="tab1"
                data-cy={name}
                onClick={() => {
                  setActionTab(name);
                }}
                key={name}
                variant="text"
                size="large"
                color="inherit"
                sx={{ borderBottom: `${actionTab == name ? '2px solid #121316' : null}`, borderRadius: '0px' }}
              >
                {name}
              </Button>
            ))}
          </Container>
        </Stack>
      </Stack>
      <Stack width={'100%'}>
        <Container maxWidth="xl">
          <Grid container width={'100%'}>
            {data?.getCourses
              .map((data) => (
                <Grid item xs={12} sm={6} md={4} lg={3} xl={3} key={data.title} p={1}>
                  <Courses id={data.id} thumbnail={data.thumbnail} title={data.title} description={data.description} position={data.position} />
                </Grid>
              ))}
          </Grid>
        </Container>
      </Stack>
    </Stack>
  );
};
export default DashboardOtherLab;
