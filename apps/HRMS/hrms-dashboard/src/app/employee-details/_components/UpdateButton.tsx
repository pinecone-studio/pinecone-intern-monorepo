import React from 'react';
import { Button, Stack, Typography } from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';

export const UpdateButton = () => {
  return (
    <Button data-testid="update-button" sx={{ bgcolor: '#F6F6F6', padding: '8px 10px', borderRadius: '8px', display: 'flex', gap: '8px' }}>
      <Stack data-testid="createIcon">
        <CreateIcon fontSize="small" sx={{ color: 'black' }} />
      </Stack>
      <Typography sx={{ color: 'black', fontSize: '14px', alignItems: 'center' }} fontWeight={450}>
        Засварлах
      </Typography>
    </Button>
  );
};
