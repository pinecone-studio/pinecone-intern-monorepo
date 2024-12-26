'use client';

import { DateRangePicker } from '@/components/DateRangePicker';
import RequestForm from '@/components/RequestForm';

const Page = () => {
  return (
    <div>
      Home Page
      <RequestForm />
      <DateRangePicker />
    </div>
  );
};

export default Page;
