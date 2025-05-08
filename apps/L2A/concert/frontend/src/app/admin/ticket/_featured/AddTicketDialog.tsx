import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

const AddTicketDialog = () => {
  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <div className="bg-foreground text-background p-2 rounded-xl hover:bg-secondary hover:text-foreground">Тасалбар нэмэх</div>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>Тасалбар нэмэх</DialogTitle>
          <div>
            <Input />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddTicketDialog;
