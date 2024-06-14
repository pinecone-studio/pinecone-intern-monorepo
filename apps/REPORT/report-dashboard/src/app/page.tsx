import { StudentMain } from './_student/_features';
import { StudentAddModal } from './_topic/_components/studentAdd/StudentAddmodal';
import { StudentsTable } from './_topic/_components/studentAdd/StudentsTable';

export default async function Index() {
  return (
    <div className="mx-auto container ">
      <StudentAddModal />
      <StudentsTable />
    </div>
  );
}
