import { MatchedUser } from '@/app/(main)/home/page';
import Match from './ItsAmAtch';
interface MatchDialogCloseProps {
  onClose: () => void;
  matchedUsers: MatchedUser[];
  data: any;
}

const MatchDialogClose: React.FC<MatchDialogCloseProps> = ({ onClose, matchedUsers, data }) => (
  <div role="presentation" data-testid="overlay" className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center" onClick={onClose}>
    <div onClick={(e) => e.stopPropagation()}>
      <Match data={data} matchedUsers={matchedUsers} onClose={onClose} />
    </div>
  </div>
);
MatchDialogClose.displayName = 'MatchDialogClose';

export default MatchDialogClose;
