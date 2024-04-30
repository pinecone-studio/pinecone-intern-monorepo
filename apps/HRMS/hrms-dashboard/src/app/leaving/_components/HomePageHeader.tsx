'use client';

import { Box, IconButton } from '@mui/material';
import { useContext } from 'react';
import { Typography } from '@mui/material';
import { LeaveReqCreationContext } from '../_providers/LeaveReqCreationProvider';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';

export const HomePageHeader = () => {
  const { setIsOpen } = useContext(LeaveReqCreationContext);

  const handleOpen = () => setIsOpen(true);

  return (
    <Box sx={{ width: '100%', bgcolor: 'white', paddingY: '20px', paddingX: '24px', borderRadius: '12px' }}>
      <Box display={'flex'} justifyContent={'space-between'} sx={{ gap: '12px' }}>
        <Typography fontSize={24} fontWeight={700} color={'primary.main'} sx={{ flexBasis: '0', flexGrow: '1' }}>
          Нүүр хуудас
        </Typography>
        <IconButton
          data-cy="open-request"
          data-testid="open-request-btn"
          onClick={handleOpen}
          sx={{
            borderRadius: '8px',
            paddingY: '8px',
            paddingX: '12px',
            bgcolor: 'primary.main',
            display: 'flex',
            gap: '4px',
            '&:hover': { backgroundColor: 'primary.main' },
          }}
        >
          <Typography fontSize={14} fontWeight={600} color={'white'} sx={{ paddingY: '2px', paddingX: '4px' }}>
            Чөлөөний хуудас бөглөх
          </Typography>
          <InsertDriveFileOutlinedIcon sx={{ width: '20px', height: '20px', color: 'white' }} />
        </IconButton>
      </Box>
    </Box>
  );
};
