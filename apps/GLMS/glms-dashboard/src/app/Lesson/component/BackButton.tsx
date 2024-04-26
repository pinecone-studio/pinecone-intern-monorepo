import { Button, Stack, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const BackButton = () => {
  return (
    <Stack data-testid="prev-button-test-id" direction="row" paddingBottom="94px" paddingTop="32px">
      <Button sx={{ color: 'black' }}>
        <ArrowBackIcon />
        <Typography fontSize="18px" fontWeight="600">
          Сэдвүүд
        </Typography>
      </Button>
    </Stack>
  );
};

export default BackButton;
