import { Suspense } from 'react';
import { Contact } from './_feature/Contact';

const ContactPage = () => {
  return (
    <Suspense fallback={<div className="h-screen flex items-center justify-center">Loading...</div>}>
      <Contact />
    </Suspense>
  );
};
export default ContactPage;
