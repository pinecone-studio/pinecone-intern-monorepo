'use client';

import { Student, useGetStudentsByClassIdQuery } from '@/generated';
import { StudentAddModal } from './StudentAddModal';
import { StudentsTable } from './StudentTable';

export const StudentsInformation = () => {
  const { data, loading, error } = useGetStudentsByClassIdQuery({
    variables: {
      classId: '1212',
    },
  });
  const studentsData = data?.getStudentsByClassId;
  console.log(studentsData);

  return (
    <div className="mx-auto container ">
      <StudentAddModal />
      <div>{loading ? <div>loading</div> : error ? <div>Error</div> : <StudentsTable studentsData={studentsData as Student[]} />}</div>
    </div>
  );
};
