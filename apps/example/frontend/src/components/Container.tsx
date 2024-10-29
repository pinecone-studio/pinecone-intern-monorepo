import React, { PropsWithChildren } from 'react';

export const Container = ({ children }: PropsWithChildren) => {
  return <div className="max-w-screen-lg m-auto">{children}</div>;
};
