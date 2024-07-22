import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { HrmsUpdateUserInput, HrmsUser } from '@/generated';
import EditICon from '@/assets/icons/EditIcon';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectSeparator, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { useUpdatedHrmsUserMutation } from '@/generated';
import { useRouter } from 'next/navigation';
import { ApolloError } from '@apollo/client';
import { toast } from 'react-toastify';
import { useState } from 'react';


const RoleModal = ({item}:{item: HrmsUser}) => {
const [updeteRole] = useUpdatedHrmsUserMutation();
const router = useRouter();

const handleUpdate = async (_id: string, input:HrmsUpdateUserInput ) => {
  try {
    const { data: updatedData } = await updeteRole({
      variables: {
        _id,
        input,
      },
    });
     router.push('/');
  } catch (error) {
      if (error instanceof ApolloError) {
        toast.error('Update role error has occurred', {
          position: 'top-center',
          autoClose: 3000,
          hideProgressBar: true,
        });
      }
    }
  };


  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="border-none " variant={'outline'}>
          <EditICon />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[425px] h-[284px] bg-[white]">
        <DialogHeader>
          <DialogTitle className="text-[20px] font-semibold">Edit roles</DialogTitle>
          <DialogDescription>ID:{item._id}</DialogDescription>
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
                  <SelectItem value="ADMIN">Admin</SelectItem>

                  <SelectItem value="EMPLOYEE">Employee</SelectItem>
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
          <Button className="w-[64px] h-[20px] rounded-xl text-[14px]" variant={'secondary'}>
            {item.role}
          </Button>
        </div>
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  
  );
};

export default RoleModal;