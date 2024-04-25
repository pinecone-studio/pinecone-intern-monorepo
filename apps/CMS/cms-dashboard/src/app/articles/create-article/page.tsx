'use client';
import { Stack } from '@mui/material';
import NewArticle from '../_features/create-article/NewArticle';

const CreateArticle = () => {
  return (
    <Stack width={'100%'} height={'100vh'} flexDirection={'row'} data-cy="create-article">
      <NewArticle />
    </Stack>
  );
};

export default CreateArticle;
