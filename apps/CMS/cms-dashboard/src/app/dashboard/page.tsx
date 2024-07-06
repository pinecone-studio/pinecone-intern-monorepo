'use client';
import { TableContent } from './_components';

const DashboardPage = () => {
  return (
    <div className="bg-[#F7F7F8] h-[93.5vh]">
      <TableContent></TableContent>
      <h1>This is the environment {process.env.ENVIRONMENT}</h1>
    </div>
  );
};
export default DashboardPage;
