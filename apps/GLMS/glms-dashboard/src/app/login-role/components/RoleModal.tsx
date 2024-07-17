import { Dialog, DialogTrigger } from '@/components/ui/dialog';

import EditICon from '@/assets/icons/EditIcon';
const RoleModal = () => {
  return (
    <Dialog>
      <DialogTrigger>
        <EditICon />
      </DialogTrigger>
    </Dialog>
  );
};

export default RoleModal;
