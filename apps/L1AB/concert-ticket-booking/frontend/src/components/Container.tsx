import React, { PropsWithChildren } from 'react';

export const Container = ({ children }: PropsWithChildren) => {
  return <div className="container m-auto h-screen">{children}</div>;
};
