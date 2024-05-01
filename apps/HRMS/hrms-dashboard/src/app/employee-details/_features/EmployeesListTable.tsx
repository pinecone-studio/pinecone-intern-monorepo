'use client';
import Image from 'next/image';
import { useGetAllEmployeeQuery } from '../../../generated';
import { useEffect } from 'react';
import { perPage } from '../constants';

type PropsType = {
  setPageCount: (_: number) => void;
  start: number;
  end: number;
};

export const EmployeesListTable = ({ setPageCount, start, end }: PropsType) => {
  const tableHeader = ['Ажилтан', 'Мэргэжил', 'И-мэйл', 'Хэлтэс', 'Төлөв'];
  const { data, loading } = useGetAllEmployeeQuery();
  const allEmployees = data?.getAllEmployee;
  const allEmployeeslength: number = allEmployees?.length ?? 0;
  useEffect(() => {
    const pageCount = allEmployeeslength / perPage.limit;
    setPageCount(Math.ceil(pageCount));
  }, [data]);

  if (loading)
    return (
      <div className="flex w-full justify-center items-center py-16">
        <span className="loading loading-ring loading-lg"></span>
      </div>
    );
  return (
    <section data-cy="employeesList" className="flex my-4 rounded-xl overflow-hidden">
      <div className="w-full">
        <table data-cy="tableBody" className="w-full border-collapse">
          <tr className="w-full bg-light">
            {tableHeader.map((item, index) => (
              <th key={index} className="p-4">
                <p data-cy={`tableHeader-${index}`} className="text-xs font-semibold text-dark">
                  {item}
                </p>
              </th>
            ))}
          </tr>
          {!loading &&
            allEmployees?.slice(start, end).map((row, index) => (
              <tr key={index} className="h-11 border-solid border-b border-b-[#EDE6F0]  p-4 text-left">
                <td className="cursor-pointer p-4">
                  <div className="flex items-center justify-start gap-3">
                    <figure className="relative rounded-full overflow-hidden h-[50px] aspect-square">
                      <Image src={row?.imageUrl || '/avatar.png'} style={{ objectFit: 'cover' }} alt="product image" fill sizes="small" />
                    </figure>
                    <p className="text-sm font-semibold text-dark">{row?.lastName?.slice(0, 1).toUpperCase() + '.' + row?.firstName}</p>
                  </div>
                </td>
                <td className="p-4">{row?.jobTitle}</td>
                <td className="p-4">{row?.email}</td>
                <td className="p-4">{row?.department}</td>
                <td className="p-4">{row?.employmentStatus}</td>
              </tr>
            ))}
        </table>
      </div>
    </section>
  );
};
