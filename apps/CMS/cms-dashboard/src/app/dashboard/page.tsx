import React from 'react';
import { MenuBar } from './_features';
import { Stack } from '@mui/material';


const Home = () => {
  return (
    <Stack sx={{ width: '100%', height: '500px', backgroundColor: 'gray' }}>
      <div>Welcome to Cms Dashboard hello </div>
      <MenuBar />
    </Stack>
  ); 
};
export default Home;
