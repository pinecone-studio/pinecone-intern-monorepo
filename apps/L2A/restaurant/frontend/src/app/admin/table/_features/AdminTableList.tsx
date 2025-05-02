import { Button } from '@/components/ui/button';
import { PencilIcon, TrashIcon } from 'lucide-react';

type Classroom = {
  id: number;
  name: string;
};

const classrooms: Classroom[] = [
  { id: 1, name: '1A' },
  { id: 2, name: '1b' },
];

const AdminTableList = () => {
  return (
    <div className="max-w-md mx-auto p-4 rounded-2xl">
      <div className="space-y-2">
        {classrooms.map((classroom) => (
          <div key={classroom.id} className="flex items-center h-16 justify-between p-2 border rounded-lg" data-testid={`classroom-${classroom.id}`}>
            <div className="ml-4 font-semibold" data-testid={`classroom-name-${classroom.id}`}>
              {classroom.name}
            </div>
            <div className="flex items-center gap-2">
              <Button variant="secondary" data-testid={`qr-btn-${classroom.id}`}>
                QR хaрах
              </Button>
              <Button variant="secondary" data-testid={`edit-btn-${classroom.id}`}>
                <PencilIcon className="w-4 h-4" />
              </Button>
              <Button variant="secondary" data-testid={`delete-btn-${classroom.id}`}>
                <TrashIcon className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default AdminTableList;
