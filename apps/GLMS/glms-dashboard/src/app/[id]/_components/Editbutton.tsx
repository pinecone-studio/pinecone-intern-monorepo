
import EditButtonicon from '../../assets/EditButtonicon';

const EditButton = () => {
  return (
    <div className='flex border-[1px] border-solid shadow-md px-[20px] py-[16px] gap-2 rounded-md' data-testid="edit-button-test-id">
      <p className=' text-[18px] font-semibold'>
        Ерөнхийн мэдээлэл
      </p>
      <EditButtonicon/>
    </div>
  );
};

export default EditButton;