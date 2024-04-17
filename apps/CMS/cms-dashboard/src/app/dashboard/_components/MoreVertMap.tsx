'use client';

import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import LinkOutlinedIcon from '@mui/icons-material/LinkOutlined';
import React from 'react';

const morevert = [
  {
    icons: <VisibilityOutlinedIcon />,
    label: 'Статистик харах',
  },
  {
    icons: <ShareOutlinedIcon />,
    label: 'Хуваалцах',
  },
  {
    icons: <ArchiveOutlinedIcon />,
    label: 'Архив',
  },
  {
    icons: <ModeEditOutlinedIcon />,
    label: 'Засварлах',
  },
  {
    icons: <LinkOutlinedIcon />,
    label: 'Линк хуулах',
  },
];

export default morevert;
