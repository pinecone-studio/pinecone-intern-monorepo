import React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import LocationOn from '@mui/icons-material/LocationOn';
import WorkOutline from '@mui/icons-material/WorkOutline';
import LocalPhone from '@mui/icons-material/LocalPhone';
import Email from '@mui/icons-material/Email';
import { UpdateButton } from './UpdateButton';
import { Employee } from '../../../generated';

export const PersonalInformation = (props: Employee) => {
  const boxStyle = {
    gap: '10px',
    display: 'flex',
  };

  const { lastName, email } = props;
  return (
    <Stack sx={{ maxWidth: '358px', borderRadius: '20px', display: 'flex', flexDirection: 'column', gap: '40px' }}>
      <Box sx={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography fontSize={'18px'} fontWeight={525} data-testid="personal-Information-test">
          Хувийн мэдээлэл
        </Typography>
        <UpdateButton data-testid="updateButton-component" />
      </Box>
      <Stack borderRadius={'50%'} width={'50%'} sx={{ aspectRatio: 1 / 1 }} margin={'auto'} position={'relative'} overflow={'hidden'}>
        <Image alt="profile picture" style={{ objectFit: 'cover' }} fill sizes="medium" src={'/profile.png'} />
      </Stack>
      <Typography data-testid="lastName-text" sx={{ fontSize: '18px', color: '#000000', display: 'flex', justifyContent: 'center' }} fontWeight={525}>
        {lastName}
      </Typography>
      <Stack sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', gap: '16px', paddingLeft: '60px', fontWeight: 'light' }}>
        <Box sx={boxStyle}>
          <WorkOutline fontSize="small" />
          <Typography fontWeight={400}>Software engineer</Typography>
        </Box>
        <Box sx={boxStyle}>
          <LocalPhone fontSize="small" />
          <Typography data-testid="phoneNumber-text">+97680556021</Typography>
        </Box>
        <Box sx={boxStyle}>
          <Email fontSize="small" />
          <Typography data-testid="email-text">{email}</Typography>
        </Box>
        <Box sx={boxStyle}>
          <LocationOn />
          <Typography data-testid="address-text">Ulaanbaatar ,Mongolia</Typography>
        </Box>
      </Stack>
    </Stack>
  );
};
