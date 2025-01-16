'use client';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Employee, EmployeeStatus, useCreateEmployeeMutation, useQueryQuery, useUpdateEmployeeMutation } from '@/generated';
import { Plus } from 'lucide-react';
import { format } from 'date-fns';
import { LeadApprovedModal } from '@/components/LeadApprovedModal';
import { EmployeeFormModal } from '@/components/EmployeeFormModal';
import { EmployeeFormValues } from '@/utils/employee-schema';

type TextType = {
  header: string;
  description: string;
};
const Page = () => {
  const approve = {
    header: 'Ахлах ажилтныг баталгаажуулах',
    description: '-ийг ахлах ажилтан болгох гэж байна. Баталгаажуулна уу.',
  };
  const reject = {
    header: 'Ахлах ажилтныг болиулах',
    description: '-ийг ахлах ажилтанаас цуцлах гэж байна.',
  };

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [employeeName, setEmployeeName] = useState<string>();
  const [selectId, setSelectId] = useState<string>('');
  const [status, setStatus] = useState<string>('');

  const [text, setText] = useState<TextType>({ header: '', description: '' });

  const { data, refetch } = useQueryQuery();

  const employees = data?.getAllEmployees as Employee[];

  const [UpdateEmployee] = useUpdateEmployeeMutation();

  const HandleToggle = (value: Employee, id: string) => {
    setSelectId(id);
    setIsOpen(true);
    setEmployeeName(value.username);
    setStatus(value.employeeStatus);
    if (value.employeeStatus == 'Lead') {
      setText(reject);
    } else {
      setText(approve);
    }
  };

  const handleLeadApproveClose = () => {
    setIsOpen(false);
    refetch();
  };

  const onSubmit = async () => {
    if (status == 'Employee') {
      await UpdateEmployee({ variables: { updateEmployeeId: selectId, input: { employeeStatus: EmployeeStatus.Lead } } });
      refetch();
    } else {
      await UpdateEmployee({ variables: { updateEmployeeId: selectId, input: { employeeStatus: EmployeeStatus.Employee } } });
      refetch();
    }
  };

  // AJILTAN CREATE HIIH HESEG

  const [openCreate, setOpenCreate] = useState(false);

  const [CreateEmployee] = useCreateEmployeeMutation();

  const createButton = () => {
    setOpenCreate(true);
  };

  const createEmployee = async (data: EmployeeFormValues) => {
    const { username, jobTitle, email, employeeStatus, createdAt } = data;

    await CreateEmployee({ variables: { input: { username, jobTitle, email, employeeStatus: employeeStatus as EmployeeStatus, createdAt: createdAt.toString() } } });

    setOpenCreate(false);
  };

  const createModalClose = () => {
    setOpenCreate(false);
  };

  return (
    <div data-cy="employee-list-page" className="w-full p-12 bg-neutral-100">
      <div className="flex items-center justify-between pb-4">
        <h2 className="text-lg font-medium">Нийт ажилчид</h2>
        <div className="flex items-center gap-4">
          <Button data-cy="create-employee-button" onClick={createButton} className="bg-zinc-900 text-white hover:bg-zinc-800">
            <Plus className="mr-2 h-4 w-4" />
            Шинэ ажилтан бүртгэх
          </Button>
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Нэр, Овог</TableHead>
              <TableHead>Албан тушаал</TableHead>
              <TableHead>Имэйл</TableHead>
              <TableHead>Ажилд орсон огноо</TableHead>
              <TableHead className="text-center">Зайнаас ажилласан өдөр</TableHead>
              <TableHead className="text-center">Чөлөө авсан цаг</TableHead>
              <TableHead className="text-center">Цалинтай чөлөө авсан өдөр</TableHead>
              <TableHead className="w-12">
                <span className="sr-only">Select</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody data-cy="employees-table">
            {employees?.map((employee, index) => (
              <TableRow className="bg-white" key={index}>
                <TableCell>{employee?.username}</TableCell>
                <TableCell>{employee?.jobTitle}</TableCell>
                <TableCell>{employee?.email}</TableCell>
                <TableCell>{employee.createdAt && format(employee?.createdAt, 'yyyy/MM/dd')}</TableCell>
                <TableCell className="text-center">{employee?.remoteLimit} өдөр</TableCell>
                <TableCell className="text-center">{employee?.freeLimit} цаг</TableCell>
                <TableCell className="text-center">{employee?.paidLeaveLimit} өдөр</TableCell>
                <TableCell>
                  <Checkbox
                    data-cy={`check-button-${index}`}
                    checked={employee.employeeStatus == 'Lead'}
                    onClick={() => {
                      HandleToggle(employee, employee._id);
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <LeadApprovedModal isOpen={isOpen} employeeName={employeeName as string} onClose={handleLeadApproveClose} onSubmit={onSubmit} text={text as TextType} />
      </div>
      <EmployeeFormModal openCreate={openCreate} setOpenCreate={createModalClose} createEmployee={createEmployee} />
    </div>
  );
};

export default Page;
