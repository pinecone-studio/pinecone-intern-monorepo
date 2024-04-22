'use client';
import { Box, Button, Stack, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useGetRequestByIdQuery } from '../../../generated';
import { useRouter, useSearchParams } from 'next/navigation';
import ApproveButton from '../_components/ApproveButton';
import DeclineButton from '../_components/DeclineButton';
import DetailInfo from '../_components/Info';
import RequestDetails from '../_components/RequestDetails';

const Detail = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const requestId = searchParams.get('requestId');
  const id = requestId || '';

  const { data, loading, error } = useGetRequestByIdQuery({
    variables: { id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <Stack sx={{ display: 'flex', alignItems: 'center', bgcolor: 'rgba(247, 247, 248, 1)', gap: '24px', width: '100vw', height: '100vh' }}>
      <Stack sx={{ display: 'flex', flexDirection: 'row', width: '1218px', justifyContent: 'space-between', alignItems: 'center', bgcolor: 'white', padding: '12px' }}>
        <Button variant="text" onClick={() => router.push('/leaving')} data-testid="back">
          <ArrowBackIcon />
        </Button>
        <Typography>Чөлөөний дэлгэрэнгүй</Typography>
      </Stack>
      <Stack sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '1154px' }}>
        <Stack sx={{ display: 'flex', gap: '18px' }}>
          {data?.getRequestById && <DetailInfo data={data.getRequestById} />}
          <RequestDetails data={data?.getRequestById} />
        </Stack>
        <Stack sx={{ display: 'flex', gap: '18px' }}>
          <Stack sx={{ width: '565px', height: '384px', bgcolor: 'white', borderRadius: '10px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <Box>
              <Typography>Ажлаа шилжүүүлэн өгөх ажилтны нэр</Typography>
              <Typography>-</Typography>
            </Box>
            <Box>
              <Typography sx={{ width: '400px' }}>Ажлаа түр хугацаанд юу юу шилжүүлэн өгч буйгаа товч тэмдэглэнэ үү.</Typography>
              <Typography>-</Typography>
            </Box>
          </Stack>
          <Stack sx={{ display: 'flex', gap: '10px', width: '565px', height: '96px', bgcolor: 'white', borderRadius: '10px', padding: '20px' }}>
            <Typography>Хүсэлт батлах хүн</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
              <Box sx={{ display: 'flex', flexDirection: 'row', gap: '12px' }}>
                <Typography>Бат-Энх</Typography>
                <Typography sx={{ color: 'rgba(22, 169, 74, 1)' }}>{data?.getRequestById?.status}</Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <DeclineButton id={id} />
                <ApproveButton id={id} />
              </Box>
            </Box>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Detail;
