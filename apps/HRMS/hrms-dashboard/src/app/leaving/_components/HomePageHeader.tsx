'use client';

import { Button } from '@mui/material';
import { useContext } from 'react';
import { Container, Typography } from '@mui/material';
import { LeaveReqCreationContext } from '../_providers/LeaveReqCreationProvider';

export const HomePageHeader = () => {
  const { setIsOpen } = useContext(LeaveReqCreationContext);

  const handleOpen = () => setIsOpen(true);

  return (
    <Container>
      <Typography>Нүүр хуудас</Typography>
      <Button data-cy="open-request" data-testid="open-request-btn" onClick={handleOpen}>
        Чөлөөний хуудас бөглөх
      </Button>
    </Container>
  );
};
