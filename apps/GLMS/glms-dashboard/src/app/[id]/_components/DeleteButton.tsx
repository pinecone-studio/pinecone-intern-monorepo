import DeleteIcon from "../../assets/DeleteIcon";
type DeleteButtonProps = {
  onClick: () => void;
};

const DeleteButton:React.FC<DeleteButtonProps> = ({onClick}) => {
  return (
    <button onClick={onClick} className=' p-[16px] border-[1px] border-solid shadow-md rounded-md ' data-testid="delete-button-test-id" >
        <DeleteIcon/>
    </button>
  );
};

export default DeleteButton;