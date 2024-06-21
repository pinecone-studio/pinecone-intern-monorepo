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

  console.log(studentsData);
  return (
    <div className="mx-auto container">
      <div>{loading ? <div>Loading...</div> : error ? <div>Error</div> : <StudentsTable studentsData={studentsData as Student[]} />}</div>
    </div>
  );
};
