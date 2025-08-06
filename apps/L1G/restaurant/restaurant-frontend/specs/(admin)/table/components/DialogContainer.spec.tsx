import { DialogContainer } from '@/components/table/DialogContainer';
import { Dialog } from '@/components/ui/dialog';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

describe('Container', () => {
  it('should render successfully', async () => {
    render(
      <Dialog>
        <DialogContainer title="test" content={<div>test</div>} />
      </Dialog>
    );
  });
});
