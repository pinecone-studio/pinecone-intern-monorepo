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
    return <div data-testid="Loading">Loading...</div>;
  } else if (error) {
    return <div data-testid="Error">Error: {error.message}</div>;
  } else {
    return <StudentsTable studentsData={studentsData as Student[]} />;
  }
};
