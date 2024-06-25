'use client';
import { TableContent } from './articles/_components';

const Home = () => {
  return (
    <div className="bg-[#F7F7F8] h-[93.5vh]">
      <TableContent></TableContent>
      <h1>This is the environment {process.env.ENVIRONMENT}</h1>
    </div>
  );
};
export default Home;
