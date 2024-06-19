'use client';

import { StudentAddModal } from './studentAddTable/StudentAddModal';
import { StudentsTable } from './studentAddTable/StudentTable';
import { Student, useGetStudentsByClassIdQuery } from '@/generated';

export const StudentsInformation = () => {
  const { data, loading, error } = useGetStudentsByClassIdQuery({
    variables: {
      classId: '1123',
    },
  });
  const studentsData = data?.getStudentsByClassId;

  return (
    <div className="mx-auto container ">
      <StudentAddModal />
      <div>{loading ? <div>loading</div> : error ? <div>Error</div> : <StudentsTable studentsData={studentsData as Student[]} />}</div>
    </div>
  );
};
