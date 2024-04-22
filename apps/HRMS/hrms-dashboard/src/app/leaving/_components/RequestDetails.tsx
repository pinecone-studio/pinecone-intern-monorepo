import { Stack, Typography } from '@mui/material';

const RequestDetails = ({ data }) => (
  <Stack sx={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '565px', height: '312px', bgcolor: 'white', borderRadius: '10px', padding: '20px' }} data-testid="request-details">
    <Typography sx={{ color: 'rgba(63, 65, 69, 1)' }}>Хугацааны төрөл</Typography>
    <Typography sx={{ fontWeight: '600', color: 'rgba(18, 19, 22, 1)' }}>{data.description}</Typography>
    <Typography sx={{ color: 'rgba(63, 65, 69, 1)' }}>Хэдэн өдрөөр тооцон авах</Typography>
    <Typography sx={{ fontWeight: '600', color: 'rgba(18, 19, 22, 1)' }}>{data.description}</Typography>
    <Typography sx={{ color: 'rgba(63, 65, 69, 1)' }}>Эхлэх хугацаа</Typography>
    <Typography sx={{ fontWeight: '600', color: 'rgba(18, 19, 22, 1)' }}>{data.description}</Typography>
    <Typography sx={{ color: 'rgba(63, 65, 69, 1)' }}>Дуусах хугацаа</Typography>
    <Typography sx={{ fontWeight: '600', color: 'rgba(18, 19, 22, 1)' }}>{data.description}</Typography>
  </Stack>
);
export default RequestDetails;
