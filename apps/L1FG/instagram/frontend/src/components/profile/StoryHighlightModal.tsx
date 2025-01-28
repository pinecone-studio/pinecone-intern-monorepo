import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

const StoryHighlightModal = ({ children }: { children: React.ReactNode }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>New highlight</DialogTitle>
        </DialogHeader>
        <p className="border w-full"></p>
        <div className="grid gap-4 py-4">
          <div className=" w-full">
            <Input id="name" placeholder="Highlight name" className="col-span-3 h-8 " />
          </div>
        </div>
        <Button>next</Button>
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default StoryHighlightModal;
