'use client';

import { StudentAddModal } from './studentAddTable/StudentAddModal';
import { StudentsTable } from './studentAddTable/StudentTable';

export default async function StudentsInformation() {
  return (
    <div className="mx-auto container ">
      <StudentAddModal />
      <StudentsTable />
    </div>
  );
}
