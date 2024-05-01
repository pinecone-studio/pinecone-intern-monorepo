import { Box, Typography } from '@mui/material';

type DetailData = {
  _id?: string | null;
  declinedReasoning?: string | null;
};

const DetailInfo = ({ data }: { data: DetailData }) => (
  <Box sx={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '565px', height: '168px', bgcolor: 'white', borderRadius: '10px', padding: '20px' }}>
    <Box>
      <Typography sx={{ color: 'rgba(63, 65, 69, 1)' }}>Нэр</Typography>
      <Typography sx={{ fontWeight: '600', color: 'rgba(18, 19, 22, 1)' }}>{data._id}</Typography>
    </Box>
    <Box>
      <Typography sx={{ color: 'rgba(63, 65, 69, 1)' }}>Шалтгаан</Typography>
      <Typography sx={{ fontWeight: '600', color: 'rgba(18, 19, 22, 1)' }}>{data.declinedReasoning}</Typography>
    </Box>
  </Box>
);

export default DetailInfo;
