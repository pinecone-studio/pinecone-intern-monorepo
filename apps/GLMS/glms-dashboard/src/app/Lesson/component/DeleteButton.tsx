  import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
  import { Card } from '@mui/material';

  const DeleteButton = () => {
    return (
      <Card data-testid="delete-button-test-id" sx={{ padding: '16px' }}>
        <DeleteOutlinedIcon sx={{ color: 'black' }} />
      </Card>
    );
  };

  export default DeleteButton;
