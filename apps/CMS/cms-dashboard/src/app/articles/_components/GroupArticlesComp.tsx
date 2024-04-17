import { IconButton, Stack, Typography } from '@mui/material';
import ArticleCard from './ArticleCard';
import { ArrowDropDown, KeyboardArrowDown } from '@mui/icons-material';

type GroupArticlesCompProps = {
  title: string;
  columnNumber: number;
};

const GroupArticlesComp = (props: GroupArticlesCompProps) => {
  const { title, columnNumber } = props;
  return (
    <Stack p={'40px 24px'} gap={4} bgcolor={'#fff'} borderRadius={2}>
      <Typography fontSize={28} fontWeight={700} color={'primary:main'}>
        {title}
      </Typography>
      <Stack direction={'row'} gap={4}>
        <ArticleCard title="Morphosis" cover="/ganu.jpeg" date="2024.04.16" category="Coding" description="it is just a description" />
        <ArticleCard title="Morphosis" cover="/ganu.jpeg" date="2024.04.16" category="Coding" description="it is just a description" />
      </Stack>
      <Stack width="100%" alignItems="center">
        <IconButton>
          <KeyboardArrowDown sx={{ width: 49, height: 40 }} />
        </IconButton>
      </Stack>
    </Stack>
  );
};

export default GroupArticlesComp;
