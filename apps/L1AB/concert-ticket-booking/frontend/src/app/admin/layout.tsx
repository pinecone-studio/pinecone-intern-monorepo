import { AdminNavbar } from '@/components/admincomponents';
import { PropsWithChildren } from 'react';

export const metadata = {
  title: 'Admin',
  description: 'Generated by create-nx-workspace',
};

const AdminLayout = ({ children }: PropsWithChildren) => {
  return (
    <html lang="en" className="h-full">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head>
      <body className="bg-white h-full flex flex-col">
        <header className="flex-shrink-0">
          <AdminNavbar />
        </header>

        <main className="flex-grow p-4">{children}</main>
        <footer className="flex-shrink-0 opacity-50 flex justify-center items-center py-5">©2024 Copyright</footer>
      </body>
    </html>
  );
};

export default AdminLayout;
