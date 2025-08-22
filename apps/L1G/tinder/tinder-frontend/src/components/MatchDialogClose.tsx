import Match from './ItsAmAtch';

interface MatchDialogCloseProps {
  onClose: () => void;
}

const MatchDialogClose: React.FC<MatchDialogCloseProps> = ({ onClose }) => (
  <div role="presentation" data-testid="overlay" className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center" onClick={onClose}>
    <div onClick={(e) => e.stopPropagation()}>
      <Match onClose={onClose} />
    </div>
  </div>
);
MatchDialogClose.displayName = 'MatchDialogClose';

export default MatchDialogClose;
