'use client';
import { Card, Container, Stack, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { useGetSectionsQuery } from '@/generated/index';

const Lessen_html = () => {
  const { data, loading, error } = useGetSectionsQuery();

  if (loading)
    return (
      <Stack sx={{ width: '100%', height: '800px' }} justifyContent="center" alignItems="center">
        <Typography fontSize="40px" fontWeight="700">
          Loading...
        </Typography>
      </Stack>
    );
  if (error) return <div>Error: {error.message}</div>;

  return (
    <Stack bgcolor="#F7F7F8">
      <Container maxWidth="xl">
        <Stack direction="row" paddingBottom="94px" paddingTop="32px">
          <ArrowBackIcon />
          <Typography fontSize="18px" fontWeight="600">
            Сэдвүүд
          </Typography>
        </Stack>
        {data?.getSections.map((item) => (
          <Stack key={item.id} paddingY="48px" paddingX="24px" bgcolor="white" borderRadius="12px" gap="24px">
            <Stack direction="row" justifyContent="space-between">
              <Typography fontSize="32px" fontWeight="700">
                {item.title}
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
            <Stack direction="row" gap="97px" justifyContent="space-between">
              <Typography>{item.description}</Typography>
              <img width="306px" height="209px" style={{ borderRadius: '12px', border: '1px' }} src={'html.png'} />
            </Stack>
          </Stack>
        ))}
      </Container>
    </Stack>
  );
};

export default Lessen_html;
