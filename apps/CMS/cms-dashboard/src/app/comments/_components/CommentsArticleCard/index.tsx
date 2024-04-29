import { Box, Input } from '@mui/material';
import React from 'react';
import SendIcon from '@mui/icons-material/Send';

const CommentsArticleCard = () => {
  const ariaLabel = { 'aria-label': 'description' };
  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      sx={{ width: '928px', background: 'white', height: '268px', border: '1px', borderRadius: '16px', padding: '24px 24px 64px 24px', '& > :not(style)': { m: 1 } }}
    >
      <Input placeholder="Цахим хаягаа оруулна уу..." inputProps={ariaLabel} sx={{ color: 'black', width: '880px', height: '60px' }} />
      <Input placeholder="Таны нэр" inputProps={ariaLabel} sx={{ color: 'black', width: '880px', height: '60px' }} />
      <Input placeholder="Энд сэтгэгдлээ бичнэ үү..." inputProps={ariaLabel} sx={{ color: 'black', width: '880px', height: '60px' }} />
      <SendIcon sx={{ height: '24px', width: '24px', display: 'flex', justifyContent: 'end' }} />
    </Box>
  );
};

export default CommentsArticleCard;
