import { Stack, Typography } from '@mui/material';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import LinkOutlinedIcon from '@mui/icons-material/LinkOutlined';

const MoreOverlay = () => {
  return (
    <Stack width={190} border={1} bgcolor={'white'} borderRadius={2} p={1.1}>
      <Stack direction={'row'} gap={1.5} p={1}>
        <VisibilityOutlinedIcon />
        <Typography fontSize={14} fontWeight={400} color={'#121316'}>
          Статистик харах
        </Typography>
      </Stack>
      <Stack direction={'row'} gap={1.5} p={1}>
        <ShareOutlinedIcon />
        <Typography fontSize={14} fontWeight={400} color={'#121316'}>
          Хуваалцах
        </Typography>
      </Stack>
      <Stack direction={'row'} gap={1.5} p={1}>
        <ArchiveOutlinedIcon />
        <Typography fontSize={14} fontWeight={400} color={'#121316'}>
          Архив
        </Typography>
      </Stack>
      <Stack direction={'row'} gap={1.5} p={1}>
        <ModeEditOutlinedIcon />
        <Typography fontSize={14} fontWeight={400} color={'#121316'}>
          Засварлах
        </Typography>
      </Stack>
      <Stack direction={'row'} gap={1.5} p={1}>
        <LinkOutlinedIcon />
        <Typography fontSize={14} fontWeight={400} color={'#121316'}>
          Линк хуулах
        </Typography>
      </Stack>
    </Stack>
  );
};

export default MoreOverlay;
