'use client';

import { StudentAddModal } from './_topic/_components/StudentAddmodal';
import { StudentsTable } from './_topic/_components/studentAdd/StudentTable';

export default async function Index() {
  return (
    <div className="mx-auto container ">
      <StudentAddModal />
      <StudentsTable />
    </div>
  );
}
