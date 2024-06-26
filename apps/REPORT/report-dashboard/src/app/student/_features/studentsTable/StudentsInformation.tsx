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
  if (loading) {
    return <div>Loading...</div>;
  } else if (error) {
    return <div>Error</div>;
  } else {
    return <StudentsTable studentsData={studentsData as Student[]} />;
  }
};
