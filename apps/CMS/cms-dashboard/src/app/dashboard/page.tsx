import { Container, Stack } from '@mui/material';
import React from 'react';
import DashBoardArticleDetail from './_components/DashboardTableDetail';
import SearchInput from './_components/SearchInput';
import { Navbar } from './_components/Navbar';
import { FooterButtons, MenuBar } from './_features';
import DashboardTable from './_components/DashboardTable';
import { FilterByDate } from './_components/FilterByDate';

const Home = () => {
  return (
    <>
      <Stack bgcolor={'#ECEDF0'}>
        <Navbar />

        <Container sx={{ p: 3 }}>
          <Stack gap={2.5}>
            <Stack gap={0.7}>
              <Stack direction={'row'} justifyContent={'space-between'}>
                <SearchInput />
                <FilterByDate />
              </Stack>
              <MenuBar />
            </Stack>

            <Stack bgcolor={'#FFF'} height={'68vh'} borderRadius={2}>
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
