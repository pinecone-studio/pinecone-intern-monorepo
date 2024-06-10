import React from 'react';
import { gql, useQuery } from '@apollo/client';

interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  imageUrl: string;
  jobTitle: string;
  salary: number;
  bankName: string;
  bankAccountNumber: string;
  bankAccountHolderName: string;
}

interface GetAllEmployeeData {
  getAllEmployee: Employee[];
}

const GET_ALL_EMPLOYEES = gql`
  query GetAllEmployee {
    getAllEmployee {
      id
      firstName
      lastName
      email
      phone
      imageUrl
      jobTitle
      salary
      bankName
      bankAccountNumber
      bankAccountHolderName
    }
  }
`;

export const EmployeeData: React.FC = () => {
  const { loading, error, data } = useQuery<GetAllEmployeeData>(GET_ALL_EMPLOYEES);

  if (loading) return <p data-testid="loading">Loading...</p>;
  if (error) return <p data-testid="error">Error: {error.message}</p>;

  return (
    <div>
      <div className="flex px-4 py-0 items-start">
        <h1>Цалингийн тооцоолол</h1>
      </div>
      <div>
        {data?.getAllEmployee.map((employee) => (
          <div key={employee.id} className="flex p-5">
            <div className="flex gap-[48px]">
              <div className="flex w-[600px] gap-3 items-center">
                <div className="flex w-10 h-10 rounded-[100%] bg-cover bg-center" style={{ backgroundImage: `url(${employee.imageUrl})` }}></div>
                <p data-testid="id">{employee.id}</p>
                <p data-testid="email">{employee.email}</p>
                <p data-testid="phone">{employee.phone}</p>
                <p data-testid="name">{employee.firstName}</p>
                <p data-testid="bank">{employee.bankName}</p>
                <p data-testid="account">{employee.bankAccountNumber}</p>
                <p data-testid="holder">{employee.bankAccountHolderName}</p>
              </div>
              <div className="flex w-[200px] overflow-hidden items-center">
                <p data-testid="job">{employee.jobTitle}</p>
              </div>
              <div className="flex w-[150px] items-center">
                <p data-testid="salary">{typeof employee.salary === 'number' ? employee.salary.toLocaleString('en-US') : parseFloat(employee.salary).toLocaleString('en-US')} ₮</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
