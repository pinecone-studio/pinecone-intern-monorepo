'use client';
import { useGetEmployeeQuery } from '@/generated';
import { useParams, useRouter } from 'next/navigation';
import { LeftArrow } from '../../../asset';
import { UpdateDependant, UpdateEmployment } from './_features';
import { PersonalInformation } from '../../_components';

const Update = () => {
  const { id } = useParams();
  const router = useRouter();
  const { data, loading } = useGetEmployeeQuery({ variables: { getEmployeeId: id } });

  if (loading) {
    return (
      <div className="w-full flex flex-col bg-white relative items-center py-16">
        <span className="loading loading-ring loading-lg"></span>
      </div>
    );
  }
  const employee = data?.getEmployee;

  return (
    <section className="w-full h-[100vh] bg-light flex flex-col overflow-scroll relative">
      <div className="w-full flex bg-white py-5">
        <figure onClick={() => router.push('employee-details?employees=1')} className="px-4 flex items-center justify-center cursor-pointer">
          <LeftArrow />
        </figure>
        <p className="text-black m-auto text-sm font-semibold">Employee Details</p>
      </div>

      <div className="flex flex-col lg:flex-row w-full  p-8 h-fit gap-6">
        <div className="rounded-xl lg:w-1/3 w-full">
          <PersonalInformation
            lastName={employee?.lastName}
            homeAddress={employee?.homeAddress}
            firstName={employee?.firstName}
            email={employee?.email}
            phone={employee?.phone}
            jobTitle={employee?.jobTitle}
            imageUrl={employee?.imageUrl}
          />
        </div>
        <div className="flex flex-col gap-6 lg:w-2/3 w-full">
          <UpdateEmployment
            jobTitle={data?.getEmployee?.jobTitle}
            department={data?.getEmployee?.department}
            dateOfEmployment={data?.getEmployee?.dateOfEmployment}
            employmentStatus={data?.getEmployee?.employmentStatus}
          />
          <UpdateDependant dependantPhone={employee?.relative[0]?.phone} dependency={employee?.relative[0]?.dependency} />
        </div>
      </div>
    </section>
  );
};

export default Update;
