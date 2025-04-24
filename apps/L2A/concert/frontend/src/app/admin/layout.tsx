import { PropsWithChildren } from 'react';
import { Header } from './_components/Header';

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
};

export default RootLayout;
