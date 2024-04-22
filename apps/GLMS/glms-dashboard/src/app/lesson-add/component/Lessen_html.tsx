import { Card, Container, Stack, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
const Lessen_html = () => {
  return (
    <Stack bgcolor="#F7F7F8">
      <Container maxWidth="xl">
        <Stack direction="row" paddingBottom="94px" paddingTop="32px">
          <ArrowBackIcon />
          <Typography fontSize="18px" fontWeight="600">
            Сэдвүүд
          </Typography>
        </Stack>
        <Stack paddingY="48px" paddingX="24px" bgcolor="white" borderRadius="12px" gap="24px">
          <Stack direction="row" justifyContent="space-between">
            <Typography fontSize="32px" fontWeight="700">
              HTML Intro
            </Typography>
            <Stack direction="row" gap="16px">
              <Card sx={{ display: 'flex', gap: '8px', padding: '20px 16px' }}>
                <Typography fontSize="18px" fontWeight="600">
                  Ерөнхийн мэдээлэл
                </Typography>
                <CreateOutlinedIcon />
              </Card>
              <Card sx={{ padding: '16px' }}>
                <DeleteOutlinedIcon sx={{ color: 'black' }} />
              </Card>
            </Stack>
          </Stack>
          <Stack direction="row" gap="97px">
            <Typography>
              HTML-ийн үндсэн ойлголтуудыг сурч, эхнээс нь үндсэн вэбсайтуудыг зохион бүтээж, бүр байгуулж эхлээрэй. HTML-ийн тусламжтайгаар та вэбсайтуудын бүтэц, агуулгын талаар ойлголттой болно.
              Энэ нь хэрэглэгчийн туршлагыг бүрдүүлдэг гарчиг, догол мөр, зураг, холбоос зэрэг элементүүдийг тодорхойлдог хэл юм. HTML-тэй танилцсанаар та эдгээр элементүүд хэрхэн нэгдэж, нэгдмэл,
              сонирхол татахуйц вэб хуудсыг бий болгохыг ойлгох боломжтой болно.
            </Typography>
            <img width="306px" height="209px" flex-shrink="0" style={{ borderRadius: '12px' }} src="" />
          </Stack>
        </Stack>
      </Container>
    </Stack>
  );
};
export default Lessen_html;
