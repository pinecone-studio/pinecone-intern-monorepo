import { Button, Typography } from '@mui/material';

export const SaveButton = () => {
  return (
    <Button sx={{ bgcolor: '##121316', padding: '8px 10px', borderRadius: '8px', display: 'flex', gap: '8px' }}>
      <Typography sx={{ color: '#FFFFFF', fontSize: '16px', fontWeight: '600', alignItems: 'center' }}>Цуцлах</Typography>
    </Button>
  );
};
