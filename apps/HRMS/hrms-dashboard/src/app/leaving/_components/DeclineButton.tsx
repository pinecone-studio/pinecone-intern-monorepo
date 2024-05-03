import { useDeclineRequestMutation } from '../../../generated';
import { useRouter } from 'next/navigation';

const DeclineButton = ({ id }: { id: string }) => {
  const router = useRouter();
  const [decline] = useDeclineRequestMutation();

  const handleDecline = async () => {
    await decline({ variables: { id } });
    router.push('/leaving');
  };

  return (
    <button onClick={handleDecline} className="text-black h-30 border border-gray-300 rounded-sm hover:bg-black hover:text-white" style={{ padding: 'revert' }} data-testid="decline-button">
      Татгалзах
    </button>
  );
};

export default DeclineButton;
