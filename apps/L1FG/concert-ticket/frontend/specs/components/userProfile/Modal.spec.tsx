import { Modal } from '@/components/UserProfile/Modal';
import { render } from '@testing-library/react';

describe('Modal', () => {
  it('render modal', async () => {
    render(<Modal orderData={'orderData'}></Modal>);
  });
});
