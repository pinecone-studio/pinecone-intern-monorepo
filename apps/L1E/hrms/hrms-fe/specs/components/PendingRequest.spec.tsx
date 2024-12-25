import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { PendingRequest } from '@/components/PendingRequest';

describe('PendingRequest', () => {
  it('renders the component', () => {
    render(<PendingRequest />);
    expect(screen.getByText('Хүсэлтүүд'));
  });
});
