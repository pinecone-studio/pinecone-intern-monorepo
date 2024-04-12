import { Container, Stack } from '@mui/material';
import React from 'react';
import DashboardTable from './_components/DashboardTable';
import { FooterButtons, MenuBar } from './_features';
import DashBoardArticleDetail from './_components/DashboardTableDetail';
import SearchInput from './_components/SearchInput';
import { Navbar } from './_components/Navbar';

const Home = () => {
  return (
    <>
      <Stack bgcolor={'#ECEDF0'}>
        <Navbar />

        <Container sx={{ p: 3 }}>
          <Stack gap={4}>
            <SearchInput />

            <MenuBar />

            <Stack bgcolor={'#FFF'} height={'61vh'} borderRadius={2}>
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
