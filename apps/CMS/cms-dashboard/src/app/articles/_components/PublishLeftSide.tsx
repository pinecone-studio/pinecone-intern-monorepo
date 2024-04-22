'use client';
import { Stack, TextField, Typography } from '@mui/material';
import { NavigateBefore } from '@mui/icons-material';

const PublishLeftSide = () => {
  return (
    <Stack width={'100%'} height={'100vh'} flexDirection={'column'} pl={12} pt={8} pr={10} gap={6} bgcolor={'#F7F7F8'}>
      <Stack gap={2}>
        <NavigateBefore data-testid="publish-arrowIcon" color="primary" />
        <Stack flexDirection={'column'} gap={2}>
          <Typography fontSize={18}>Гарчиг өгөх</Typography>
          <TextField sx={{  height: '64px', backgroundColor: "white" ,}} fullWidth placeholder="Энд гарчгаа бичнэ үү..." />
        </Stack>
      </Stack>

      <Stack flexDirection={'column'}  gap={2}>
        <Typography fontSize={18}>Нийтлэлээ бичих</Typography>
        <TextField multiline sx={{ alignItems: 'center', borderRadius: '16px', height: '237px', backgroundColor:"white", borderColor:"#fff", border:"none"  }} fullWidth placeholder="Бичиж эхлэх..." inputProps={{style:{ color:"green", height:'230px', border:'none'}}}  />
        
      </Stack>
    </Stack>
  );
};
export default PublishLeftSide;
