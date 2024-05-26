import { useApproveRequestMutation } from '../../../generated';
import { useRouter } from 'next/navigation';

type ApproveButtonProps = {
  id: string;
  status?: string;
};

const ApproveButton = ({ id, status }: ApproveButtonProps) => {
  const router = useRouter();
  const [approve] = useApproveRequestMutation();

  const handleApprove = async () => {
    await approve({ variables: { id } });
    router.push('/leaving');
  };
  const isDisabled = status === 'APPROVED' || status === 'DECLINED';

  return (
    <button
      onClick={handleApprove}
      className={`border border-[#D6D8DB] border-solid text-black h-30 rounded-md hover:bg-black hover:text-white ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      style={{ padding: 'revert' }}
      data-testid="approve-button"
      disabled={isDisabled}
    >
      Зөвшөөрөх
    </button>
  );
};

export default ApproveButton;
