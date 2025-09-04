import { PropsWithChildren } from 'react';
import { CurrentUserProvider } from '../contexts/CurrentUserContext';

const Mainlayout = ({ children }: PropsWithChildren) => {
  return (
    <html lang="en">
      <body>
        <CurrentUserProvider>{children}</CurrentUserProvider>
      </body>
    </html>
  );
};

export default Mainlayout;
