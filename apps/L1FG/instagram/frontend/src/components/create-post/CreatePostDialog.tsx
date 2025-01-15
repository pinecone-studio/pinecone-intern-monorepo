import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { PlusSVG } from '../Home/leftSideBar/Svg/PlusSvg';
import CreatePost from './CreatePost';

export const DialogDemo = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex gap-4 overflow-hidden rounded-md text-sm font-medium hover:bg-accent hover:text-accent-foreground ml-2 p-2" variant="outline">
          <PlusSVG />
          Create post
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>Make changes to your profile here. Click save when you are done.</DialogDescription>
        </DialogHeader>
        <CreatePost />
        {/* <DialogFooter>
          <Button type="submit">Create post</Button>
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
  );
};
