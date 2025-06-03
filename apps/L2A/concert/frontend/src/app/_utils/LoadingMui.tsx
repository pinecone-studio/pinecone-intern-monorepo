import * as React from 'react';
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';

const LinearColor = () => {
  return (
    <Stack sx={{ width: '25vh', color: 'grey.500', marginLeft: '-110px' }} spacing={2}>
      <LinearProgress color="primary" />
    </Stack>
  );
};

export default LinearColor;
