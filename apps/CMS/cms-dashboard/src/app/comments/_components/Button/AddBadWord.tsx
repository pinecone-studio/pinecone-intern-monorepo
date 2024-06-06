type RouterType = {
  onClick?: () => void;
};
const AddBadWord = ({ onClick }: RouterType) => {
  return (
    <button onClick={onClick} data-testid="add-bad-word-button-test-id">
      Нэмэх
    </button>
  );
};

export default AddBadWord;
