import { Stack, Typography } from '@mui/material';
import Link from 'next/link';
import React from 'react';

type FooterButtonWithIconProps = {
  text: string;
  icon: JSX.Element;
};

export const FooterButtonWithIcon = (props: FooterButtonWithIconProps) => {
  const { text, icon } = props;
  return (
    // TODO: When server implementation need to change href of Link
    <Link href={'/'}>
      <Stack direction={'row'} borderRadius={'50px'} padding={2} gap={1} justifyContent={'center'} alignItems={'center'} sx={{ color: '#fff', backgroundColor: '#121316', cursor: 'pointer' }}>
        {icon}
        <Typography>{text}</Typography>
      </Stack>
    </Link>
  );
};
