'use client';

import { Student, useGetStudentByClassIdQuery } from '@/generated';
import StudentsTable from './StudentsTable';

export const StudentsInformation = () => {
  const { data, loading } = useGetStudentByClassIdQuery({
    variables: {
      classId: '12345',
    },
  });
  const studentsData = data?.getStudentsByClassId;
  return (
    <div>
      {loading && <div data-testid="Loading">Loading...</div>}
      {!loading && <StudentsTable studentsData={studentsData as Student[]} />}
    </div>
  );
};
