import React, { PropsWithChildren } from 'react';

export const DetailsLeft = ({ children }: PropsWithChildren) => {
  return <div className="w-full space-y-4">{children}</div>;
};
