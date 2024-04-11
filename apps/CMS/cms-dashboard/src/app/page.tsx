import { Stack, Typography } from '@mui/material';

import Image from 'next/image';
import SignUpModal from './articles/_components/_signupComps/SignUpModal';

const Home = () => {
  return (
    <Stack width={'100%'} height={'100vh'} flexDirection={'row'}>
      <Stack width={'50%'} height={'100%'} justifyContent={'center'} alignItems={'center'}>
        <Stack width={400}>
          <SignUpModal />
        </Stack>
      </Stack>
      <Stack width={'50%'} justifyContent={'center'} alignItems={'center'} bgcolor={'primary.main'}>
        <Stack flexDirection={'column'} alignItems={'flex-end'}>
          <Stack flexDirection={'row'} gap={1} alignItems={'center'}>
            <Stack height={40} position={'relative'} sx={{ aspectRatio: '1/0.9' }}>
              <Image src={'/PineconeLogo.png'} alt="Pinecone logo" fill />
            </Stack>
            <Typography fontSize={50} lineHeight={1} fontWeight={600} color={'primary.contrastText'}>
              Pinecone
            </Typography>
          </Stack>
          <Typography lineHeight={1} fontSize={20} fontWeight={600} color={'#00CC44'}>
            {'< academy />'}
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Home;
