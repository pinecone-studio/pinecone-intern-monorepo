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
  const isEnabled = !status || status.toLowerCase() !== 'approved';

  return (
    <button
      onClick={handleDecline}
      className={`border border-[#D6D8DB] border-solid text-black h-30 rounded-md hover:bg-black hover:text-white ${isEnabled ? '' : 'opacity-50 cursor-not-allowed'}`}
      style={{ padding: 'revert' }}
      data-testid="decline-button"
      disabled={!isEnabled}
    >
      Татгалзах
    </button>
  );
};

export default DeclineButton;
