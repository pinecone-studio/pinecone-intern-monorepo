'use client';
import { Container } from '@/components/Container';
import { DialogComponent, styles } from '@/components/DialogComponent';
import { DialogTrigger } from '@radix-ui/react-dialog';
import { PlusCircleIcon } from 'lucide-react';

const Page = () => {
  return (
    <Container>
      <div className="w-full text-center text-black border h-fit ">
        <DialogComponent showAddImage={true}>
          <DialogTrigger className={styles.trigger}>
            Тасалбар Нэмэх
            <PlusCircleIcon />
          </DialogTrigger>
        </DialogComponent>
      </div>
    </Container>
  );
};

export default Page;
