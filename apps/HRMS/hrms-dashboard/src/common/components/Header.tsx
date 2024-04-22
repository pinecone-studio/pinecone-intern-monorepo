'use client';
import { Stack } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
export const Header = () => {
  const router = useRouter();
  return (
    <Stack width={'100%'} flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'} py={0.5} px={3} bgcolor={'primary.main'}>
      <Stack
        onClick={() => {
          router.push('/');
        }}
        alignItems={'center'}
        justifyContent={'center'}
        sx={{ cursor: 'pointer' }}
      >
        <Image alt="logo" height={24} width={32} sizes="small" src={'/logo.png'} />
      </Stack>
      <Stack flexDirection={'row'} gap={2}>
        <Stack p={1} sx={{ cursor: 'pointer' }}>
          <Image alt="waffle icon" width={20} height={20} sizes="small" src={'/waffle.png'} />
        </Stack>
        <Stack borderRadius={'50%'} py={0.25} overflow={'hidden'} sx={{ cursor: 'pointer' }}>
          <Image style={{ objectFit: 'cover' }} alt="profile image" width={32} height={32} sizes="small" src={'/profile.png'} />
        </Stack>
      </Stack>
    </Stack>
  );
};
