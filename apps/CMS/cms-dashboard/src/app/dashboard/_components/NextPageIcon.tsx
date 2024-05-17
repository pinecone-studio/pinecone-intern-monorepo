import React from 'react';
import { Stack } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export const NextPageIcon = () => {
  return (
    <Stack
      data-testid="next-page-icon-test-id"
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
      bgcolor={'#FFF'}
    >
      <Stack fontWeight={600} color={'#121316'}>
        Next
      </Stack>
      <ArrowForwardIcon />
    </Stack>
  );
};
