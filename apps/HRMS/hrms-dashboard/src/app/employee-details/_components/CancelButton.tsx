import { Button, Typography } from '@mui/material';

export const CancelButton = () => {
  return (
    <Button sx={{ bgcolor: '#D6D8DB', padding: '8px 10px', borderRadius: '8px', display: 'flex', gap: '8px', border: '1', borderColor: '#Border/BorderSubtle01' }}>
      <Typography sx={{ color: 'black', fontSize: '16px', fontWeight: '600', alignItems: 'center' }}>Цуцлах</Typography>
    </Button>
  );
};
