import BackArrow from '../../../../assets/icons/BackArrow';

type BackButtonProps = {
  onClick: () => void;
};

const BackButton: React.FC<BackButtonProps> = ({ onClick }) => {
  return (
    <div data-testid="back-button">
      <button onClick={onClick}>
        <BackArrow />
      </button>
    </div>
  );
};

export default BackButton;
