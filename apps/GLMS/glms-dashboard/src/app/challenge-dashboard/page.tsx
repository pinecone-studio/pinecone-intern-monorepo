'use client';
import { TextOrFileQuestionCreate } from './_components/TextOrFileCreateQuestion';

const Page = () => {
  return (
    <section data-testid="challenge-dashboard-page">
      It is challenge dahsboard page
      <TextOrFileQuestionCreate />
    </section>
  );
};

export default Page;
