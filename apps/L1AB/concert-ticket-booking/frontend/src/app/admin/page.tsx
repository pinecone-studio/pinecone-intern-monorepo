
import { AdminDash } from "@/components/AdminDash";
import { Container } from "@/components/Container";


const Page = () => {
  return (
    <Container>
      <div className="h-fit w-full border text-black text-center">admin page</div>
      <AdminDash/>
     
    </Container>
  );
};

export default Page;
