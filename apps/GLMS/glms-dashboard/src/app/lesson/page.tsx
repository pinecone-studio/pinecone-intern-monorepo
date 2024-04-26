import { Container, Stack, Typography } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import AddSection from './_components/AddLesson';

const lesson = () => {
  return (
    <Stack sx={{ backgroundColor: '#ECEDF0', padding: 4, maxHeight: 'screen' }}>
      <Stack data-testid="test-back-stack" sx={{ display: 'flex', flexDirection: 'row', gap: 2, fontSize: 18, padding: 4 }}>
        <KeyboardBackspaceIcon />
        <Typography sx={{ fontWeight: 'bold' }}>HTML Intro</Typography>
      </Stack>
      <AddSection />
      <Typography sx={{ alignSelf: 'center', paddingTop: 8, color: 'rgba(214, 216, 219, 1)' }}>© 2023 Pinecone</Typography>
    </Stack>
  );
};
export default lesson;
