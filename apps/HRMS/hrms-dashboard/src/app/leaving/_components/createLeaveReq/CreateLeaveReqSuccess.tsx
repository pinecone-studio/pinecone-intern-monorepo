import { Clear } from '@mui/icons-material';
import { Box, IconButton, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import { MouseEventHandler } from 'react';

type CreateLeaveReqSuccessProps = {
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
};

export const CreateLeaveReqSuccess = (props: CreateLeaveReqSuccessProps) => {
  const { onClick } = props;
  return (
    <Stack>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Clear sx={{ visibility: 'hidden' }} />
        <IconButton onClick={onClick}>
          <Clear sx={{ color: '#121316' }} />
        </IconButton>
      </Box>
      <Stack sx={{ padding: '24px', alignItems: 'center', gap: '16px' }}>
        <Image src={'/creationSucceed.png'} alt="Succeeded" width={60} height={60} />
        <Typography fontSize={18} fontWeight={600} color={'#121316'}>
          Чөлөөний хүсэлт амжилттай илгээгдлээ
        </Typography>
      </Stack>
    </Stack>
  );
};
