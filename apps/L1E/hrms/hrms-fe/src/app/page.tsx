'use client';

import { Header } from '@/components/Header';
import { DateRangePicker } from '@/components/DateRangePicker';
import RequestForm from '@/components/RequestForm';

const Page = () => {
  return (
    <div>
      Home Page
      <RequestForm />
      <DateRangePicker />
      <Header />
    </div>
  );
};

export default Page;
