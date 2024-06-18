'use client';

import { useEffect } from 'react';
import { StudentAddModal } from './studentAddTable/StudentAddModal';
import { StudentsTable } from './studentAddTable/StudentTable';
import { useGetStudentsByClassIdQuery } from '@/generated';

export const StudentsInformation = () => {
  const { data, loading } = useGetStudentsByClassIdQuery({
    variables: {
      classId: '123',
    },
  });

  console.log(loading, data);

  return (
    <div className="mx-auto container ">
      <StudentAddModal />
      <div>
        <StudentsTable studentsdata={studentsdata} />
      </div>
    </div>
  );
};
