'use client';

import { StudentAddModal } from './_features/studentsTable/StudentAddModal';
import { StudentsInformation } from './_features/studentsTable/StudentsInformation';

const StudentPage = () => {
  return (
    <div className="mx-auto container">
      <StudentAddModal />
      <StudentsInformation />
    </div>
  );
};

export default StudentPage;
