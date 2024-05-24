type UpdateArticleButtonProps = {
  handleClick: () => void;
  isValid: boolean;
  dirty: boolean;
};

export const UpdateArticleButton = ({ handleClick, isValid, dirty }: UpdateArticleButtonProps) => {
  return (
    <button data-testid="publish-buton-test-id" onClick={handleClick} className="btn text-lg h-14 font-semibold bg-black text-white hover:text-black" disabled={!dirty || !isValid}>
      Шинэчлэх
    </button>
  );
};
