"use client";

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const TableSemiHeader = () => {
  const [tableName, setTableName] = useState('');
  const handleCreate = () => {
    if (!tableName.trim()) {
      alert('Ширээний нэр хоосон байна');
      return;
    }
  };

  return (
    <div className="flex justify-between p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold" data-testid="header-title">
        Ширээ
      </h1>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="secondary" data-testid="add-table-button">
            Ширээ +
          </Button>
        </DialogTrigger>
        <DialogContent className="w-[340px]" data-testid="dialog-content">
          <DialogHeader>
            <DialogTitle data-testid="dialog-title">Ширээ нэмэх</DialogTitle>
          </DialogHeader>
          <Input placeholder="Ширээний нэр" value={tableName} onChange={(e) => setTableName(e.target.value)} data-testid="table-name-input" />
          <Button onClick={handleCreate} data-testid="create-button">
            Үүсгэх
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default TableSemiHeader;
