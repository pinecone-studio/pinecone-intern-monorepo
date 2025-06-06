'use client';

import { Button } from '@/components/ui/button';
import { PencilIcon, TrashIcon } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useEffect, useState } from 'react';
import { useDeleteTableMutation, useGetAllTablesQuery, useUpdateTableMutation } from '@/generated';

type Table = {
  _id: string;
  name: string;
  qrCodeUrl?: string;
  createdAt: string;
  __typename?: string;
};

const AdminTableList = () => {
  const [tableName, setTableName] = useState('');
  const [selectedTable, setSelectedTable] = useState<Table | null>(null);
  const [tables, setTables] = useState<Table[]>([]);
  const [open, setOpen] = useState(false);

  const [updateTableMutation] = useUpdateTableMutation();
  const [deleteTableMutation] = useDeleteTableMutation();
  const { data } = useGetAllTablesQuery();

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

  const handleDelete = async (tableId: string) => {
    try {
      await deleteTableMutation({
        variables: {
          input: { _id: tableId },
        },
      });

      setTables((prevTables) => prevTables.filter((table) => table._id !== tableId));
    } catch (error) {
      console.error('Failed to delete table:', error);
    }
  };

  const handleUpdate = async () => {
    if (!selectedTable) return;

    try {
      await updateTableMutation({
        variables: {
          input: {
            _id: selectedTable._id,
            name: tableName,
          },
        },
      });

      setTables((prev) => prev.map((table) => (table._id === selectedTable._id ? { ...table, name: tableName } : table)));

      setSelectedTable(null);
      setTableName('');
      setOpen(false);
    } catch (error) {
      console.error('Failed to update table:', error);
    }
  };

  if (!tables.length) {
    return <div className='text-center'>Loading...</div>;
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

              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <Button
                    variant="secondary"
                    data-testid={`classroom-${table._id}-edit-button`}
                    onClick={() => {
                      setSelectedTable(table);
                      setTableName(table.name);
                      setOpen(true);
                    }}
                  >
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

              <Button variant="secondary" data-testid={`classroom-${table._id}-delete-button`} onClick={() => handleDelete(table._id)}>
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
