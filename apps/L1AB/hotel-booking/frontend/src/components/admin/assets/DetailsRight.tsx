import React, { PropsWithChildren } from 'react';

export const DetailsRight = ({ children }: PropsWithChildren) => {
  return <div className="min-w-[400px] space-y-4">{children}</div>;
};
