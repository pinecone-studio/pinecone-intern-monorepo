import { PropsWithChildren } from 'react';

const Mainlayout = ({ children }: PropsWithChildren) => {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
};

export default Mainlayout;
