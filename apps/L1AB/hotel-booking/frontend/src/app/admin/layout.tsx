import { Container } from "@/components/admin"

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <Container>
            {children}
        </Container>
    )
}
export default AdminLayout