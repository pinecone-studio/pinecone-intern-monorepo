'use client';

import LoginRoleSearch from '../components/UserRoleSearch';
import RoleTable from '../components/RoleTable';
import { HrmsUser, useGetHrmsUsersQuery,useDeletedHrmsUserMutation} from '@/generated';
import { toast , ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const RoleTableFeature = () => {
  const { data,loading,error,refetch} = useGetHrmsUsersQuery();
 const [deltedById] = useDeletedHrmsUserMutation();
  const usersData = data?.getHrmsUsers
  const handleDelete = async (_id: string) => {
    try {
      const { data: deletedData } = await deltedById({
        variables: { _id },
      });
     
      if (deletedData?.deletedHrmsUser) {
        toast.success('Successfully deleted', {
          position: 'top-center',
          autoClose: 3000,
        });
        refetch();
      } 
    } catch (error) {
     
        toast.error('An error occurred while deleting', {
          position: 'top-center',
          autoClose: 3000,
        });
      
    }
  };
 
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <div data-testid="RoleTableContainer" className="flex flex-col w-full h-full container mx-auto items-center py-8 gap-7">
      <div data-testid="RoleTableHeader" className="w-[1154px] bg-[white] rounded-xl h-[72px] flex items-center justify-start p-[20px]">
        <h1 className="text-[24px] font-bold text-blacks">Admin role update</h1>
      </div>
     
      <div data-testid="RoleTableContent" className="w-[1154px] bg-white rounded-xl px-[20px] py-[20px]">
        <LoginRoleSearch />
        <RoleTable usersData={usersData as HrmsUser[]} handleDelete={handleDelete}/>
        <ToastContainer />
      </div>
    </div>
  );
};
export default RoleTableFeature;





