"use client";

import { Button } from '@/components/ui/button';
import { PencilIcon, TrashIcon } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

type Classroom = {
  id: number;
  name: string;
};
const classrooms: Classroom[] = [
  { id: 1, name: '1A' },
  { id: 2, name: '1B' },
];
const AdminTableList = () => {
  const [tableName, setTableName] = useState('');
  const handleUpdate = () => {
    console.log('Update clicked with name:', tableName);
  };

  return (
    <div className="max-w-md mx-auto p-4 rounded-2xl">
      <div className="space-y-2">
        {classrooms.map((classroom) => (
          <div key={classroom.id} className="flex items-center h-16 justify-between p-2 border rounded-lg" data-testid={`classroom-row-${classroom.id}`}>
            <div className="ml-4 font-semibold" data-testid={`classroom-name-${classroom.id}`}>
              {classroom.name}
            </div>
            <div className="flex items-center gap-2">
              <Button variant="secondary" data-testid={`classroom-${classroom.id}-qr-button`}>
                QR харах
              </Button>

              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="secondary" data-testid={`classroom-${classroom.id}-edit-button`}>
                    <PencilIcon className="w-4 h-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="w-[340px]" data-testid={`classroom-${classroom.id}-dialog`}>
                  <DialogHeader>
                    <DialogTitle data-testid={`classroom-${classroom.id}-dialog-title`}>Ширээ засах</DialogTitle>
                  </DialogHeader>
                  <Input placeholder="Ширээний нэр" value={tableName} onChange={(e) => setTableName(e.target.value)} data-testid={`classroom-${classroom.id}-input`} />
                  <Button onClick={handleUpdate} data-testid={`classroom-${classroom.id}-update-button`}>
                    Шинэчлэх
                  </Button>
                </DialogContent>
              </Dialog>

              <Button variant="secondary" data-testid={`classroom-${classroom.id}-delete-button`}>
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
