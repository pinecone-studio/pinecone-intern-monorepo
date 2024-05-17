import React from 'react';
import { Stack } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export const PreviousPageIcon = () => {
  return (
    <Stack
      data-testid="previous-page-icon-test-id"
      direction={'row'}
      justifyContent={'centers'}
      alignItems={'center'}
      gap={1}
      width={'100%'}
      height={'100%'}
      border={'1px solid #D6D8DB'}
      borderRadius={'10px'}
      paddingY={1}
      px={2}
      bgcolor={'#fff'}
    >
      <ArrowBackIcon />
      <Stack fontWeight={600} color={'#121316'}>
        Prev
      </Stack>
    </Stack>
  );
};
