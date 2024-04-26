import { Stack } from '@mui/material';
import Image from 'next/image';
import SignInForm from './_features/SignInForm';

const SignIn = () => {
  return (
    <div>
      <Stack width={'100%'} height={'100vh'} flexDirection={'row'} data-cy="Article-Page">
        <Stack width={'50%'} height={'100%'} justifyContent={'center'} alignItems={'center'}>
          <SignInForm />
        </Stack>
        <Stack width={'50%'} height={'100%'} justifyContent={'center'} alignItems={'center'} bgcolor={'#121316'}>
          <Stack alignItems={'flex-end'}>
            <Stack flexDirection={'row'} gap={1}>
              <Image src={'/Academy.svg'} alt="Pinecone logo" height={128} width={440} />
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </div>
  );
};

export default SignIn;
