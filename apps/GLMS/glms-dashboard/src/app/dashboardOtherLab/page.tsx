'use client';
import { Button, Container, Grid, Stack, Typography } from '@mui/material';
import { Add } from '@mui/icons-material';
import { Book } from './assets/Book';
import Course from './_components/Course';

const data = [
  { image: 'js.png', title: 'hii', information: 'welcome to my course', lessonCount: 34 },
  { image: 'js.png', title: 'hii', information: 'welcome to my course but first you have to drink some vodka ', lessonCount: 34 },
  { image: 'js.png', title: 'hii', information: 'welcome to my course', lessonCount: 34 },
  { image: 'js.png', title: 'hii', information: 'welcome to my course', lessonCount: 34 },
  { image: 'js.png', title: 'hii', information: 'welcome to my course', lessonCount: 34 },
];

export default function DashboardOtherLab() {
  return (
    <Stack data-testid="outerStack" bgcolor={'#ECEDF0'} minHeight={'100vh'}>
      <Stack bgcolor={'white'} width={'100%'}>
        <Stack borderBottom={'1px solid #0000001A'} borderTop={'1px solid #0000001A'}>
          <Container maxWidth="lg" sx={{ display: 'flex' }}>
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
                  variant="outlined"
                  color="inherit"
                  sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', border: 'solid 2px #121316', borderRadius: '8px', gap: '2px' }}
                >
                  {'Хичээл'} <Add />
                </Button>
                <Button
                  data-testid="button2"
                  variant="outlined"
                  color="inherit"
                  sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', border: 'solid 2px #121316', borderRadius: '8px', gap: '2px' }}
                >
                  {'Сорил'} <Add />
                </Button>
              </Stack>
            </Stack>
            <Stack width={'50%'} alignItems={'center'}>
              <Book />
            </Stack>
          </Container>
        </Stack>
        <Stack borderBottom={'1px solid #0000001A'}>
          <Container>
            <Button data-testid="tab1" variant="text" size="large" color="inherit" sx={{ borderBottom: '2px solid #121316', borderRadius: '0px' }}>
              {'Хичээл'}
            </Button>
            <Button data-testid="tab2" variant="text" size="large" color="inherit" sx={{ borderBottom: '2px solid #121316', borderRadius: '0px' }}>
              {'Хичээл'}
            </Button>
            <Button data-testid="tab3" variant="text" size="large" color="inherit" sx={{ borderBottom: '2px solid #121316', borderRadius: '0px' }}>
              {'Хичээл'}
            </Button>
          </Container>
        </Stack>
      </Stack>
      <Stack width={'100%'}>
        <Container maxWidth="lg" sx={{ py: 3 }}>
          <Grid container spacing={4}>
            {data.map((data) => (
              <Grid item lg={3} md={4} sm={6} xs={12} key={data.title}>
                <Course image={data.image} title={data.title} information={data.information} lessonCount={data.lessonCount} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Stack>
    </Stack>
  );
}
