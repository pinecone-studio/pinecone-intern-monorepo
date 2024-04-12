import { Container, Stack } from '@mui/material';
import React from 'react';
import DashboardTable from './_components/DashboardTable';
import { FooterButtons, MenuBar } from './_features';
import DashBoardArticleDetail from './_components/DashboardTableDetail';

const Home = () => {
  return (
    <>
      <Stack bgcolor={'#f5f2f2'}>
        <Container sx={{ p: 3 }}>
          <Stack gap={4}>
            <MenuBar />
            <Stack py={4} bgcolor={'#FFF'} height={'80vh'} borderRadius={2}>
              <DashboardTable />
              <DashBoardArticleDetail rate={2} comment={3} share={3} />
            </Stack>

            <Stack alignItems={'center'}>
              <FooterButtons />
            </Stack>
          </Stack>
        </Container>
      </Stack>
    </>
  );
};
export default Home;
