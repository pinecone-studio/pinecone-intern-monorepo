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
    <button
      onClick={handleDecline}
      className=" border border-[#D6D8DB] border-solid text-black h-30 rounded-md hover:bg-black hover:text-white"
      style={{ padding: 'revert' }}
      data-testid="decline-button"
    >
      Татгалзах
    </button>
  );
};

export default DeclineButton;
