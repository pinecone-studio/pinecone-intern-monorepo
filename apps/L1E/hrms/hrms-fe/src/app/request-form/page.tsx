'use client';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { useEffect, useState } from 'react';
import { Employee, RequestInput, useCreateRequestMutation, useGetEmployeesQuery } from '@/generated';
import Requestcom from '@/components/requestForm/RequestFormcom';
import RequestcomPaid from '@/components/requestForm/RequestFormPaid';
import Requestcomremote from '@/components/requestForm/RequestFormRemote';
import { RequestsInput } from '@/utils/requests-input';
import { useUser } from '@/provider/UserProvider';
import { LoadingSpinner } from '@/components/LoadingSpinner';

const Page = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [day, setDay] = useState(false);
  const [item, setItem] = useState('');
  const handleSelectChange = (value: string) => {
    setItem(value);
  };
  const [createRequest] = useCreateRequestMutation();
  const { data } = useGetEmployeesQuery({ variables: { input: 'Lead' } });

  const leads = data?.getEmployees as Employee[];
  const [employee, setEmployee] = useState<Employee>();

  const { user } = useUser();

  useEffect(() => {
    if (user) {
      setEmployee(user);
    }
  }, [user]);

  if (!employee) {
    return (
      <div className="w-screen  bg-neutral-100 h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  const onSubmit = async (data: RequestsInput) => {
    setIsOpen(true);
    const { date, startTime, endTime, leadEmployeeId, requestStatus, reason, employeeId } = data;
    const newdata: RequestInput = { selectedDay: date.toString().slice(0, 15), startTime, endTime, leadEmployeeId, requestStatus, reason, employeeId };
    const response = await createRequest({ variables: { input: newdata } });

    if (response) {
      setIsOpen(false);
    }
  };

  const componentMap: { [key: string]: JSX.Element | null } = {
    Чөлөө: <Requestcom leads={leads as Employee[]} setDay={setDay} day={day} employee={employee} isOpen={isOpen} onSubmit={onSubmit} />,
    'Цалинтай чөлөө': <RequestcomPaid leads={leads as Employee[]} isOpen={isOpen} employee={employee} onSubmit={onSubmit} />,
    'Зайнаас ажиллах': <Requestcomremote leads={leads as Employee[]} employee={employee} isOpen={isOpen} onSubmit={onSubmit} />,
  };

  const limits: { [key: string]: number | null } = {
    Чөлөө: employee.freeLimit,
    'Цалинтай чөлөө': employee.paidLeaveLimit,
    'Зайнаас ажиллах': employee.remoteLimit,
  };

  return (
    <div data-cy="request-form-page" className="min-h-screen w-screen bg-neutral-100 pt-[200px]">
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
                  <SelectTrigger data-cy="request-form-select-input">
                    <SelectValue placeholder="Сонгоно уу" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem data-testid="item1" value="Чөлөө">
                      Чөлөө
                    </SelectItem>
                    <SelectItem data-cy="select-input-paid" data-testid="item2" value="Цалинтай чөлөө">
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
export default Page;
