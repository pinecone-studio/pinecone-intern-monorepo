'use client';

import { useParams } from 'next/navigation';
import React from 'react';
import { GeneralInfo } from './_features/GeneralInfo';

const RoomDetailPage = () => {
  const params = useParams();
  const roomId = params?.roomId as string;

  return (
    <div className="w-full flex justify-center items-start ">
      <GeneralInfo roomId={roomId} />
    </div>
  );
};

export default RoomDetailPage;
