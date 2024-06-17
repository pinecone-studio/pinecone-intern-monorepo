'use client';

import { StudentAddModal } from './topic/studentAddTabel/StudentAddModal';
import { StudentsTable } from './topic/studentAddTabel/StudentTable';

export default async function Index() {
  return (
    <div className="mx-auto container ">
      <StudentAddModal />
      <StudentsTable />
    </div>
  );
}
