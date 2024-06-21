'use client';

import { Student, useGetStudentByClassIdQuery } from '@/generated';
import StudentsTable from './StudentsTable';
import { log } from 'console';

export const StudentsInformation = () => {
  const { data, loading, error } = useGetStudentByClassIdQuery({
    variables: {
      classId: '1212',
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
