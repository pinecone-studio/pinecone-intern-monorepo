import { Card, Typography } from '@mui/material';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';

const EditButton = () => {
  return (
    <Card data-testid="edit-button-test-id" sx={{ display: 'flex', gap: '8px', padding: '20px 16px' }}>
      <Typography fontSize="18px" fontWeight="600">
        Ерөнхийн мэдээлэл
      </Typography>
      <CreateOutlinedIcon />
    </Card>
  );
};

export default EditButton;
