import { Box, Button } from '@mui/material';
import React from 'react';
import SendIcon from '@mui/icons-material/Send';
import { FormInput } from '../../../sign-up/_components';

const CommentsArticleCard = () => {
  return (
    <Box
      data-testid="comments-input-form-container"
      component="form"
      noValidate
      autoComplete="off"
      sx={{ width: '928px', background: 'white', height: '268px', border: '1px', borderRadius: '16px', padding: '24px 24px 64px 24px', '& > :not(style)': { m: 1 } }}
    >
      <FormInput data-cy="Email-Input" name="email" placeholder="Цахим хаягаа оруулна уу..." variant="standard" type="text" />
      <FormInput data-cy="Name-Input" name="name" placeholder="Цахим хаягаа оруулна уу..." variant="standard" type="text" />
      <FormInput data-cy="Desciption-Input" name="description" placeholder="Энд сэтгэгдлээ бичнэ үү..." variant="standard" type="text" />
      <Button variant="contained" endIcon={<SendIcon />}>
        Send
      </Button>
    </Box>
  );
};

export default CommentsArticleCard;
