'use client';
import Image from 'next/image';
import { useGetEmployeesByPaginateQuery } from '../../../generated';
import { perPage } from '../constants';
import { Dispatch, SetStateAction, useEffect } from 'react';

type PropsType = {
  setPage: Dispatch<SetStateAction<number | undefined>>;
  searchPath: string | null;
};
export const EmployeesListTable = ({ setPage, searchPath }: PropsType) => {
  const tableHeader = ['Ажилтан', 'Мэргэжил', 'И-мэйл', 'Хэлтэс', 'Төлөв'];
  const { data, loading } = useGetEmployeesByPaginateQuery({
    variables: {
      paginationInput: {
        limit: perPage.limit,
        page: Number(searchPath),
      },

      employeeDetailsfilterInput: {
        searchedValue: '',
      },

    },
  });

  const employeesData = data?.getEmployeesByPaginate;
  const totalEmployees = employeesData?.totalEmployees;
  useEffect(() => {
    setPage(totalEmployees);
  }, [data]);
  if (loading)
    return (
      <div className="flex w-full justify-center items-center py-16">
        <span className="loading loading-ring loading-lg"></span>
      </div>
    );
  return (
    <section data-cy="employeesList" className="flex my-4 rounded-xl overflow-scroll">
      <div className="w-full">
        <table data-cy="tableBody" className="w-full border-collapse">
          <tr className="w-full bg-light">
            {tableHeader.map((item, index) => (
              <th key={index} className="p-4 w-1/5 text-left">
                <p data-cy={`tableHeader-${index}`} className="text-xs  font-semibold text-dark">
                  {item}
                </p>
              </th>
            ))}
          </tr>
          {!loading &&
            employeesData?.employees?.map((row, index) => (
              <tr key={index} className="h-11 border-solid border-b border-b-[#EDE6F0]  p-4 text-left">
                <td className="cursor-pointer p-4">
                  <div className="flex items-center justify-start gap-3">
                    <figure className="relative rounded-full overflow-hidden h-[50px] aspect-square">
                      <Image src={row?.imageUrl || '/avatar.png'} style={{ objectFit: 'cover' }} alt="product image" fill sizes="small" />
                    </figure>
                    <p className="text-sm font-semibold text-dark overflow-hidden truncate">{row?.lastName?.slice(0, 1).toUpperCase() + '.' + row?.firstName}</p>
                  </div>
                </td>
                <td className="p-4 w-1/5">
                  <p className="truncate">{row?.jobTitle}</p>
                </td>
                <td className="p-4 w-1/5 truncate">{row?.email}</td>
                <td className="p-4 w-1/5 truncate">{row?.department}</td>
                <td className="p-4 w-1/5 truncate">{row?.employmentStatus}</td>
              </tr>
            ))}
        </table>
      </div>
    </section>
  );
};
