'use client';

import { useQuery } from '@apollo/client';
import { GET_ALL_APPLICANTS, GET_APPLICANTS_LIMIT } from './query';
import { useState } from 'react';
import ReactPaginate from 'react-paginate';
import { LeftArrow, RightArrow } from '../../asset';

interface Applicants {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  status: string;
}

export const ApplicantsListTable = () => {
  const tableHeader = ['Нэр', 'Ажлын байр', 'Имейл', 'Төлөв'];
  const applicantsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(0);
  const { data: allApplicantsData } = useQuery(GET_ALL_APPLICANTS);
  const {
    data: limitedApplicantsData,
    loading,
    error,
  } = useQuery(GET_APPLICANTS_LIMIT, {
    variables: {
      offset: currentPage * applicantsPerPage,
      limit: applicantsPerPage,
    },
  });
  const limitedApplicants = limitedApplicantsData?.getApplicantWithLimit;
  const totalApplicants = allApplicantsData?.getApplicants;

  const handlePageClick = (selectedItem: { selected: number }) => {
    setCurrentPage(selectedItem.selected);
  };

  if (loading)
    return (
      <div className="flex w-full justify-center items-center">
        <span className="loading loading-ring loading-lg"></span>
      </div>
    );
  if (error) {
    console.error('Error fetching jobs:', error);
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="flex flex-col rounded-xl gap-10 items-center overflow-scroll tracking-tight mx-6 mb-6">
      <table className="w-full table-fixed text-left">
        <thead>
          <tr className="bg-primary-light bg-[#F7F7F8] border-b border-b-[#D6D8DB] text-[#121316] text-xs">
            {tableHeader.map((item, index) => (
              <th key={index} className="py-3 px-6 text-primary-dark font-semibold" data-cy={`tableHeader-${index}`}>
                {item}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {limitedApplicants?.map((applicant: Applicants, index: number) => {
            return (
              <tr key={index} className="border-b border-b-[#EDE6F0] text-[#3F4145] text-sm text-left">
                <td className="p-6 cursor-pointer hover:underline">{applicant.firstname}</td>
                <td className="p-6">{applicant.lastname}</td>
                <td className="p-6">{applicant.email}</td>
                <td className="p-6">{applicant.status}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {totalApplicants && totalApplicants.length > 0 && (
        <ReactPaginate
          data-testid="pagination"
          forcePage={currentPage}
          key={currentPage}
          className="flex items-center justify-center gap-2"
          pageLinkClassName="w-10 h-10 flex items-center justify-center border rounded-lg"
          previousLabel={<LeftArrow />}
          nextLabel={<RightArrow />}
          pageCount={totalApplicants.length / applicantsPerPage}
          onPageChange={handlePageClick}
          activeLinkClassName={'bg-black text-white'}
        />
      )}
    </div>
  );
};
