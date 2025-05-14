'use client';

import { gql, useQuery } from '@apollo/client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { PencilIcon, TrashIcon } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import dynamic from 'next/dynamic';

const QRCode = dynamic(() => import('react-qrcode-logo').then(mod => mod.QRCode), { ssr: false });

export const GET_ALL_TABLES = gql`
  query GetAllTables {
    getAllTables {
      _id
      name
      qrCodeUrl
    }
  }
`;

const AdminTableList = () => {
  const [tableName, setTableName] = useState('');
  const { data, loading, error } = useQuery(GET_ALL_TABLES);

  const handleUpdate = () => {
    console.log('Update clicked with name:', tableName);
  };

  if (loading) return <div>Loading...</div>;
  if (error) {
    console.error('GraphQL error:', error);
    return <div>Error fetching tables: {error.message}</div>;
  }

  return (
    <div className="max-w-md mx-auto p-4 rounded-2xl">
      <div className="space-y-2">
        {data.getAllTables.map((table: { _id: string; name: string; qrCodeUrl?: string }) => (
          <div
            key={table._id}
            className="flex items-center h-16 justify-between p-2 border rounded-lg"
            data-testid={`classroom-row-${table._id}`}
          >
            <div className="ml-4 font-semibold" data-testid={`classroom-name-${table._id}`}>
              {table.name}
            </div>
            <div className="flex items-center gap-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="secondary" data-testid={`classroom-${table._id}-qr-button`}>
                    QR харах
                  </Button>
                </DialogTrigger>
                <DialogContent className="w-[340px]" data-testid={`classroom-${table._id}-qr-dialog`}>
                  <DialogHeader>
                    <DialogTitle>QR код</DialogTitle>
                  </DialogHeader>
                  {table.qrCodeUrl ? (
                    <Image
                      src={table.qrCodeUrl.startsWith('http') ? table.qrCodeUrl : `/path/to/your/assets/${table.qrCodeUrl}`}
                      alt={`QR for ${table.name}`}
                      width={200}
                      height={200}
                      className="mx-auto"
                    />
                  ) : (
                    <div className="flex justify-center py-4">
                      <QRCode value={`http://localhost:4201/admin/table/${table._id}`} size={200} />
                    </div>
                  )}
                </DialogContent>
              </Dialog>

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
                  <Input
                    placeholder="Ширээний нэр"
                    value={tableName}
                    onChange={(e) => setTableName(e.target.value)}
                    data-testid={`classroom-${table._id}-input`}
                  />
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