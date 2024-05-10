import BackArrow from '../../../../assets/icons/BackArrow';



const BackButton = () => {
  return (
    <div data-cy="back-button-cy-id" data-testid="back-button">
      <button>
        <BackArrow />
      </button>
    </div>
  );
};

export default BackButton;
