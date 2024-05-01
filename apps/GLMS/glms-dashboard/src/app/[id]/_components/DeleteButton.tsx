import DeleteIcon from "../../assets/DeleteIcon";


const DeleteButton = () => {
  return (
    <div className=' p-[16px] border-[1px] border-solid shadow-md rounded-md ' data-testid="delete-button-test-id" >
        <DeleteIcon/>
    </div>
  );
};

export default DeleteButton;