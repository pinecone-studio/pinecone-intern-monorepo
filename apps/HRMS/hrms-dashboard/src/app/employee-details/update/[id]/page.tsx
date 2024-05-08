'use client';
import { useGetEmployeeQuery } from '@/generated';
import { useParams, useRouter } from 'next/navigation';
import { LeftArrow } from '../../../asset';

const Update = () => {
  const { id } = useParams();
  const router = useRouter();
  const { data, loading } = useGetEmployeeQuery({ variables: { getEmployeeId: id } });

  if (loading)
    return (
      <div className="w-full flex flex-col bg-white relative items-center py-16">
        <span className="loading loading-ring loading-lg"></span>
      </div>
    );

  return (
    <section className="w-full flex flex-col overflow-scroll relative ">
      <div className="w-full flex  bg-white py-5">
        <figure
          onClick={() => {
            router.push('employee-details?employees=1');
          }}
          className="px-4 flex items-center justify-center cursor-pointer"
        >
          <LeftArrow />
        </figure>
        <p className="text-black  m-auto text-sm font-semibold">Ажилтны дэлгэрэнгүй</p>
      </div>
      <div className="w-full bg-light p-8 h-full">{data?.getEmployee?.firstName}</div>
    </section>
  );
};
export default Update;
