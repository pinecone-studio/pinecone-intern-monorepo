'use client';
import { Stack } from '@mui/material';
import SignUpModal from './articles/_components/_signupComps/SignUpModal';
import Image from 'next/image';
const Home = () => {
  return (
    <Stack width={'100%'} height={'100vh'} flexDirection={'row'}>
      <Stack width={'50%'} height={'100%'} justifyContent={'center'} alignItems={'center'}>
        <Stack width={400}>
          <SignUpModal />
        </Stack>
      </Stack>
      <Stack width={'50%'} height={'100%'} justifyContent={'center'} alignItems={'center'} bgcolor={'primary.main'}>
        <Stack alignItems={'flex-end'}>
          <Stack flexDirection={'row'} gap={1}>
            <Image src={'/Academy.svg'} alt="Pinecone logo" height={128} width={440} />
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Home;
