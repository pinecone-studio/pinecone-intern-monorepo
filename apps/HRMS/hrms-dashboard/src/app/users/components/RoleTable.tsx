'use client';
import React from 'react';
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { HrmsUser } from '@/generated';
import { useDeletedHrmsUserMutation } from '@/generated';
import RoleModal from './RoleModal';
import DeleteIcon from '@/assets/icons/DeleteIcon';
import { Button } from '@/components/ui/button';
import { ApolloError } from '@apollo/client';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';


const RoleTable = ({usersData}:{usersData: HrmsUser[]}) => {
  const  [deletedId] = useDeletedHrmsUserMutation();
  
  const router = useRouter();
  const handleDelete = async (_id: string ) => {
    try {
      const { data: deletedData } = await deletedId({
        variables: {
          _id,
        },
      });
      router.push('/');
    } catch (error) {
        if (error instanceof ApolloError) {
          toast.error('Sign in error has occurred', {
            position: 'top-center',
            autoClose: 3000,
            hideProgressBar: true,
          });
        }
      }
    };
return (
    <Table data-cy="tableBody"  className="px-6 overflow-hidden">
      <TableCaption></TableCaption>
      <TableHeader>
        <TableRow className="bg-[#f7f7f8]">
          <TableHead data-cy="tableHead-1" className="w-[150px] rounded-tl-xl text-black">
            Name
          </TableHead>
          <TableHead data-cy="tableHead-2" className="w-[170px] h-[30px] text-black">
            Id
          </TableHead>
          <TableHead data-cy="tableHead-3" className="w-[170px] h-[30px] text-black">
            Roles
          </TableHead>
          <TableHead data-cy="tableHead-4" className="w-[170px] rounded-tr-xl text-black">
            Email
          </TableHead>
          <TableHead data-cy="tableHead-4" className="w-[5px] rounded-tr-xl text-black">
          
          </TableHead>
          <TableHead data-cy="tableHead-4" className="w-[5px] rounded-tr-xl text-black">
         
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
     {usersData?.map((item, index) => (
      <TableRow key={index}>
      <TableCell >{item?.firstName}</TableCell>
      <TableCell >{item?._id}</TableCell>
      <TableCell >{item?.role}</TableCell>
      <TableCell >{item?.email}</TableCell>
      <TableCell>
            <RoleModal item={item}/>
      </TableCell>
      <TableCell>
            <Button aria-label="delete"  onClick={() => handleDelete(item?._id as string)} 
              className="border-none" variant={'outline'}>
              <DeleteIcon />
            </Button>
      </TableCell>
    </TableRow>
))}
      </TableBody>
      <TableFooter />
    </Table>
  );
};

export default RoleTable;