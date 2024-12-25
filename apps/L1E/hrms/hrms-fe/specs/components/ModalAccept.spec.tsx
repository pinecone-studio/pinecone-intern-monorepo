import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ModalAccept } from '@/components/ModalAccept';

describe('ModalAccept', () => {
  it('renders the component', () => {
    render(<ModalAccept />);
    expect(screen.getByText('Та итгэлтэй байна уу?'));
  });
});
