import React from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';
import Image from 'next/image';
const page = () => {
  return (
    <Stack sx={{ maxWidth: '358px' }}>
      <Box sx={{ padding: '20px', display: 'flex', justifyContent: 'space-between' }}>
        <Typography fontSize={'18px'}>Хувийн мэдээлэл</Typography>
        <Button sx={{ bgcolor: '#F6F6F6', padding: '4px 10px', borderRadius: '8px', display: 'flex', gap: '4px' }}>
          <CreateIcon sx={{ color: 'black' }} />
          <Typography sx={{ color: 'black', fontSize: '14px', alignItems: 'center' }}>Засварлах</Typography>
        </Button>
      </Box>
      <Stack borderRadius={'50%'} width={'50%'} sx={{ aspectRatio: 1 / 1 }} margin={'auto'} position={'relative'} overflow={'hidden'}>
        <Image alt="profile picture" style={{ objectFit: 'cover' }} fill sizes="medium" src={'/profile.jpeg'} />
      </Stack>
      <Typography sx={{ fontSize: '18px', color: '#000' }}>М.Ганбат</Typography>
    </Stack>
  );
};

export default page;
