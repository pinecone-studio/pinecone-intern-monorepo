import { Button } from '@mui/material';
import { useApproveRequestMutation } from '../../../generated';
import { useRouter } from 'next/navigation';

const ApproveButton = ({ id }: { id: string }) => {
  const router = useRouter();
  const [approve] = useApproveRequestMutation();

  const handleApprove = async () => {
    await approve({ variables: { id } });
    router.push('/leaving');
  };

  return (
    <Button
      variant="text"
      onClick={handleApprove}
      sx={{ color: 'black', height: '30px', border: '1px solid rgba(214, 216, 219, 1)', '&:hover': { bgcolor: 'black', color: 'white' } }}
      data-testid="approve-button"
    >
      Зөвшөөрөх
    </Button>
  );
};

export default ApproveButton;
