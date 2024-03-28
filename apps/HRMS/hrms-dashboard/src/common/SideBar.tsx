'use client';

import { ContentPasteRounded, GridViewRounded, ListAlt, Settings } from '@mui/icons-material';
import { Stack } from '@mui/material';
import { usePathname, useRouter } from 'next/navigation';

export const AdminSideBar = () => {
  const data = [
    {
      icons: <GridViewRounded />,
      label: 'Нүүр хуудас',
      pathname: '/',
    },
    {
      icons: <ContentPasteRounded />,
      label: 'Ажилчид',
      pathname: '/',
    },
    {
      icons: <ListAlt />,
      label: 'Чөлөө',
      pathname: '/',
    },
    { icons: <Settings />, label: 'Ажлын зар', pathname: '/' },
  ];

  const router = useRouter();
  const pathname = usePathname();

  return <Stack></Stack>;
};
