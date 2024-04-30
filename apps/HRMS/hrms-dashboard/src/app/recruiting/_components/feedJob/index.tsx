import { Grid } from '@mui/material';
import { Button } from '../core';
import { useRouter } from 'next/navigation';

const containerStyle = { container: 'inherit', marginBlock: '24px', marginInline: '32px', backgroundColor: 'white', borderRadius: '12px' };

export const JobRecruitDashboard = () => {
  const router = useRouter();
  const addRecruit = () => {
    router.push('/recruiting/add-job');
  };
  return (
    <div style={containerStyle}>
      <Grid sx={{ paddingInline: '24px', paddingTop: '16px' }}>
        <Grid sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{ fontSize: '18px', fontWeight: 700 }}> Ажлын зар</h1>
          <div data-testid="jobAdd-button">
            <Button label="Зар нэмэх" plusIcon onClick={addRecruit} />
          </div>
        </Grid>
      </Grid>
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', paddingInline: '24px', height: '56px' }}>
          <p style={{ fontSize: '14px', paddingBlock: '4px', fontWeight: 500 }}>Зар</p>
          <p style={{ fontSize: '14px', paddingBlock: '4px' }}>Ирсэн өргөдөл</p>
        </div>
      </div>
      <div style={{ borderTop: '1px solid #ECEDF0', width: '100%' }}></div>
    </div>
  );
};
