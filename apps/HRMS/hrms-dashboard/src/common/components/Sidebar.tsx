'use client';
import { Stack, Typography } from '@mui/material';
import { usePathname, useRouter } from 'next/navigation';
import { Window, ContentPaste, Report, Tag } from '@mui/icons-material';

const sidebarItems = [
  { text: 'Нүүр хуудас', icon: <Window />, pathName: '/' },
  { text: 'Ажилчид', icon: <ContentPaste />, pathName: '/employee-details' },
  { text: 'Чөлөө', icon: <Report />, pathName: '/leaving' },
  { text: 'Ажлын зар', icon: <Tag />, pathName: '/recruiting' },
];

export const Sidebar = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <Stack data-cy="dashboardSidebar" minWidth={242} bgcolor={'common.white'} height={'100vh'} pt={2}>
      {sidebarItems.map((item, index) => {
        return (
          <Stack
            key={index}
            data-cy={`sidebarItem-${index}`}
            onClick={() => {
              router.push(item.pathName);
            }}
            bgcolor={pathname == item.pathName ? '#1C202414' : 'common.white'}
            sx={{ cursor: 'pointer' }}
            flexDirection={'row'}
            alignItems={'center'}
            justifyContent={'start'}
          >
            <Stack py={1} px={2} fontSize={18}>
              {item.icon}
            </Stack>
            <Typography py={'10px'} color={'primary.main'} fontSize={16} fontWeight={600}>
              {item.text}
            </Typography>
          </Stack>
        );
      })}
    </Stack>
  );
};
