import { Container } from "@/components/admin"
import { AdminProvider } from '@/components/providers/AdminProvider';

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AdminProvider>
      <Container>{children}</Container>
    </AdminProvider>
  );
};
export default AdminLayout