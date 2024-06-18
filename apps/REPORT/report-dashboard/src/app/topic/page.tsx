'use client';

import { useEffect } from 'react';
// import { StudentAddModal } from './studentAddTable/StudentAddModal';
// import { StudentsTable } from './studentAddTable/StudentTable';
import { useGetStudentsByClassIdLazyQuery } from '@/generated';

export default async function StudentsInformation() {
  const [getStudentsByClassId] = useGetStudentsByClassIdLazyQuery();

  useEffect(() => {
    console.log('useEffect');
    // getStudentsByClassId({ variables: { classId: '1123' } });
  });

  // const { studentsdata }: any = data?.getStudentsByClassId || {};

  console.log('test-- ');

  return (
    <div className="mx-auto container ">
      {/* <StudentAddModal /> */}
      <div>{/* <StudentsTable studentsdata={studentsdata} /> */}</div>
    </div>
  );
}
