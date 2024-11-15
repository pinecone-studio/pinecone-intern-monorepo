import React, { PropsWithChildren } from 'react';

export const DetailsCard = ({ children }: PropsWithChildren) => {
  return <div className="border bg-white rounded-md p-6">{children}</div>;
};
