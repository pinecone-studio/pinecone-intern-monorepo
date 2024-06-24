'use client';

import { Student, useGetStudentsByClassIdQuery } from '@/generated';
import StudentsTable from './StudentsTable';

export const StudentsInformation = () => {
  const { data, loading, error } = useGetStudentsByClassIdQuery({
    variables: {
      classId: '7000',
    },
  });
  const studentsData = data?.getStudentsByClassId;
  return (
    <div className="mx-auto container">
      <div>{loading ? <div>Loading...</div> : error ? <div>Error</div> : <StudentsTable studentsData={studentsData as Student[]} />}</div>
    </div>
  );
};
