import { useDeclineRequestMutation } from '../../../generated';
import { useRouter } from 'next/navigation';

type DeclineButtonProps = {
  id: string;
  status?: string;
};

const DeclineButton = ({ id, status }: DeclineButtonProps) => {
  const router = useRouter();
  const [decline] = useDeclineRequestMutation();

  const handleDecline = async () => {
    await decline({ variables: { id } });
    router.push('/leaving');
  };
  const isDisabled = status === 'APPROVED' || status === 'DECLINED';

  return (
    <button
      onClick={handleDecline}
      className={`border border-[#D6D8DB] border-solid text-black h-30 rounded-md hover:bg-black hover:text-white ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      style={{ padding: 'revert' }}
      data-testid="decline-button"
      disabled={isDisabled}
    >
      Татгалзах
    </button>
  );
};

export default DeclineButton;
