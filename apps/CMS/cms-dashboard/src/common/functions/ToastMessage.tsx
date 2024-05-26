import { StatusChangedModal } from '@/app/dashboard/_components/StatusChangedModal';
import { toast } from 'react-toastify';

export const showToast = ({ text }: { text: string }) => {
  toast.success(<StatusChangedModal message={text} />, {
    progressStyle: { background: '#01E17B' },
    position: 'top-center',
    autoClose: 3000,
    style: {
      color: 'black',
    },
  });
};
export const showErrorToast = ({ errorMessage }: { errorMessage: string }) => {
  toast.error(errorMessage, {
    position: 'top-center',
    autoClose: 3000,
    hideProgressBar: true,
  });
};
