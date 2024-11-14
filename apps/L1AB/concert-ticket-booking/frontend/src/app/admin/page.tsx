'use client';
import { AdminDash } from '@/components/AdminDash';
import { Container } from '@/components/Container';
import { DialogComponent, styles } from '@/components/DialogComponent';
import { DialogTrigger } from '@radix-ui/react-dialog';
import { PlusCircleIcon } from 'lucide-react';

const Page = () => {
  return (
    <Container>
      <div className="w-full text-center text-black border h-fit">admin page</div>
      <div className="w-full text-center text-black border h-fit ">
        <DialogComponent showAddImage={true}>
          <DialogTrigger className={styles.trigger}>
            Тасалбар Нэмэх
            <PlusCircleIcon />
          </DialogTrigger>
        </DialogComponent>
      </div>
      <AdminDash />
    </Container>
  );
};

export default Page;
