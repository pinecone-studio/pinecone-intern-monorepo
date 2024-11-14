import { DialogComponent, styles } from '@/components/DialogComponent';
import { DialogTrigger } from '@radix-ui/react-dialog';
import { render } from '@testing-library/react';
import { PlusCircleIcon } from 'lucide-react';

describe('DialogComponent', () => {
  it('should render successfully', () => {
    render(
      <DialogComponent showAddImage={true}>
        <DialogTrigger className={styles.trigger}>
          Тасалбар Нэмэх
          <PlusCircleIcon />
        </DialogTrigger>
      </DialogComponent>
    );
  });
});
