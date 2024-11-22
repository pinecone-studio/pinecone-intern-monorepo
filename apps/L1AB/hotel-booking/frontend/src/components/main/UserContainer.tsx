import React from 'react';
import { Container } from './assets';
import { UserHeader } from './UserHeader';

export const UserContainer = () => {
  return (
    <Container backgroundColor="bg-white">
      <UserHeader />
      <> Hi Shagai </>
      <div className="flex m-auto">
        <div className="container m-auto h-fit px-6 pt-10 pb-16 flex-1">
          <h3 className="text-2xl font-semibold text-[#09090B]">Hi, Shagai</h3>
          <p className="text-[#71717A] text-base font-thin mb-6">n.shagai@pinecone.mn</p>
          <div className="border border-x-2 mb-6"></div>
        </div>
      </div>

      {/* Footer */}
    </Container>
  );
};
