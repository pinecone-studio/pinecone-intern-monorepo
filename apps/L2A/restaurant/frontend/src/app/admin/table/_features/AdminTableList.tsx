'use client';

import { Button } from '@/components/ui/button';
import { PencilIcon, TrashIcon } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useEffect, useState } from 'react';
import { useGetAllTablesQuery } from '@/generated';

type Table = {
  _id: string;
  name: string;
  qrCodeUrl?: string;
  createdAt: string;
  __typename?: string;
};

const AdminTableList = () => {
  const [tableName, setTableName] = useState('');
  const [tables, setTables] = useState<Table[]>([]);
  const { data } = useGetAllTablesQuery();

  console.log('AdminTableList data:', data);
  useEffect(() => {
    if (data?.getAllTables && Array.isArray(data.getAllTables)) {
      setTables(
        data.getAllTables
          .map((table: any) => ({
            _id: table._id,
            name: table.name,
            qrCodeUrl: table.qrCodeUrl,
            createdAt: table.createdAt,
          }))
          .slice(0, 10)
      );
    }
  }, [data]);

  console.log('Tables:', tables);

  const handleUpdate = () => {
    console.log('Update clicked with name:', tableName);
  };

  if (!tables.length) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-md mx-auto p-4 rounded-2xl">
      <div className="space-y-2">
        {tables.map((table) => (
          <div key={table._id} className="flex items-center h-16 justify-between p-2 border rounded-lg" data-testid={`classroom-row-${table._id}`}>
            <div className="ml-4 font-semibold" data-testid={`classroom-name-${table._id}`}>
              {table.name}
            </div>
            <div className="flex items-center gap-2">
              <Button variant="secondary" data-testid={`classroom-${table._id}-qr-button`}>
                QR харах
              </Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="secondary" data-testid={`classroom-${table._id}-edit-button`}>
                    <PencilIcon className="w-4 h-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="w-[340px]" data-testid={`classroom-${table._id}-dialog`}>
                  <DialogHeader>
                    <DialogTitle data-testid={`classroom-${table._id}-dialog-title`}>Ширээ засах</DialogTitle>
                  </DialogHeader>
                  <Input placeholder="Ширээний нэр" value={tableName} onChange={(e) => setTableName(e.target.value)} data-testid={`classroom-${table._id}-input`} />
                  <Button onClick={handleUpdate} data-testid={`classroom-${table._id}-update-button`}>
                    Шинэчлэх
                  </Button>
                </DialogContent>
              </Dialog>
              <Button variant="secondary" data-testid={`classroom-${table._id}-delete-button`}>
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
