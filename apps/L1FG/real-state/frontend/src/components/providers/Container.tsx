import { PropsWithChildren } from 'react';

export const Container = ({ children }: PropsWithChildren) => {
  return <div className="max-w-screen-xl min-h-screen flex flex-col items-center justify-between container mx-auto">{children}</div>;
};
