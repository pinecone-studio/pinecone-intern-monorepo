'use client';

import StudentsTable from '../../../../src/app/student/_components/StudentsTable';
import { Student, useGetStudentByClassIdQuery } from '@/generated';

const Page = ({ params }: { params: { slug: string } }) => {
  const { data, loading, error } = useGetStudentByClassIdQuery({
    variables: {
      classId: `${params.slug}`,
    },
  });
  const studentsData = data?.getStudentsByClassId;
  return (
    <div>
      {loading && <div data-testid="Loading">Loading...</div>}
      {error && <div data-testid="Error">Error: {error.message}</div>}
      {!loading && !error && <StudentsTable data-testid="StudentsTable" classId={params.slug} studentsData={studentsData as Student[]} />}
    </div>
  );
};

export default Page;
