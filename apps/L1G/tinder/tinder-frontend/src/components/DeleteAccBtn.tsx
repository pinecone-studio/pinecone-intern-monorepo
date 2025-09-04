import { useDeleteUserMutation } from '@/generated';
import { useRouter } from 'next/navigation';
import React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

export const DeleteAccBtn = ({ user }: { user: any }) => {
  const router = useRouter();

  const [deleteUserMutation] = useDeleteUserMutation();

  const handleDeleteAcc = async () => {
    try {
      const res = await deleteUserMutation({
        variables: {
          deleteUserId: user.id,
        },
      });

      if (res.data?.deleteUser.success === true) {
        localStorage.removeItem('token');
        router.push('/');
      }

      console.log(res.data?.deleteUser, 'delete user mutation response');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger className='text-white rounded-md w-fit py-2 px-4 bg-[#E11D48E5] bg-opacity-90 font-sans hover:bg-[#E11D48E5] "'>Delete Account</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>This action cannot be undone. This will permanently delete your account and remove your data from our servers.</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDeleteAcc} className="bg-[#E11D48E5] bg-opacity-90 font-sans hover:bg-[#E11D48E5] ">
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
