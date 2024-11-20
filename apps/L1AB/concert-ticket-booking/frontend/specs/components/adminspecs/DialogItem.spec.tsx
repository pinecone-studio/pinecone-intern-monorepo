import { DialogItem } from '@/components';
import { Input } from '@/components/ui/input';
import { render } from '@testing-library/react';

describe('DialogItem', () => {
  it('should render successfully', () => {
    render(
      <DialogItem htmlFor="eventName" name="Тоглолтын нэр">
        <Input placeholder="Нэр оруулах" name="eventName" />
      </DialogItem>
    );
  });
});
