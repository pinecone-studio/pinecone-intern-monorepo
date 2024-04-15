'use client';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Button, Card, Stack, TextField, Typography } from '@mui/material';
export default function SignIn() {
  return (
    <Stack data-testid="signin-article-detail" direction="row" width="100%" height="1150px">
      <Stack width="50%" justifyContent="center" alignItems="center">
        <Card sx={{ maxWidth: '440px', padding: '40px' }}>
          <Stack direction="column" gap="24px" textAlign="center">
            <Typography data-testid="title" fontSize="36px" fontWeight="700">
              Нэвтрэх
            </Typography>
            <TextField data-testid="text-data-email" placeholder="Имэйл эсвэл утасны дугаар" type="text" />
            <TextField data-testid="text-data-password" placeholder="Нууц үгээ оруулна уу" type="password" />
            <Button data-testid="btn" variant="contained" sx={{ width: '360px', padding: '20px 16px', bgcolor: 'black' }}>
              <Typography display="flex" fontSize="16px" fontWeight="600" width="100%" justifyContent="end">
                Дараах
                <ArrowForwardIcon sx={{ ml: '120px' }} />
              </Typography>
            </Button>
          </Stack>
        </Card>
      </Stack>
      <Stack width="50%">
        <img data-testid="img" width="100%" height="100%" src="Image.png" alt="" />
      </Stack>
    </Stack>
  );
}
