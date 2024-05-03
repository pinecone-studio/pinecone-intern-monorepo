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
    <button onClick={handleApprove} className="text-black h-30 border border-gray-300 rounded-sm hover:bg-black hover:text-white" style={{ padding: 'revert' }} data-testid="approve-button">
      Зөвшөөрөх
    </button>
  );
};

export default ApproveButton;
