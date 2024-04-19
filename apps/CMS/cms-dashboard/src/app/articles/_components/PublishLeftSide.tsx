'use client';
import { Stack, TextField, Typography } from '@mui/material';
import { NavigateBefore } from '@mui/icons-material';
const PublishLeftSide = () => {

  return (
    <Stack width={'100%'} height={'100vh'} flexDirection={'row'}>
          <NavigateBefore data-testid="publish-arrowIcon" color="secondary" />
          <Stack sx={{gap:"15px"}}>         
            <Typography fontSize={18}>Гарчиг өгөх</Typography>
            <TextField sx={{padding:"18px 0px 18px 24px", alignItems:"center", borderRadius:"16px", height:"64px"}}  placeholder='Энд гарчгаа бичнэ үү...'/>
          </Stack>
          <Stack sx={{gap:"15px"}}>         
            <Typography fontSize={18}>Нийтлэлээ бичих</Typography>
            <TextField sx={{padding:"18px 0px 18px 24px", alignItems:"center", borderRadius:"16px", height:"64px"}}  placeholder='Энд гарчгаа бичнэ үү...'/>
          </Stack>
          

    </Stack>
  );
};
export default PublishLeftSide;
