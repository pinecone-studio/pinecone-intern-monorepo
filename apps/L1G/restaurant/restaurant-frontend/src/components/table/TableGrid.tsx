'use client';
import React from 'react';
import { Separator } from '@/components/ui/separator';
import { SeeTableModal } from './SeeTableModal';
import { useGetTablesQuery } from '@/generated';
import { Toaster } from 'sonner';
import { UpdateTableModal } from '@/features/admin-table-comps/UpdateTableModal';
import { DeleteTableModal } from '@/features/admin-table-comps/DeleteTableModal';
import { CreateTableModal } from '@/features/admin-table-comps/CreateTableModal';

export const TableGrid = () => {
  const { loading, error, data, refetch } = useGetTablesQuery();

  if (loading) return 'loading...';

  if (error) {
    throw new Error(error.message);
  }

  const tableData = data?.getTables;

  return (
    <div className="flex sm:w-[600px] w-full h-fit flex-col gap-4 px-4">
      <Toaster position="bottom-right" />
      <CreateTableModal refetch={refetch} />
      <div className="flex flex-col p-4 bg-white border border-solid border-[#E4E4E7] rounded-md h-fit max-h-[450px] overflow-scroll">
        {tableData?.length === 0 ? (
          <h1 data-testid="admin-empty-message" className="text-sm">
            Ширээ үүсээгүй байна.
          </h1>
        ) : (
          <>
            {tableData?.map((table, index) => (
              <div data-testid="admin-table" key={index}>
                <div className="flex py-4 w-full justify-between items-center">
                  <h1 className="font-bold text-[18px]">{table.tableName}</h1>
                  <div className="flex justify-around gap-2">
                    <SeeTableModal data={table} />
                    <UpdateTableModal refetch={refetch} data={table.tableId} />
                    <DeleteTableModal refetch={refetch} data={table.tableId} />
                  </div>
                </div>
                <Separator />
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};
