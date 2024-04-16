import React from 'react';
import { Stack } from '@mui/material';
import { PersonalInformation } from './_components';

const page = () => {
  return (
    <Stack>
      <PersonalInformation lastName={'М.Ганбат'} email={'Zoloosoko0526@gmail.com'} />
    </Stack>
  );
};

export default page;
