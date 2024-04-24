'use client';
import { Stack } from "@mui/material";
import PublishLeftSide from "../_components/PublishLeftSide";

const CreateArticle = () => {
  return (
    <Stack width={'100%'} height={'100vh'} flexDirection={'row'} data-cy="create-article">
      <PublishLeftSide/>
    </Stack>
  );
};

export default CreateArticle;
