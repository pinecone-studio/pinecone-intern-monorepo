
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

import { Card } from '@mui/material';

const DeleteButton = () => {
  return (
    <Card sx={{ padding: '16px' }}>
      <DeleteOutlinedIcon sx={{ color: 'black' }} />
    </Card>
  );
};

export default DeleteButton;
