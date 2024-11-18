import React, { PropsWithChildren } from 'react';

type ContainerPropsWithChildren = {
  backgroundColor: string;
} & PropsWithChildren;
export const Container = ({ children, backgroundColor }: ContainerPropsWithChildren) => {
  return (
    <div className={backgroundColor}>
      <div className="max-w-[1280px] m-auto">{children}</div>
    </div>
  );
};
