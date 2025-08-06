'use client';
import React from 'react';
import { Separator } from '@/components/ui/separator';
import { SeeTableModal } from './SeeTableModal';
import { useGetTablesQuery } from '@/generated';

export const TableGrid = () => {
  const { loading, error, data } = useGetTablesQuery();
  if (loading) return 'loading...';
  if (error) return `error : ${error}`;
  const tableData = data?.getTables;
  return (
    <div className="flex w-fit h-fit flex-col gap-4">
      <div className="flex flex-col p-4 bg-white border border-solid border-[#E4E4E7] rounded-md">
        {tableData?.map((table) => (
          <div data-testid="admin-table" key={table.tableId}>
            <div className="flex py-4 w-full justify-between items-center">
              <h1 className="font-bold text-[18px]">{table.tableName}</h1>
              <div className="flex justify-around gap-2">
                <SeeTableModal data={table} />
              </div>
            </div>
            <Separator />
          </div>
        ))}
      </div>
    </div>
  );
};
