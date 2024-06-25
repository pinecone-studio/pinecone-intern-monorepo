'use client';

import { Student, useGetStudentByClassIdQuery } from '@/generated';
import StudentsTable from './StudentsTable';

export const StudentsInformation = () => {
  const { data, loading, error } = useGetStudentByClassIdQuery({
    variables: {
      classId: '7000',
    },
  });
  const studentsData = data?.getStudentsByClassId;
  return (
    <div className="mx-auto container">
      <div>{loading ? <div data-testid="Loading">Loading...</div> : error ? <div data-testid="Error">Error</div> : <StudentsTable studentsData={studentsData as Student[]} />}</div>
    </div>
  );
};
