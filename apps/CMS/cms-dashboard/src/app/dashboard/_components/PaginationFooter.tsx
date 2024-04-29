'use client';
import * as React from 'react';
import Stack from '@mui/material/Stack';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import { PreviousPageIcon } from './PreviousPageIcon';
import { NextPageIcon } from './NextPageIcon';

export const PaginationFooter = () => {
  return (
    <Stack width={'100%'} data-cy="pagination-footer-cy-id">
      <Pagination
        count={2}
        shape="rounded"
        sx={{
          '.MuiPaginationItem-rounded': {
            padding: 0,
          },
          '.MuiPagination-ul': {
            'li:first-of-type': {
              flexGrow: 1,
            },
            'li:last-of-type': {
              flexGrow: 1,
              display: 'flex',
              justifyContent: 'flex-end',
            },
            justifyContent: 'space-between',
          },
        }}
        renderItem={(item) => <PaginationItem slots={{ previous: PreviousPageIcon, next: NextPageIcon }} {...item} />}
      />
    </Stack>
  );
};
