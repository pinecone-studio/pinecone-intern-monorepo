'use client';

import { useAuth } from '@/common/providers';
import { ResetFormStep1, ResetFormStep2, ResetFormStep3 } from './_features';

const ResetPassword = () => {
  const { index, setIndex } = useAuth();

  return (
    <div className="w-full h-[100vh] flex" data-cy="Article-Page">
      <div className="w-[50%] h-full flex items-center justify-center">
        {index === 0 && <ResetFormStep1 setIndex={setIndex} />}
        {index === 1 && <ResetFormStep2 setIndex={setIndex} />}
        {index === 2 && <ResetFormStep3 index={index} setIndex={setIndex} />}
      </div>
      <div className="w-[50%] h-full flex justify-center items-center bg-[#121316]">
        <div className="flex align-end">
          <div className="flex gap-2">
            <img src={'/Academy.svg'} alt="Pinecone logo" height={128} width={440} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
