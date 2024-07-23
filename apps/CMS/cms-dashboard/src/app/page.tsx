'use client';
import { TableContent } from './dashboard/_components/TableContent';
import { FooterButtons } from './dashboard/_features';

const Home = () => {
  return (
    <div>
      <TableContent />
      <div className="flex justify-center py-6 sticky bottom-0">
        <FooterButtons />
      </div>
    </div>
  );
};

export default Home;

