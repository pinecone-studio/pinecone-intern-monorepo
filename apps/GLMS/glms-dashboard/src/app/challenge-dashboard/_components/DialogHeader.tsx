import CloseIcon from '@mui/icons-material/Close';

type DialogHeaderType = {
  title: string;
  onClose: () => void;
};
export const DialogHeader = ({ title, onClose }: DialogHeaderType) => {
  return (
    <div className='px-6 py-2 flex justify-between'>
      <h1 className='font-bold text-xl'>{title}</h1>
      <button onClick={onClose} data-testid="challenge-close-btn" className=' hover:bg-black hover:text-white hover:rounded-md'>
        <CloseIcon />
      </button>
    </div>
  );
};
