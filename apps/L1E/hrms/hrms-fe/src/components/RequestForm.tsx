'use client';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import Requestcom from './requestForm/RequestFormcom';
import { useEffect, useState } from 'react';
import RequestcomPaid from './requestForm/RequestFormPaid';
import Requestcomremote from './requestForm/RequestFormRemote';
import { Employee, EmployeeStatus, useGetEmployeesQuery } from '@/generated';

const RequestForm = () => {
  const employee: Employee = {
    _id: '676e6e4007d5ae05a35cda9e',
    email: 'shagai@gmail.com',
    jobTitle: 'junior',
    username: 'shagai',
    adminStatus: false,
    remoteLimit: 5,
    paidLeaveLimit: 5,
    freeLimit: 5,
    employeeStatus: EmployeeStatus.Employee,
    createdAt: 'Fri Dec 27 2024 17:07:12 GMT+0800 (Ulaanbaatar Standard Time)',
    updatedAt: 'Fri Dec 27 2024 17:07:12 GMT+0800 (Ulaanbaatar Standard Time)',
  };
  const [item, setItem] = useState('');
  const handleSelectChange = (value: string) => {
    setItem(value);
  };
  const [leads, setLeads] = useState<Employee[]>([]);
  const { data } = useGetEmployeesQuery({ variables: { input: 'Lead' } });
  useEffect(() => {
    setLeads(data?.getEmployees as Employee[]);
  }, [data]);
  const componentMap: { [key: string]: JSX.Element | null } = {
    Чөлөө: <Requestcom leads={leads} employee={employee} />,
    'Цалинтай чөлөө': <RequestcomPaid leads={leads} employee={employee} />,
    'Зайнаас ажиллах': <Requestcomremote leads={leads} employee={employee} />,
  };
  const limits: { [key: string]: number | null } = {
    Чөлөө: employee.freeLimit,
    'Цалинтай чөлөө': employee.paidLeaveLimit,
    'Зайнаас ажиллах': employee.remoteLimit,
  };
  return (
    <div className="h-screen">
      <Card className="w-[608px] border-[#E4E4E7] mx-auto">
        <CardContent className="p-8">
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold mb-1">Чөлөөний хүсэлт</h2>
              <p className="text-sm font-normal text-muted-foreground">Ажлын цагаар оффис дээр байх боломжгүй болсон аль ч тохиолдолд тус формыг заавал бөглөнө.</p>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="font-medium text-sm">Ангилал*</Label>
                <Select onValueChange={handleSelectChange}>
                  <SelectTrigger data-testid="select-input">
                    <SelectValue placeholder="Сонгоно уу" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem data-testid="item1" value="Чөлөө">
                      Чөлөө
                    </SelectItem>
                    <SelectItem data-testid="item2" value="Цалинтай чөлөө">
                      Цалинтай чөлөө
                    </SelectItem>
                    <SelectItem data-testid="item3" value="Зайнаас ажиллах">
                      Зайнаас ажиллах
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="pt-4">
                <div className="flex justify-end items-center text-sm">
                  <span className="text-muted-foreground text-xs font-normal">Боломжит хугацаа: </span>
                  <span className="text-xs"> {limits[item]} хоног</span>
                </div>
              </div>
            </div>
          </div>
          {componentMap[item]}
        </CardContent>
      </Card>
    </div>
  );
};

export default RequestForm;
