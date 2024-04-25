import { Button } from '@mui/material';
import { useDeclineRequestMutation } from '../../../generated';
import { useRouter } from 'next/navigation';

const DeclineButton = ({ id }) => {
  const router = useRouter();
  const [decline] = useDeclineRequestMutation();

  const handleDecline = async () => {
    await decline({ variables: { id } });
    router.push('/leaving');
  };

  return (
    <Button
      variant="text"
      onClick={handleDecline}
      sx={{ color: 'black', height: '30px', border: '1px solid rgba(214, 216, 219, 1)', '&:hover': { bgcolor: 'black', color: 'white' } }}
      data-testid="decline-button"
    >
      Татгалзах
    </Button>
  );
};

export default DeclineButton;
