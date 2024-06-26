'use client';

import { Student, useGetStudentByClassIdQuery } from '@/generated';
import StudentsTable from './StudentsTable';

export const StudentsInformation = () => {
  const { data, loading, error } = useGetStudentByClassIdQuery({
    variables: {
      classId: '12345',
    },
  });
  const studentsData = data?.getStudentsByClassId;
  return (
    <div>
      <div>{loading ? <div data-testid="Loading">Loading...</div> : error ? <div data-testid="Error">Error</div> : <StudentsTable studentsData={studentsData as Student[]} />}</div>
    </div>
  );
};
