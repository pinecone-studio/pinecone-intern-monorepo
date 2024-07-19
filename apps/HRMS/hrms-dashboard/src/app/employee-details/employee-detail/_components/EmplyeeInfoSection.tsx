'use client';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';

type Employee = {
  dateOfEmployment: string;
  department: string;
  email: string;
  employmentStatus: string;
  firstname: string;
  id: string;
  imageURL: string;
  jobTitle: string[];
  lastname: string;
  salary: string;
  __typename: string;
};

const EmployeeInfoSection = () => {
  const [employee, setEmployee] = useState<Employee | null>(null);

  useEffect(() => {
    const savedEmployees = sessionStorage.getItem('employeeDetails');
    if (savedEmployees) {
      setEmployee(JSON.parse(savedEmployees) as Employee);
    }
  }, []);
  if (!employee) return <div>No employee selected</div>;

  const infoFields = [
    { title: 'Албан тушаал', value: employee.jobTitle || 'Албан тушаал' },
    { title: 'Хэлтэс', value: employee.department || 'Хэлтэс' },
    { title: 'Ажилд орсон өдөр', value: '2023-03-09' || 'Ажилд орсон өдөр' },
    { title: 'Ажилласан хугацаа', value: '1 жил' || 'Ажилласан хугацаа' },
    { title: 'Төлөв', value: employee.employmentStatus || 'Төлөв' },
  ];

  return (
    <div className="h-full flex flex-col gap-3">
      <div className="flex justify-between mb-4 ">
        <p className="border-none p-0 text-black text-lg font-semibold">Хөдөлмөр эрхлэлтийн мэдээлэл</p>
        <Button className="bg-[#F7F7F8] text-black">Засварлах</Button>
      </div>
      {infoFields.map((field, index) => (
        <div key={index} className="mb-2 flex flex-col  ">
          <p className="border-none font-normal text-base p-0">{field.title}</p>
          <p className=" border-none font-semibold text-base p-0 text-black ">{field.value}</p>
        </div>
      ))}
    </div>
  );
};
export default EmployeeInfoSection;
