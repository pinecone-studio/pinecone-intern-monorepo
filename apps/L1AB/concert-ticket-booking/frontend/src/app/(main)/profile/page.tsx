import { Container } from '@/components';
import { ForgetPassword } from '@/components/ForgetPassword';

import React from 'react';

const Page = () => {
  return (
    <Container>
        <div className='px-28 py-12 flex gap-6 bg-[#09090B]'>
            <ForgetPassword />  
        </div>
    </Container>
  );
};

export default Page;
