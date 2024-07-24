import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

import EditICon from '@/assets/icons/EditIcon';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectSeparator, SelectTrigger, SelectValue } from '@/components/ui/select';
const RoleModal = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="border-none ">
          <EditICon />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[425px] h-[284px] bg-[white]">
        <DialogHeader>
          <DialogTitle className="text-[20px] font-semibold">Edit roles</DialogTitle>
          <DialogDescription>ID:901923101</DialogDescription>
        </DialogHeader>
        <div className="flex items-center justify-center">
          <div className="flex items-center gap-5">
            <label htmlFor="Roles" className="text-right">
              Roles
            </label>
            <Select>
              <SelectTrigger className="w-[310px]">
                <SelectValue placeholder="Select roles"></SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Roles</SelectLabel>
                  <SelectItem value="Admin">Admin</SelectItem>
                  <SelectItem value="Teacher">Teacher</SelectItem>
                  <SelectItem value="Student">Student</SelectItem>
                </SelectGroup>
                <SelectSeparator></SelectSeparator>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex justify-end">
          <Button className="w-[126px] h-[40px] rounded-lg">Save changes</Button>
        </div>
        <div>
          <Button className="w-[64px] h-[20px] rounded-xl text-[14px]">Admin</Button>
        </div>
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RoleModal;
